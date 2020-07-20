import React from 'react'
import TextDisplay from './SessionUI/TextDisplay'
import InputField from './SessionUI/InputField'
import CSS from './SessionUI/SessionUI.module.css'
import useStore from './SessionUI/TextDisplay/useStore'
import SessionTimer from './SessionUI/SessionTimer'
import MockTextDisplay from './SessionUI/MockTextDisplay'

function SessionUI() {
  const { state } = useStore()

  return (
    <div className={CSS.wrap}>
      <label className={CSS.root}>
        <div className={CSS.article}>
          <div className={CSS.articleContent}>
            {state.session.status === 'pending' ? (
              <MockTextDisplay />
            ) : (
              <TextDisplay />
            )}
          </div>
        </div>

        {state.session.status === 'ongoing' ? (
          <div className={CSS.ongoingInput}>
            <span className={CSS.inputField}>
              <InputField />
            </span>
            <span className={CSS.timer}>
              <SessionTimer startedAt={state.session.startedAt} />
            </span>
          </div>
        ) : state.session.status === 'pending' ? (
          <div className={CSS.idleInput}>
            <InputField disabled />
          </div>
        ) : (
          <div className={CSS.idleInput}>
            <InputField />
          </div>
        )}
      </label>

      <div className={CSS.results}>
        <ResultsDisplay />
      </div>
    </div>
  )
}

function ResultsDisplay() {
  const { state } = useStore()
  const { results } = state
  return (
    <div>
      {[...results].reverse().map((result, index) => {
        return (
          <div key={index}>
            {result.wpm} WPM, {Math.round(result.accuracy * 100)}% accuracy
          </div>
        )
      })}
    </div>
  )
}

export default SessionUI
