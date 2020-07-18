import React from 'react'
import useStore from './useStore'
import CSS from './InputField.module.css'

export function InputField() {
  const { state, actions } = useStore()

  return (
    <input
      className={CSS.input}
      autoFocus
      type='text'
      placeholder={
        state.session.status === 'idle' ? 'Type something to start' : undefined
      }
      value={state.currentInput.value}
      onChange={(event) => {
        actions.setInputValue(event.target.value)
      }}
      onKeyPress={(event) => {
        if (event.key === ' ' || event.key === '\t') {
          event.preventDefault()
          actions.inputWhitespace({ skipNext: false })
        } else if (event.key === 'Enter') {
          event.preventDefault()
          actions.inputWhitespace({ skipNext: false })
        }
      }}
    />
  )
}

export default InputField
