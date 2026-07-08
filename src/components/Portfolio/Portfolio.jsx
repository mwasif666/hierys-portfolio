import { useEffect, useState } from 'react'
import ImageWithSkeleton from '../ImageWithSkeleton/ImageWithSkeleton'
import './Portfolio.css'

const base = 'https://res.cloudinary.com/djyb4mzzk/image/upload'

/* Tiles in the exact screenshot sequence. `r` = aspect ratio (w/h);
   within a row the flex-grow is set to `r` so every tile in a row ends up
   the same height with no cropping — the way the original grid is built.
   `hover` can be a single URL or an array; arrays cycle while hovered. */
const rows = [
  [
    {
      src: `${base}/v1782757788/IELTS_Main_j3pphp.jpg`,
      hover: [
        `${base}/v1783434705/4_olfkxo.jpg`,
        `${base}/v1783434705/1_zii435.jpg`,
        `${base}/v1783434704/2_vd2lzy.jpg`,
        `${base}/v1783434704/3_dgkmqz.jpg`,
      ],
      r: 1.046,
      alt: 'IELTS higher score campaign',
    },
    {
      src: `${base}/v1782222983/4_1_nevfq1.png`,
      hover: [
        `${base}/v1783435109/8_azjgff.jpg`,
        `${base}/v1783435007/7_pl0vy2.jpg`,
        `${base}/v1783434900/6_b12j48.jpg`,
        `${base}/v1783434831/5_umdeqd.jpg`,
      ],
      r: 1.825,
      alt: 'pmprd glow candle',
    },
  ],
  [
    {
      src: `${base}/v1782222983/Artboard_2_2_nvck1f.png`,
      hover: [
        `${base}/v1783436699/10_dhs6c0.jpg`,
        `${base}/v1783436699/11_ou7npa.jpg`,
        `${base}/v1783436698/9_b8ng8o.jpg`,
      ],
      r: 1.277,
      alt: 'mskitchen brand',
    },
    {
      src: `${base}/v1782222983/5_1_y7wmjo.png`,
      hover: [
        `${base}/v1783435312/13_mrgjbh.jpg`,
        `${base}/v1783435210/12_k6e2tz.jpg`,
        `${base}/v1783434830/14_rbinju.jpg`,
      ],
      r: 0.661,
      alt: 'pmprd serum',
    },
    {
      src: `${base}/v1782223497/Artboard_6_2_mg3amy.png`,
      hover: [
        `${base}/v1783436749/15_xh6ose.jpg`,
        `${base}/v1783436747/17_iobxrh.jpg`,
        `${base}/v1783436751/16_s0jcm5.jpg`,
      ],
      r: 0.641,
      alt: 'Investments campaign',
    },
  ],
  [
    {
      src: `${base}/v1782222984/Asset_7_1_soqpoh.png`,
      hover: [
        `${base}/v1783436813/18_g0blji.jpg`,
        `${base}/v1783436812/19_uhyfzq.jpg`,
      ],
      r: 2.09,
      alt: 'Econetix carbon market',
    },
    {
      src: `${base}/v1782222984/Artboard_4_3_joy0o8.png`,
      hover: [
        `${base}/v1783436840/22_hgksu8.jpg`,
        `${base}/v1783436839/21_v45bab.jpg`,
        `${base}/v1783436837/20_fvaxx2.jpg`,
        `${base}/v1783436836/23_imkbv8.jpg`,
      ],
      r: 0.965,
      alt: 'Nextera brand',
    },
  ],
  [
    {
      src: `${base}/v1782222984/Artboard_10_1_zrlmls.png`,
      hover: [
        `${base}/v1783436748/25_fj8szv.jpg`,
        `${base}/v1783436747/24_c9girr.jpg`,
      ],
      r: 0.663,
      alt: 'App icons',
    },
    {
      src: `${base}/v1782222983/010_2_gwtrfe.png`,
      hover: [
        `${base}/v1783437052/30_h9kjbk.jpg`,
        `${base}/v1783437050/29_gohexp.jpg`,
        `${base}/v1783437048/28_nsd8al.jpg`,
        `${base}/v1783437046/27_fhrgyo.jpg`,
        `${base}/v1783437044/31_ozd13u.jpg`,
      ],
      r: 0.891,
      alt: 'Lifestyle pizza',
    },
    {
      src: `${base}/v1782222982/56_1_jftrro.png`,
      hover: [
        `${base}/v1783437019/image_45_oicfuf.png`,
        `${base}/v1783437018/b_events_resized_714x706_300dpi_yeegt3.png`,
        `${base}/v1783437016/b_event_stationery_4k_4096x4051_ratio_crop_tg9quu.png`,
        `${base}/v1783437014/resized_714x706_ratio_4k_oelfgq.png`,
      ],
      r: 1.011,
      alt: 'Bevent identity',
    },
  ],
]

const CYCLE_MS = 1000

function Tile({ tile }) {
  const hoverImages = Array.isArray(tile.hover)
    ? tile.hover
    : tile.hover
      ? [tile.hover]
      : []
  const [hovered, setHovered] = useState(false)
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (!hovered) {
      setActive(0)
      return
    }
    if (hoverImages.length < 2) return
    const id = setInterval(
      () => setActive((i) => (i + 1) % hoverImages.length),
      CYCLE_MS,
    )
    return () => clearInterval(id)
  }, [hovered, hoverImages.length])

  return (
    <figure
      className="tile"
      style={{ flexGrow: tile.r, aspectRatio: tile.r }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <ImageWithSkeleton src={tile.src} alt={tile.alt} />
      {hoverImages.map((src, i) => (
        <img
          key={src}
          className={`tile-hover${hovered && i === active ? ' is-active' : ''}`}
          src={src}
          alt=""
          loading="lazy"
        />
      ))}
    </figure>
  )
}

export default function Portfolio() {
  return (
    <section id="work" className="portfolio">
      <div className="portfolio-grid">
        {rows.map((row, i) => (
          <div className="portfolio-row" key={i}>
            {row.map((tile) => (
              <Tile tile={tile} key={tile.src} />
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
