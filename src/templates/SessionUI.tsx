import React from 'react'
import TextDisplay from './AppPage/SessionUI/TextDisplay'
import InputField from './AppPage/SessionUI/InputField'
import CSS from './AppPage/SessionUI/SessionUI.module.css'
import useStore from './AppPage/SessionUI/useStore'
import SessionTimer from './SessionTimer'

function SessionUI() {
  const { state } = useStore()

  return (
    <div className={CSS.wrap}>
      <label className={CSS.root}>
        <div className={CSS.article}>
          <TextDisplay />
        </div>

        {state.session.status === 'finished' ? (
          <div className={CSS.finishedInput}>
            <span>124 WPM, 97% accuracy</span>
          </div>
        ) : state.session.status === 'ongoing' ? (
          <div className={CSS.ongoingInput}>
            <span className={CSS.inputField}>
              <InputField />
            </span>
            <span className={CSS.timer}>
              <SessionTimer startedAt={state.session.startedAt} />
            </span>
          </div>
        ) : (
          <div className={CSS.idleInput}>
            <InputField />
          </div>
        )}
      </label>
    </div>
  )
}

export default SessionUI
