import React from 'react'
import useStore, { Token } from '../useStore'
import CSS from './TextToken.module.css'
import cn from 'classnames'

const NBSP = String.fromCharCode(160)

export function TextToken(props: { token: Token; index: number }) {
  const { token, index } = props
  const { state } = useStore()
  const isActive = state.currentInput.tokenIndex === index
  const finishedStatus = state.currentInput.finishedTokens[index]

  const value = token.value.replace(/ /g, NBSP)
  const charIndex = state.currentInput.charIndex

  if (token.type === 'whitespace') {
    return <span>{value}</span>
  } else if (finishedStatus) {
    // Past word
    return <span className={cn(CSS.root, CSS.isDone)}>{value}</span>
  } else if (!isActive) {
    // Future word
    return <span className={cn(CSS.root)}>{value}</span>
  } else {
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
}

export default TextToken
