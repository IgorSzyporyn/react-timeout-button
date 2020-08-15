import styled from '@emotion/styled'
import React, { ButtonHTMLAttributes, MouseEvent, useEffect, useState } from 'react'
import { getClassnames } from 'utils/get-classnames'
import { COMPONENT_ID } from '../constants'
import { getButtonText } from '../utils/get-button-text'
import { TimeoutButtonOverlay } from './TimeoutButtonOverlay'

const Button = styled.button({
  position: 'relative',
  overflow: 'hidden',
})

type TimeoutButtonState = {
  buttonText: string
  paused: boolean
  timeElapsed: number
  timeRemaining: number
  timeStarted: number
  touched: boolean
}

export type TimeoutButtonProps = {
  cancelTimeoutOnHover?: boolean
  digits?: 0 | 1 | 2 | 3
  overlay?: boolean
  overlayBackground?: string
  overlayOpacity?: number
  overlayPosition?: 'before' | 'after'
  overlayRtl?: boolean
  pauseOnHover?: boolean
  text?: string
  timeout: number
  onTimeout?: () => void
} & ButtonHTMLAttributes<HTMLButtonElement>

export const TimeoutButton = (props: TimeoutButtonProps) => {
  const {
    cancelTimeoutOnHover,
    children,
    className,
    digits,
    overlay,
    overlayBackground,
    overlayOpacity,
    overlayPosition,
    overlayRtl,
    pauseOnHover,
    text,
    timeout,
    onTimeout,
    ...rest
  } = props

  const [
    { buttonText, paused, timeElapsed, timeStarted, timeRemaining, touched },
    setState,
  ] = useState<TimeoutButtonState>({
    buttonText: getButtonText(text || '', timeout, digits),
    paused: false,
    timeElapsed: 0,
    timeRemaining: timeout,
    timeStarted: Date.now(),
    touched: false,
  })

  let intervalTempo = 100

  switch (digits) {
    case 0:
      intervalTempo = 350
      break
    case 1:
      intervalTempo = 100
      break
    case 2:
      intervalTempo = 20
      break
    case 3:
      intervalTempo = 4
      break
    default:
      intervalTempo = 4
      break
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        const _timeStarted = Date.now()

        let _timeElapsed = timeElapsed + (_timeStarted - timeStarted)
        let _timeRemaining = timeout - timeElapsed

        if (timeElapsed > timeout || _timeRemaining < 0) {
          _timeElapsed = timeout
          _timeRemaining = 0
        }

        const buttonText = getButtonText(text || '', _timeRemaining, digits)

        setState((state) => ({
          ...state,
          timeStarted: _timeStarted,
          timeElapsed: _timeElapsed,
          timeRemaining: _timeRemaining,
          buttonText,
        }))
      }
    }, intervalTempo)

    if (timeRemaining <= 0 || (touched && cancelTimeoutOnHover)) {
      const buttonText = getButtonText(text || '', 0)

      setState((state) => ({
        ...state,
        timeRemaining: 0,
        timeElapsed: timeout,
        buttonText,
      }))

      clearInterval(interval)

      onTimeout && onTimeout()
    }

    return () => clearInterval(interval)
  }, [paused, timeElapsed, timeStarted, timeRemaining, touched])

  const handleTimedPause = (
    e: MouseEvent<HTMLButtonElement>,
    fn: ((event: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void) | undefined
  ) => {
    fn && fn(e)
    setState((state) => ({
      ...state,
      paused: pauseOnHover ? true : false,
      touched: true,
    }))
  }

  const handleTimedResume = (
    e: MouseEvent<HTMLButtonElement>,
    fn: ((event: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void) | undefined
  ) => {
    fn && fn(e)
    if (pauseOnHover) {
      setState((state) => ({
        ...state,
        paused: false,
        timeStarted: Date.now(),
      }))
    }
  }

  const allowOverlay = overlay && !(touched && cancelTimeoutOnHover)
  const classNames = getClassnames(className)

  return (
    <Button
      className={classNames}
      onMouseEnter={(e) => {
        handleTimedPause(e, props.onMouseEnter)
      }}
      {...rest}
      onMouseLeave={(e) => {
        handleTimedResume(e, props.onMouseLeave)
      }}
    >
      {allowOverlay && overlayPosition === 'before' && (
        <TimeoutButtonOverlay
          className={`${COMPONENT_ID}__overlay ${COMPONENT_ID}__overlay--before`}
          color={overlayBackground}
          opacity={overlayOpacity}
          paused={paused}
          timeout={timeout}
          rtl={overlayRtl}
        />
      )}
      {children}
      {text && (
        <span style={{ minWidth: '100%' }} className={`${COMPONENT_ID}__text`}>
          {buttonText}
        </span>
      )}
      {allowOverlay && overlayPosition === 'after' && (
        <TimeoutButtonOverlay
          className={`${COMPONENT_ID}__overlay ${COMPONENT_ID}__overlay--after`}
          color={overlayBackground}
          opacity={overlayOpacity}
          paused={paused}
          timeout={timeout}
          rtl={overlayRtl}
        />
      )}
    </Button>
  )
}

TimeoutButton.defaultProps = {
  digits: 0,
  overlay: false,
  overlayPosition: 'before',
  overlayOpacity: 0.15,
  overlayBackground: '#000000',
}
