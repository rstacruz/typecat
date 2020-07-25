import React from 'react'
import useStore from '../../../store/useStore'
import CSS from './TextDisplay/TextDisplay.module.css'
import TokenView from './TextDisplay/TokenView'

export function TextDisplay() {
  const { state } = useStore()
  const tokens = state.article.tokens

  return (
    <div className={CSS.root}>
      {tokens.map((token, index) => {
        if (!token) return null
        return <TokenView key={index} {...{ token, index }} />
      })}
    </div>
  )
}

export default TextDisplay
