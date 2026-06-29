import './Foundation.css'

/* Inline images embedded in the headline.
   img1 = provided asset. img2 = swap in the phone/app image when available. */
const INLINE_IMG_1 =
  'https://res.cloudinary.com/djyb4mzzk/image/upload/v1782221023/14_1_xi5e6t.png'
const INLINE_IMG_2 =
  'https://res.cloudinary.com/djyb4mzzk/image/upload/v1782466892/9_2_f7gp4b.png'

export default function Foundation() {
  return (
    <section id="foundation" className="foundation">
      <h2 className="foundation-head">
        <span className="fh-line">You don&apos;t have a</span>
        <span className="fh-line">
          marketing <img className="inline-img" src={INLINE_IMG_1} alt="" /> problem.
        </span>
        <span className="fh-line">
          You have <img className="inline-img" src={INLINE_IMG_2} alt="" /> a foundation
        </span>
        <span className="fh-line">problem.</span>
      </h2>
    </section>
  )
}
