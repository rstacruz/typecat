import React from 'react'
import useStore from './AppPage/useStore'
import TextDisplay from './TextDisplay'

function AppPage() {
  return (
    <div>
      <TextDisplay />
      <InputField />
    </div>
  )
}

function InputField() {
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

export default AppPage
