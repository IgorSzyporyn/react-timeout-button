import { keyframes } from '@emotion/core'
import styled from '@emotion/styled'
import React, { HTMLAttributes } from 'react'

const ltrKeyframes = keyframes`
  0% {
    left: 0;
  }
  100% {
    left: 100%;
  }
`

const rtlKeyframes = keyframes`
  0% {
    right: 0;
  }
  100% {
    right: 100%;
  }
`

const Wrapper = styled.span(
  ({ timeout, paused, color, opacity, rtl }: TimeoutButtonOverlayProps) => ({
    animation: `${rtl ? rtlKeyframes : ltrKeyframes} ${timeout / 1000}s linear 1`,
    animationFillMode: 'forwards',
    animationPlayState: paused ? 'paused' : 'initial',
    background: color,
    bottom: 0,
    left: 0,
    opacity: opacity,
    position: 'absolute',
    right: 0,
    top: 0,
  })
)

export type TimeoutButtonOverlayProps = {
  color?: string
  opacity?: number
  paused?: boolean
  rtl?: boolean
  timeout: number
} & HTMLAttributes<HTMLSpanElement>

export const TimeoutButtonOverlay = (props: TimeoutButtonOverlayProps) => {
  return <Wrapper {...props} />
}

TimeoutButtonOverlay.defaultProps = {
  color: '#000000',
  opacity: 0.15,
}
