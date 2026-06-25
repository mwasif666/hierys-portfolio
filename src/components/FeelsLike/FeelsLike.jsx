import BounceCards from '../BounceCards/BounceCards'
import './FeelsLike.css'

const base = 'https://res.cloudinary.com/djyb4mzzk/image/upload'

/* Mixed stat + image cards in screenshot order.
   The two image URLs are placeholders — swap in the exact shots when ready. */
const cards = [
  { kind: 'stat', theme: 'blue', value: '8+', label: 'Countries', foot: 'Sitting behind every decision', z: 3 },
  { kind: 'image', src: `${base}/v1782250610/Rectangle_311_xtyyqh.png`, z: 2 },
  { kind: 'stat', theme: 'lime', value: '10k+', foot: 'Pieces of content out the door', z: 3 },
  { kind: 'image', src: `${base}/v1782250610/image_39_v23rd1.png`, z: 2 },
  { kind: 'stat', theme: 'pink', value: '50+', foot: 'Brands built, fixed, or rescued', z: 3 },
]

const transformStyles = [
  'rotate(-3deg) translate(-340px)',
  'rotate(2deg) translate(-170px)',
  'rotate(-2deg) translate(0px)',
  'rotate(3deg) translate(170px)',
  'rotate(-4deg) translate(340px)',
]

export default function FeelsLike() {
  return (
    <section id="feels" className="feels-section">
      <h2 className="feels-head">
        What <span className="italic-accent">working</span> with
        <br />
        us actually <span className="italic-accent">feels</span> like.
      </h2>

      <div className="feels-stage">
        <BounceCards
          cards={cards}
          transformStyles={transformStyles}
          containerWidth={980}
          containerHeight={360}
          animationDelay={0.4}
          animationStagger={0.1}
          easeType="elastic.out(1, 0.6)"
          enableHover
        />
      </div>
    </section>
  )
}
