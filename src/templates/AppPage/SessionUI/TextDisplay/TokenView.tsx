import React from 'react'
import useStore, { Token } from '../../../../store/useStore'
import {
  ActiveTextToken,
  WhitespaceToken,
  FutureToken,
  PastToken,
} from './TokenView/TextToken'

function TokenView(props: { token: Token; index: number }) {
  const { state } = useStore()
  const { token, index } = props

  const key = index
  const isActive = state.currentInput.tokenIndex === index
  const finishedStatus = state.currentInput.finishedTokens[index]

  if (isActive) {
    const { isAccurate, charIndex } = state.currentInput
    return <ActiveTextToken {...{ key, token, charIndex, isAccurate }} />
  }

  if (token.type === 'whitespace') {
    return <WhitespaceToken {...{ key, value: token.value }} />
  }

  if (finishedStatus) {
    return <PastToken {...{ key, value: token.value, finishedStatus }} />
  }

  return <FutureToken {...{ key, value: token.value }} />
}

export default TokenView
