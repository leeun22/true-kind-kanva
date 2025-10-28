export interface SwiperInteractionState {
  isGrabbing: boolean
  handleTouchStart: () => void
  handleTouchEnd: () => void
}

export interface SlideTransformConfig {
  transform: string
  transition: string
}
