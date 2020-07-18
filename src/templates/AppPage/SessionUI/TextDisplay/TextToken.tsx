import React from 'react'
import { Token, TokenStatus } from '../useStore'
import CSS from './TextToken.module.css'
import cn from 'classnames'

const NBSP = String.fromCharCode(160)

/**
 * Token that the user is typing at
 */

export function ActiveTextToken(props: {
  token: Token
  charIndex: number
  isAccurate: boolean
}) {
  const { token, charIndex } = props
  const value = token.value.replace(/ /g, NBSP)

  const [left, right] =
    charIndex <= 0
      ? ['', value]
      : [value.substr(0, charIndex), value.substr(charIndex)]

  const { isAccurate } = props

  const spanRef = React.useRef<HTMLSpanElement>(null)

  React.useLayoutEffect(() => {
    if (!spanRef.current) return
    spanRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [])

  return (
    <span
      ref={spanRef}
      className={cn(CSS.root, CSS.isActive, !isAccurate && CSS.isActiveError)}
    >
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
  const Frag = React.Fragment
  return (
    <span>
      {props.value.split(/((?: +)|\n)/).map((space, index) => {
        if (!space.length) return null
        if (space === ' ') return <Frag key={index}> </Frag>
        if (space === '\n') return <br key={index} />
        return <Frag key={index}>{space.replace(/ /g, NBSP)}</Frag>
      })}
    </span>
  )
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
