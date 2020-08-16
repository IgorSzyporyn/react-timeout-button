import styled from '@emotion/styled'
import React, { ButtonHTMLAttributes, MouseEvent, useEffect, useState, forwardRef } from 'react'
import { getClassnames } from '../utils/get-classnames'
import { COMPONENT_ID } from '../constants'
import { getButtonText } from '../utils/get-button-text'
import { ReactTimeoutButtonOverlay } from './ReactTimeoutButtonOverlay'

const Button = styled.button({
  position: 'relative',
  overflow: 'hidden',
})

type ReactTimeoutButtonState = {
  buttonText: string
  callbackUsed: boolean
  paused: boolean
  timeElapsed: number
  timeRemaining: number
  timeStarted: number
  touched: boolean
}

export type ReactTimeoutButtonProps = {
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

export const ReactTimeoutButton = forwardRef<HTMLButtonElement, ReactTimeoutButtonProps>(
  (props, ref) => {
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
      { buttonText, callbackUsed, paused, timeElapsed, timeStarted, timeRemaining, touched },
      setState,
    ] = useState<ReactTimeoutButtonState>({
      buttonText: getButtonText(text || '', timeout, digits),
      callbackUsed: false,
      paused: false,
      timeElapsed: 0,
      timeRemaining: timeout,
      timeStarted: Date.now(),
      touched: false,
    })

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
      }, 4)

      if (timeRemaining <= 0 || (touched && cancelTimeoutOnHover)) {
        const buttonText = getButtonText(text || '', 0)

        setState((state) => {
          if (onTimeout && !callbackUsed && !(touched && cancelTimeoutOnHover)) {
            onTimeout()
          }

          return {
            ...state,
            callbackUsed: true,
            timeRemaining: 0,
            timeElapsed: timeout,
            buttonText,
          }
        })

        clearInterval(interval)
      }

      return () => clearInterval(interval)
    }, [paused, timeElapsed, timeStarted, timeRemaining, touched, callbackUsed])

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
        {...rest}
        onMouseEnter={(e) => {
          handleTimedPause(e, props.onMouseEnter)
        }}
        onMouseLeave={(e) => {
          handleTimedResume(e, props.onMouseLeave)
        }}
        ref={ref}
      >
        {allowOverlay && overlayPosition === 'before' && (
          <ReactTimeoutButtonOverlay
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
          <ReactTimeoutButtonOverlay
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
)

ReactTimeoutButton.defaultProps = {
  digits: 0,
  overlay: false,
  overlayPosition: 'before',
  overlayOpacity: 0.15,
  overlayBackground: '#000000',
}
