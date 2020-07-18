import React from 'react'
import TextDisplay from './TextDisplay'
import InputField from './InputField'
import CSS from './SessionUI.module.css'

function SessionUI() {
  return (
    <div className={CSS.root}>
      <div className={CSS.article}>
        <TextDisplay />
      </div>

      <div className={CSS.input}>
        <InputField />
      </div>
    </div>
  )
}

export default SessionUI
