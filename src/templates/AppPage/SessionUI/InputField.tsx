import React from 'react'
import useStore from './TextDisplay/useStore'
import CSS from './InputField.module.css'

export function InputField(props: { disabled?: boolean }) {
  const { state, actions } = useStore()
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (!inputRef.current) return
    if (props.disabled) return

    inputRef.current.focus()
  }, [props.disabled])

  return (
    <input
      ref={inputRef}
      className={CSS.input}
      autoComplete={'off'}
      disabled={props.disabled}
      autoCapitalize={'off'}
      type='text'
      placeholder={
        state.session.status === 'ready' ? 'Type something to start' : undefined
      }
      value={state.currentInput.value}
      onChange={(event) => {
        actions.setInputValue(event.target.value)
      }}
      onKeyPress={(event) => {
        if (event.key === ' ' || event.key === '\t' || event.key === 'Enter') {
          event.preventDefault()
          actions.inputWhitespace()
        }
      }}
    />
  )
}

export default InputField
