import React from 'react'
import useStore, { Token } from './useStore'
import TextToken from './TextDisplay/TextToken'
import CSS from './TextDisplay/TextDisplay.module.css'

export function TextDisplay() {
  const { state } = useStore()
  const tokens = state.article.tokens

  return (
    <div className={CSS.root}>
      {tokens.map((token: Token, index: number) => {
        return <TextToken key={index} {...{ token, index }} />
      })}
    </div>
  )
}

export default TextDisplay
