import './Trusted.css'

const cdn = 'https://res.cloudinary.com/diywraupt/image/upload'

/* Every client logo pulled straight from the Hierys site data (homepageData.js) */
const logos = [
  `${cdn}/v1768491900/Econetix_-_Logo_Primary_Black_iy8ues.svg`,
  `${cdn}/v1768491900/pmprd_-_black_irppeh.svg`,
  `${cdn}/v1768492132/vampire_y7m5bx.png`,
  `${cdn}/v1768491862/Asset_718_bkrb1s.png`,
  `${cdn}/v1768491861/Asset_717_t9e2gr.png`,
  `${cdn}/v1768491854/Asset_711_d43wo5.png`,
  `${cdn}/v1768491895/Asset_702_pxfz9l.png`,
  `${cdn}/v1768491894/Asset_701_jenn0o.png`,
  `${cdn}/v1768491893/Asset_700_gg4kj9.png`,
  `${cdn}/v1768491892/FKB_cifpue.png`,
  `${cdn}/v1768491891/Black_qkoshj.png`,
  `${cdn}/v1768491890/Asset_745_uvlguu.png`,
  `${cdn}/v1768491888/Asset_744_ta3rxx.png`,
  `${cdn}/v1768491888/Asset_743_aguthu.png`,
  `${cdn}/v1768491886/Asset_742_ao1r1w.png`,
  `${cdn}/v1768491886/Asset_741_lmsead.png`,
  `${cdn}/v1768491883/Asset_740_wdsfle.png`,
  `${cdn}/v1768491883/Asset_739_s5z8wq.png`,
  `${cdn}/v1768491882/Asset_738_siehfq.png`,
  `${cdn}/v1768491882/Asset_737_yemyul.png`,
  `${cdn}/v1768491881/Asset_736_zxy90g.png`,
  `${cdn}/v1768491879/Asset_735_rpylkw.png`,
  `${cdn}/v1768491879/Asset_734_tdjcae.png`,
  `${cdn}/v1768491878/Asset_733_oqrnit.png`,
  `${cdn}/v1768491877/Asset_732_ulildq.png`,
  `${cdn}/v1768491876/Asset_731_zbwupn.png`,
  `${cdn}/v1768491875/Asset_730_ijxoqe.png`,
  `${cdn}/v1768491874/Asset_729_pvdjfi.png`,
  `${cdn}/v1768491873/Asset_728_xlikpm.png`,
  `${cdn}/v1768491872/Asset_727_nosrik.png`,
  `${cdn}/v1768491871/Asset_726_oyecuf.png`,
  `${cdn}/v1768491870/Asset_725_pirfgd.png`,
  `${cdn}/v1768491869/Asset_724_u76ojg.png`,
  `${cdn}/v1768491868/Asset_723_ytu6it.png`,
  `${cdn}/v1768491867/Asset_722_qtds2e.png`,
  `${cdn}/v1768491865/Asset_721_bgsh2h.png`,
  `${cdn}/v1768491864/Asset_720_dai844.png`,
  `${cdn}/v1768491864/Asset_719_uza0f8.png`,
  `${cdn}/v1768491861/Asset_716_d9x9qt.png`,
  `${cdn}/v1768491858/Asset_715_dnxk5c.png`,
  `${cdn}/v1768491857/Asset_714_c9dzdj.png`,
  `${cdn}/v1768491856/Asset_713_iaxmwh.png`,
  `${cdn}/v1768491855/Asset_712_xmgu1i.png`,
  `${cdn}/v1768491852/Asset_710_ta5xr2.png`,
  `${cdn}/v1768491851/Asset_709_i0d3rg.png`,
  `${cdn}/v1768491850/Asset_708_llhuv5.png`,
  `${cdn}/v1768491849/Asset_707_nj1kca.png`,
  `${cdn}/v1768491848/Asset_706_r3ssbb.png`,
  `${cdn}/v1768491847/Asset_704_ezyu9x.png`,
  `${cdn}/v1768491846/Asset_703_kogvcj.png`,
]

export default function Trusted() {
  return (
    <section id="about" className="trusted">
      {/* ── Logo strip ── */}
      <div className="trusted-top">
        <p className="trusted-title">
          Trusted by 80+ ambitious brands and growing teams
        </p>
        <div className="trusted-marquee" aria-hidden="true">
          <div className="trusted-track">
            {[...logos, ...logos].map((src, i) => (
              <img
                className="trusted-logo"
                src={src}
                alt="Client logo"
                key={`${src}-${i}`}
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── AI statement ── */}
      <div className="trusted-ai">
        <p className="ai-eyebrow">AI-FORWARD. TASTE-LED.</p>
        <h2 className="ai-head">
          We use AI and modern tools to make our work faster, sharper, and more
          efficient. Strategy, direction, and quality still lead every decision.
        </h2>
        <p className="ai-eyebrow ai-eyebrow--foot">BETTER SYSTEMS. BETTER DELIVERY.</p>
      </div>
    </section>
  )
}
