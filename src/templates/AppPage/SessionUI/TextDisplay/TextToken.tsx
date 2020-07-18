import React from 'react'
import useStore, { Token } from '../useStore'
import CSS from './TextToken.module.css'
import cn from 'classnames'

const NBSP = String.fromCharCode(160)

export function TextToken(props: { token: Token; index: number }) {
  const { token } = props
  const { state } = useStore()
  const isActive = state.article.currentToken === props.index

  const value = token.value.replace(/ /g, NBSP)
  return (
    <span className={cn(CSS.root, { [CSS.isActive]: isActive })}>{value}</span>
  )
}

export default TextToken
