import React from 'react'
import useStore from './useStore'

export function InputField() {
  const { state, actions } = useStore()

  return (
    <input
      autoFocus
      type='text'
      value={state.input.value}
      onChange={(event) => {
        console.log('change', event)
        actions.setInputValue(event.target.value)
      }}
      onKeyPress={(event) => {
        if (event.key === ' ' || event.key === 'Enter') {
          actions.inputWhitespace()
        }
      }}
    />
  )
}

export default InputField
