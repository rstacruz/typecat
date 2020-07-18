import React from 'react'
import TextDisplay from './AppPage/SessionUI/TextDisplay'
import InputField from './AppPage/SessionUI/InputField'
import CSS from './AppPage/SessionUI/SessionUI.module.css'

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
