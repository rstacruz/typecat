import React from 'react'
import useStore from '../../../store/useStore'
import CSS from './TextDisplay/TextDisplay.module.css'
import TokenView from './TextDisplay/TokenView'
import AddTooltip from './TextDisplay/AddTooltip'

export function TextDisplay() {
  const { state } = useStore()
  const tokens = state.article.tokens
  const { tokenIndex, finishedTokens } = state.currentInput

  return (
    <div className={CSS.root}>
      {tokens.map((token, index) => {
        if (!token) return null
        const isPrevious = tokenIndex - 2 === index
        if (isPrevious) {
          return (
            <AddTooltip key={index} finishedToken={finishedTokens[index]}>
              <TokenView {...{ token, index }} />
            </AddTooltip>
          )
        } else {
          return <TokenView key={index} {...{ token, index }} />
        }
      })}
    </div>
  )
}

export default TextDisplay
