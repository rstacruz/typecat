import React from 'react'
import useStore, { Token } from './AppPage/useStore'
import TextToken from './TextToken'

export function TextDisplay() {
  const { state } = useStore()
  const tokens = state.article.tokens

  return (
    <div>
      {tokens.map((token: Token, index: number) => {
        return <TextToken key={index} token={token} />
      })}
    </div>
  )
}

export default TextDisplay
