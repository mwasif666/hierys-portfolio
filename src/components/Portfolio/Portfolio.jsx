import './Portfolio.css'

const base = 'https://res.cloudinary.com/djyb4mzzk/image/upload'

/* Tiles in the exact screenshot sequence. `r` = aspect ratio (w/h);
   within a row the flex-grow is set to `r` so every tile in a row ends up
   the same height with no cropping — the way the original grid is built. */
const rows = [
  [
    { src: `${base}/v1782222983/Group_119_rgbyxd.png`, r: 1.046, alt: 'Want a higher score campaign' },
    { src: `${base}/v1782222983/4_1_nevfq1.png`, r: 1.825, alt: 'pmprd glow candle' },
  ],
  [
    { src: `${base}/v1782222983/Artboard_2_2_nvck1f.png`, r: 1.277, alt: 'Tote bag brand' },
    { src: `${base}/v1782222983/5_1_y7wmjo.png`, r: 0.661, alt: 'Serum on leaf' },
    { src: `${base}/v1782223497/Artboard_6_2_mg3amy.png`, r: 0.641, alt: 'Investments campaign' },
  ],
  [
    { src: `${base}/v1782222984/Asset_7_1_soqpoh.png`, r: 2.09, alt: 'Carbon market stage' },
    { src: `${base}/v1782222984/Artboard_4_3_joy0o8.png`, r: 0.965, alt: 'Branded tote in use' },
  ],
  [
    { src: `${base}/v1782222984/Artboard_10_1_zrlmls.png`, r: 0.663, alt: 'App icons' },
    { src: `${base}/v1782222983/010_2_gwtrfe.png`, r: 0.891, alt: 'Lifestyle pizza' },
    { src: `${base}/v1782222982/56_1_jftrro.png`, r: 1.011, alt: 'Bevent identity' },
  ],
]

export default function Portfolio() {
  return (
    <section id="work" className="portfolio">
      <div className="portfolio-grid">
        {rows.map((row, i) => (
          <div className="portfolio-row" key={i}>
            {row.map((tile) => (
              <figure
                className="tile"
                key={tile.src}
                style={{ flexGrow: tile.r, aspectRatio: tile.r }}
              >
                <img src={tile.src} alt={tile.alt} />
              </figure>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
