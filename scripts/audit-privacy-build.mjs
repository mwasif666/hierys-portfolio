import { readdir, readFile, stat } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const distDir = path.join(root, 'dist')
const srcDir = path.join(root, 'src')

async function walk(dir) {
  const out = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...await walk(full))
    else out.push(full)
  }
  return out
}

function fail(message) {
  console.error(`Privacy build audit failed: ${message}`)
  process.exitCode = 1
}

const distFiles = await walk(distDir)
const textExtensions = new Set(['.html', '.js', '.css', '.svg', '.json', '.txt', '.xml'])
let distText = ''
for (const file of distFiles) {
  if (!textExtensions.has(path.extname(file).toLowerCase())) continue
  distText += `\n/* ${path.relative(distDir, file)} */\n${await readFile(file, 'utf8')}`
}

const forbiddenRuntimeHosts = [
  'res.cloudinary.com',
  'fonts.googleapis.com',
  'fonts.gstatic.com',
]
for (const host of forbiddenRuntimeHosts) {
  if (distText.includes(host)) fail(`generated browser output still references ${host}`)
}

const srcFiles = await walk(srcDir)
let sourceText = ''
for (const file of srcFiles) {
  if (!['.js', '.jsx', '.css'].includes(path.extname(file).toLowerCase())) continue
  sourceText += `\n${await readFile(file, 'utf8')}`
}

if (/<iframe\b/i.test(sourceText)) {
  fail('source still contains an iframe; third-party embeds must not load inside the portfolio without a consent gate')
}
if (sourceText.includes('fonts.googleapis.com') || sourceText.includes('fonts.gstatic.com')) {
  fail('source still loads Google Fonts directly')
}
if (!distText.includes('https://hierys.com/privacy-policy')) {
  fail('Privacy Policy link is missing from generated output')
}
if (!distText.includes('https://hierys.com/imprint')) {
  fail('Imprint link is missing from generated output')
}

const mediaFiles = distFiles.filter((file) => file.includes(`${path.sep}media${path.sep}cloudinary${path.sep}`))
const fontFiles = distFiles.filter((file) => file.includes(`${path.sep}fonts${path.sep}`) && file.endsWith('.woff2'))
if (mediaFiles.length < 80) fail(`expected at least 80 vendored media files, found ${mediaFiles.length}`)
if (fontFiles.length < 3) fail(`expected local font files, found ${fontFiles.length}`)

const manifestPath = path.join(distDir, 'media', 'asset-manifest.json')
try {
  const info = await stat(manifestPath)
  if (!info.isFile()) fail('asset manifest is not a file')
} catch {
  fail('vendored asset manifest is missing from dist')
}

if (!process.exitCode) {
  console.log('Privacy build audit passed.')
  console.log(`- ${mediaFiles.length} Cloudinary-origin media files are served from the portfolio origin.`)
  console.log(`- ${fontFiles.length} font files are served locally.`)
  console.log('- No direct Cloudinary or Google Fonts hosts remain in generated browser output.')
  console.log('- No iframe remains in application source; Calendly is outbound-only.')
  console.log('- Privacy Policy and Imprint links are present.')
}
