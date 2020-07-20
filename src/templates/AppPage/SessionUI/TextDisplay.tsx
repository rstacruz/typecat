import React from 'react'
import useStore from '../../../store/useStore'
import {
  ActiveTextToken,
  WhitespaceToken,
  FutureToken,
  PastToken,
} from './TextDisplay/TextToken'
import CSS from './TextDisplay/TextDisplay.module.css'

export function TextDisplay() {
  const { state } = useStore()
  const tokens = state.article.tokens

  return (
    <div className={CSS.root}>
      {tokens.map((token, tokenIndex) => {
        if (!token) return null

        const key = tokenIndex
        const isActive = state.currentInput.tokenIndex === tokenIndex
        const finishedStatus = state.currentInput.finishedTokens[tokenIndex]

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
      })}
    </div>
  )
}

export default TextDisplay
