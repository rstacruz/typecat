import React from 'react'
import useStore, { Token } from '../useStore'
import CSS from './TextToken.module.css'
import cn from 'classnames'

const NBSP = String.fromCharCode(160)

export function TextToken(props: { token: Token; index: number }) {
  const { token } = props
  const { state } = useStore()
  const isActive = state.currentInput.currentToken === props.index
  const isDone = state.currentInput.currentToken > props.index

  const value = token.value.replace(/ /g, NBSP)
  const charIndex = state.currentInput.currentChar

  if (token.type === 'whitespace') {
    return <span>{value}</span>
  }

  const [left, right] =
    charIndex <= 0
      ? ['', value]
      : [value.substr(0, charIndex), value.substr(charIndex)]

  return (
    <span
      className={cn(CSS.root, {
        [CSS.isActive]: isActive,
        [CSS.isDone]: isDone,
      })}
    >
      {isActive ? (
        <>
          {left !== '' ? <span className={CSS.left}>{left}</span> : null}
          <span className={CSS.cursor} />
          <span className={CSS.right}>{right}</span>
        </>
      ) : (
        <span>{value}</span>
      )}
    </span>
  )
}

export default TextToken
