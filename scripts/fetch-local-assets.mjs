import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const ROOT = process.cwd()
const PUBLIC = path.join(ROOT, 'public')
const CLOUDINARY_ORIGIN = 'https://res.cloudinary.com/djyb4mzzk/image/upload'

const plainAssets = [
  'v1783497866/9_1_gbetoo.png',
  'v1782221023/14_1_xi5e6t.png',
  'v1782466892/9_2_f7gp4b.png',
  'v1782757788/IELTS_Main_j3pphp.jpg',
  'v1783434705/4_olfkxo.jpg',
  'v1783434705/1_zii435.jpg',
  'v1783434704/2_vd2lzy.jpg',
  'v1783434704/3_dgkmqz.jpg',
  'v1782222983/4_1_nevfq1.png',
  'v1783435109/8_azjgff.jpg',
  'v1783435007/7_pl0vy2.jpg',
  'v1783434900/6_b12j48.jpg',
  'v1783434831/5_umdeqd.jpg',
  'v1782222983/Artboard_2_2_nvck1f.png',
  'v1783436699/10_dhs6c0.jpg',
  'v1783436699/11_ou7npa.jpg',
  'v1783436698/9_b8ng8o.jpg',
  'v1782222983/5_1_y7wmjo.png',
  'v1783435312/13_mrgjbh.jpg',
  'v1783435210/12_k6e2tz.jpg',
  'v1783434830/14_rbinju.jpg',
  'v1782223497/Artboard_6_2_mg3amy.png',
  'v1783436749/15_xh6ose.jpg',
  'v1783436747/17_iobxrh.jpg',
  'v1783436751/16_s0jcm5.jpg',
  'v1782222984/Asset_7_1_soqpoh.png',
  'v1783436813/18_g0blji.jpg',
  'v1783436812/19_uhyfzq.jpg',
  'v1782222984/Artboard_4_3_joy0o8.png',
  'v1783436840/22_hgksu8.jpg',
  'v1783436839/21_v45bab.jpg',
  'v1783436837/20_fvaxx2.jpg',
  'v1783436836/23_imkbv8.jpg',
  'v1782222984/Artboard_10_1_zrlmls.png',
  'v1783436748/25_fj8szv.jpg',
  'v1783436747/24_c9girr.jpg',
  'v1782222983/010_2_gwtrfe.png',
  'v1783437052/30_h9kjbk.jpg',
  'v1783437050/29_gohexp.jpg',
  'v1783437048/28_nsd8al.jpg',
  'v1783437046/27_fhrgyo.jpg',
  'v1783437044/31_ozd13u.jpg',
  'v1782222982/56_1_jftrro.png',
  'v1783437019/image_45_oicfuf.png',
  'v1783437018/b_events_resized_714x706_300dpi_yeegt3.png',
  'v1783437016/b_event_stationery_4k_4096x4051_ratio_crop_tg9quu.png',
  'v1783437014/resized_714x706_ratio_4k_oelfgq.png',
  'v1782224694/Rectangle_292_mvqmsi.png',
  'v1782224694/Rectangle_294_yi2pnk.png',
  'v1782224694/Rectangle_301_pll516.png',
  'v1782224694/Rectangle_297_kbcyxh.png',
  'v1782224694/Rectangle_302_lzsncj.png',
  'v1782224694/Rectangle_303_z49xbl.png',
  'v1782759384/Group_146_nj5koq.png',
  'v1782759383/Group_152_nn8rbc.png',
  'v1782759383/Group_151_azjnxi.png',
  'v1782759383/Group_150_zzcbga.png',
  'v1782759383/Group_149_xah8vm.png',
  'v1782759382/Group_144_dppc0k.png',
  'v1782759382/Group_145_zhkx8j.png',
  'v1782759382/Group_143_rfcc7b.png',
  'v1782759382/Group_148_wgdovx.png',
  'v1782759382/Group_141_jnjzx7.png',
  'v1782759381/Group_140_gcbfql.png',
  'v1782759381/Group_147_ck4yyh.png',
  'v1782759381/Group_142_iudr7m.png',
  'v1782759381/Group_139_n0xnqa.png',
  'v1782250610/Rectangle_311_xtyyqh.png',
  'v1782250610/image_39_v23rd1.png',
  'v1782250609/image_40_y4hdj7.png',
  'v1782764919/Rectangle_327_ed5qv7.png',
  'v1782912568/Group_90_vja23j.png',
  'v1782912568/Rectangle_255_y3vtea.png',
  'v1778840808/WhatsApp_Image_2026-01-21_at_15.51.54_pfhxka.jpg',
  'v1783499710/image_44_1_h3oloy.svg',
]

