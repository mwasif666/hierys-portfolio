import BounceCards from '../BounceCards/BounceCards'
import './FeelsLike.css'

const base = 'https://res.cloudinary.com/djyb4mzzk/image/upload'
const avatar =
  'https://res.cloudinary.com/djyb4mzzk/image/upload/v1782764919/Rectangle_327_ed5qv7.png'

const testimonials = Array.from({ length: 8 }, (_, index) => ({
  id: index,
  quote: 'The Hierys team delivered our investor pitch deck in 3 days and it was flawless.',
  name: 'James Okafor',
  role: 'Marketing Director, Pulse Brands',
}))

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

function TestimonialCard({ item }) {
  return (
    <article className="testimonial-card">
      <p className="testimonial-quote">{item.quote}</p>

      <div className="testimonial-foot">
        <img className="testimonial-avatar" src={avatar} alt="" loading="lazy" />
        <div className="testimonial-person">
          <h3>{item.name}</h3>
          <p>{item.role}</p>
        </div>
        <span className="testimonial-logo" aria-label="Ms Eatery">
          <strong>Ms</strong>
          <span>EATERY</span>
        </span>
      </div>
    </article>
  )
}

function TestimonialRow({ reverse = false }) {
  const rowItems = [...testimonials, ...testimonials]

  return (
    <div className={`testimonial-row ${reverse ? 'testimonial-row--reverse' : ''}`}>
      {rowItems.map((item, index) => (
        <TestimonialCard item={item} key={`${item.id}-${index}`} />
      ))}
    </div>
  )
}

export default function FeelsLike() {
  return (
    <section id="feels" className="feels-section">
      <div className="testimonial-area">
        <p className="testimonial-eyebrow">TESTIMONIALS</p>

        <div className="testimonial-marquee" aria-label="Client testimonials">
          <TestimonialRow />
          <TestimonialRow reverse />
        </div>
      </div>

      <div className="feels-showcase">
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
      </div>
    </section>
  )
}
