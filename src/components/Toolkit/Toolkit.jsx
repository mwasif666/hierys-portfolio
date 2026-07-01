import { useRef } from 'react'
import { useFloatingIcons } from '../../useFloatingIcons'
import './Toolkit.css'

/* Skill tags shown above the tool cluster */
const skills = [
  'Social Media Creative',
  'Email Creation',
  'Performance Marketing',
  'Campaign Strategy',
  'Ad Creatives',
  'Video Production',
]

const si = (slug) => `https://cdn.simpleicons.org/${slug}`
const cloud = (path) =>
  `https://res.cloudinary.com/djyb4mzzk/image/upload/h_250,fl_preserve_transparency/${path}.jpg?_s=public-apps`

const tools = [
  { name: 'Figma', src: cloud('v1782763069/Group_191_tgjozc'), className: 'figma' },
  { name: 'Excalidraw', src: cloud('v1782763084/Group_236_jea2ea'), className: 'excalidraw' },
  { name: 'DaVinci Resolve', src: si('davinciresolve/ffffff'), className: 'davinci' },
  { name: 'Gemini', src: cloud('v1782763083/Group_211_sorvhg'), className: 'gemini' },
  { name: 'Webflow', src: cloud('v1782763071/Group_205_ttflv4'), className: 'webflow' },
  { name: 'After Effects', src: cloud('v1782763069/Group_193_crw0lb'), className: 'after-effects' },
  { name: 'Claude', src: cloud('v1782763071/Group_197_lvwv6b'), className: 'claude' },
  { name: 'Photoshop', src: cloud('v1782763069/Group_194_tyxnyy'), className: 'photoshop' },
  { name: 'Canva', src: cloud('v1782763071/Group_196_v4nlda'), className: 'canva' },
  { name: 'Creative Cloud', src: cloud('v1782763069/Group_190_mjvefo'), className: 'creative-cloud' },
  { name: 'Illustrator', src: cloud('v1782763070/Group_195_wnkywd'), className: 'illustrator' },
  { name: 'Framer', src: cloud('v1782763071/Group_209_g1mfol'), className: 'framer' },
  { name: 'ChatGPT', src: cloud('v1782763069/Group_192_yuep1i'), className: 'chatgpt' },
  { name: 'LottieFiles', src: cloud('v1782763084/image_43_zrunj5'), className: 'lottie' },
  { name: 'Notion', src: cloud('v1782763082/Group_210_wujpih'), className: 'notion' },
]

export default function Toolkit() {
  const gridRef = useRef(null)
  useFloatingIcons(gridRef, '.tool-logo')

  return (
    <section id="toolkit" className="toolkit">
      <div className="toolkit-tags">
        {skills.map((skill) => (
          <span className="toolkit-tag" key={skill}>
            {skill}
          </span>
        ))}
      </div>

      <div className="toolkit-cluster" ref={gridRef}>
        <h2 className="toolkit-heading">
          Tools <span className="italic-accent">we use</span> to create
          <br className="toolkit-heading-break" />
          your <span className="italic-accent">creative projects</span>
        </h2>

        {tools.map((tool) => (
          <div
            className={`tool-logo tool-logo--${tool.className}`}
            key={tool.name}
            title={tool.name}
          >
            <span className="tool-logo__float">
              <img src={tool.src} alt={tool.name} loading="eager" />
            </span>
          </div>
        ))}
      </div>

      <a className="toolkit-more" href="#contact">
        And Many More
      </a>
    </section>
  )
}
