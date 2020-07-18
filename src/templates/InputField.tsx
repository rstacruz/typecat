import React from 'react'
import useStore from './AppPage/useStore'

export function InputField() {
  const { state, actions } = useStore()

  return (
    <input
      autoFocus
      type='text'
      value={state.input.value}
      onChange={(event) => {
        actions.setInputValue(event.target.value)
      }}
    />
  )
}

export default InputField
