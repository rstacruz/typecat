import React from 'react'
import { Token, TokenStatus } from '../useStore'
import CSS from './TextToken.module.css'
import cn from 'classnames'

const NBSP = String.fromCharCode(160)

/**
 * Token that the user is typing at
 */

export function ActiveTextToken(props: { token: Token; charIndex: number }) {
  const { token, charIndex } = props
  const value = token.value.replace(/ /g, NBSP)

  const [left, right] =
    charIndex <= 0
      ? ['', value]
      : [value.substr(0, charIndex), value.substr(charIndex)]

  return (
    <span className={cn(CSS.root, CSS.isActive)}>
      {left !== '' ? <span className={CSS.left}>{left}</span> : null}
      <span className={CSS.cursor} />
      <span className={CSS.right}>{right}</span>
    </span>
  )
}

/**
 * Whitespace
 */

export function WhitespaceToken(props: { value: string }) {
  const newValue = props.value.replace(/ /g, NBSP)
  return <span>{newValue}</span>
}

/**
 * Token yet to be typed
 */

export function FutureToken(props: { value: string }) {
  return <span className={cn(CSS.root)}>{props.value}</span>
}

/**
 * Token that's already been typed
 */

export function PastToken(props: {
  value: string
  finishedStatus: TokenStatus
}) {
  return (
    <span
      className={cn(
        CSS.root,
        props.finishedStatus.isAccurate ? CSS.isDone : CSS.isDoneError
      )}
    >
      {props.value}
    </span>
  )
}
