import ImageWithSkeleton from '../ImageWithSkeleton/ImageWithSkeleton'
import './Portfolio.css'

const base = 'https://res.cloudinary.com/djyb4mzzk/image/upload'

/* Tiles in the exact screenshot sequence. `r` = aspect ratio (w/h);
   within a row the flex-grow is set to `r` so every tile in a row ends up
   the same height with no cropping — the way the original grid is built. */
const rows = [
  [
    { src: `${base}/v1782757788/IELTS_Main_j3pphp.jpg`, hover: `${base}/v1782757783/1_az4yet.jpg`, r: 1.046, alt: 'IELTS higher score campaign' },
    { src: `${base}/v1782222983/4_1_nevfq1.png`, hover: `${base}/v1782757787/2_vjy54m.jpg`, r: 1.825, alt: 'pmprd glow candle' },
  ],
  [
    { src: `${base}/v1782222983/Artboard_2_2_nvck1f.png`, hover: `${base}/v1782757780/3_gf5d7d.jpg`, r: 1.277, alt: 'Tote bag brand' },
    { src: `${base}/v1782222983/5_1_y7wmjo.png`, hover: `${base}/v1782757779/4_l0ox0e.jpg`, r: 0.661, alt: 'Serum on leaf' },
    { src: `${base}/v1782223497/Artboard_6_2_mg3amy.png`, hover: `${base}/v1782757782/5_ko6usx.jpg`, r: 0.641, alt: 'Investments campaign' },
  ],
  [
    { src: `${base}/v1782222984/Asset_7_1_soqpoh.png`, hover: `${base}/v1782757788/6_hypfah.jpg`, r: 2.09, alt: 'Carbon market stage' },
    { src: `${base}/v1782222984/Artboard_4_3_joy0o8.png`, hover: `${base}/v1782757784/7_nm1dg8.jpg`, r: 0.965, alt: 'Branded tote in use' },
  ],
  [
    { src: `${base}/v1782222984/Artboard_10_1_zrlmls.png`, hover: `${base}/v1782757785/8_puonnu.jpg`, r: 0.663, alt: 'App icons' },
    { src: `${base}/v1782222983/010_2_gwtrfe.png`, hover: `${base}/v1782757787/9_ell7cm.jpg`, r: 0.891, alt: 'Lifestyle pizza' },
    { src: `${base}/v1782222982/56_1_jftrro.png`, hover: `${base}/v1783321046/resized_714x706_ratio_4k_ql8ghm.png`, r: 1.011, alt: 'Bevent identity' },
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
                <ImageWithSkeleton src={tile.src} alt={tile.alt} />
                {tile.hover && (
                  <img className="tile-hover" src={tile.hover} alt="" loading="lazy" />
                )}
              </figure>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
