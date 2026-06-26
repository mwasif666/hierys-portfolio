import { useState } from 'react'
import Skeleton from '@mui/material/Skeleton'
import './ImageWithSkeleton.css'

export default function ImageWithSkeleton({
  src,
  alt = '',
  className = '',
  wrapperClassName = '',
  loading = 'lazy',
  ...imgProps
}) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <span className={`image-skeleton-shell ${isLoaded ? 'is-loaded' : ''} ${wrapperClassName}`}>
      {!isLoaded && (
        <Skeleton
          className="image-skeleton"
          variant="rectangular"
          animation="wave"
        />
      )}
      <img
        {...imgProps}
        className={className}
        src={src}
        alt={alt}
        loading={loading}
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsLoaded(true)}
      />
    </span>
  )
}
