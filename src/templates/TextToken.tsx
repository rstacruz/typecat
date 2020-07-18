import React from 'react'
import useStore, { Token } from './AppPage/useStore'
import CSS from './TextToken.module.css'
import cn from 'classnames'

export function TextToken(props: { token: Token }) {
  const { token } = props
  const { state } = useStore()

  return <span className={CSS.root}>{token.value}</span>
}

export default TextToken
