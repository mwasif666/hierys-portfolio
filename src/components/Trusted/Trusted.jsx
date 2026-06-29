import './Trusted.css'

const cdn = 'https://res.cloudinary.com/djyb4mzzk/image/upload'

/* Updated client logos */
const logos = [
  `${cdn}/v1782759384/Group_146_nj5koq.png`,
  `${cdn}/v1782759383/Group_152_nn8rbc.png`,
  `${cdn}/v1782759383/Group_151_azjnxi.png`,
  `${cdn}/v1782759383/Group_150_zzcbga.png`,
  `${cdn}/v1782759383/Group_149_xah8vm.png`,
  `${cdn}/v1782759382/Group_144_dppc0k.png`,
  `${cdn}/v1782759382/Group_145_zhkx8j.png`,
  `${cdn}/v1782759382/Group_143_rfcc7b.png`,
  `${cdn}/v1782759382/Group_148_wgdovx.png`,
  `${cdn}/v1782759382/Group_141_jnjzx7.png`,
  `${cdn}/v1782759381/Group_140_gcbfql.png`,
  `${cdn}/v1782759381/Group_147_ck4yyh.png`,
  `${cdn}/v1782759381/Group_142_iudr7m.png`,
  `${cdn}/v1782759381/Group_139_n0xnqa.png`,
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
