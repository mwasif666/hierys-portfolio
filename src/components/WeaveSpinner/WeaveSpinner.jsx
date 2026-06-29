import './WeaveSpinner.css'

export default function WeaveSpinner() {
  return (
    <div className="weave-spinner" aria-hidden="true">
      <div className="weave-spinner__container">
        <span className="weave-spinner__thread weave-spinner__thread--one" />
        <span className="weave-spinner__thread weave-spinner__thread--two" />
        <span className="weave-spinner__thread weave-spinner__thread--three" />
        <span className="weave-spinner__thread weave-spinner__thread--four" />
        <span className="weave-spinner__node" />
      </div>
    </div>
  )
}