const toolkitAssets = [
  'v1782763069/Group_191_tgjozc',
  'v1782763084/Group_236_jea2ea',
  'v1782763083/Group_211_sorvhg',
  'v1782763071/Group_205_ttflv4',
  'v1782763069/Group_193_crw0lb',
  'v1782763071/Group_197_lvwv6b',
  'v1782763069/Group_194_tyxnyy',
  'v1782763071/Group_196_v4nlda',
  'v1782763069/Group_190_mjvefo',
  'v1782763070/Group_195_wnkywd',
  'v1782763071/Group_209_g1mfol',
  'v1782763069/Group_192_yuep1i',
  'v1782763084/image_43_zrunj5',
  'v1782763082/Group_210_wujpih',
]

async function download(url, destination) {
  const response = await fetch(url, {
    headers: {
      'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/140 Safari/537.36',
      accept: '*/*',
    },
    redirect: 'follow',
  })
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}: ${url}`)
  const bytes = Buffer.from(await response.arrayBuffer())
  await mkdir(path.dirname(destination), { recursive: true })
  await writeFile(destination, bytes)
  return bytes.length
}

const manifest = []
for (const assetPath of [...new Set(plainAssets)]) {
  const remote = `${CLOUDINARY_ORIGIN}/${assetPath}`
  const local = `/media/cloudinary/${assetPath}`
  const bytes = await download(remote, path.join(PUBLIC, local))
  manifest.push({ remote, local, bytes })
}

for (const assetPath of toolkitAssets) {
  const fileName = `${assetPath.split('/').at(-1)}.jpg`
  const remote = `${CLOUDINARY_ORIGIN}/h_250,fl_preserve_transparency/${assetPath}.jpg?_s=public-apps`
  const local = `/media/cloudinary/toolkit/${fileName}`
  const bytes = await download(remote, path.join(PUBLIC, local))
  manifest.push({ remote, local, bytes })
}

const googleFontsUrl = 'https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800&family=Geist+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&display=swap'
const fontCssResponse = await fetch(googleFontsUrl, {
  headers: {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/140 Safari/537.36',
  },
})
if (!fontCssResponse.ok) throw new Error(`Google Fonts CSS fetch failed: ${fontCssResponse.status}`)
let fontCss = await fontCssResponse.text()
const fontUrls = [...new Set([...fontCss.matchAll(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/g)].map((match) => match[1]))]

for (const [index, fontUrl] of fontUrls.entries()) {
  const extension = path.extname(new URL(fontUrl).pathname) || '.woff2'
  const localFile = `font-${String(index + 1).padStart(2, '0')}${extension}`
  const localUrl = `/fonts/${localFile}`
  const bytes = await download(fontUrl, path.join(PUBLIC, 'fonts', localFile))
  fontCss = fontCss.split(fontUrl).join(localUrl)
  manifest.push({ remote: fontUrl, local: localUrl, bytes })
}

await mkdir(path.join(PUBLIC, 'fonts'), { recursive: true })
await writeFile(path.join(PUBLIC, 'fonts', 'fonts.css'), `/* Vendored at build time; no visitor request is sent to Google Fonts. */\n${fontCss}`)
await writeFile(
  path.join(PUBLIC, 'media', 'asset-manifest.json'),
  `${JSON.stringify({ generatedAt: new Date().toISOString(), assets: manifest }, null, 2)}\n`,
)

console.log(`Vendored ${manifest.length} third-party assets into public/.`)
