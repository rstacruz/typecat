import React from 'react'
import TextDisplay from './SessionUI/TextDisplay'
import InputField from './SessionUI/InputField'
import CSS from './SessionUI/SessionUI.module.css'
import useStore from '../../store/useStore'
import SessionTimer from './SessionUI/SessionTimer'
import MockTextDisplay from './SessionUI/MockTextDisplay'
import { ResultsDisplay } from './ResultsDisplay'
import { VariantLinks } from './VariantLinks'
import { ProgressIndicator } from './SessionUI/ProgressIndicator'

function SessionUI() {
  const { state } = useStore()

  return (
    <div className={CSS.wrap}>
      <label className={CSS.root}>
        <div className={CSS.articleBox}>
          <div className={CSS.article}>
            <div className={CSS.articleContent}>
              <div className={CSS.articleSpacer} />
              {state.session.status === 'pending' ? (
                <MockTextDisplay />
              ) : (
                <TextDisplay />
              )}
              <div className={CSS.articleSpacer} />
            </div>
          </div>
        </div>

        <div className={CSS.indicatorArea}>
          <ProgressIndicator />
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

      <div className={CSS.bottomNav}>
        <VariantLinks />
      </div>
    </div>
  )
}

export default SessionUI
