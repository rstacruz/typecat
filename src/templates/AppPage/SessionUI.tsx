import React from 'react'
import cn from 'classnames'
import useStore from '../../store/useStore'
import { ResultsDisplay } from './SessionUI/ResultsDisplay'
import InputField from './SessionUI/InputField'
import MockTextDisplay from './SessionUI/MockTextDisplay'
import { ProgressIndicator } from './SessionUI/ProgressIndicator'
import SessionTimer from './SessionUI/SessionTimer'
import CSS from './SessionUI/SessionUI.module.css'
import TextDisplay from './SessionUI/TextDisplay'
import { VariantLinks } from './SessionUI/VariantLinks'
import { ExternalNav } from './SessionUI/ExternalNav'

function SessionUI() {
  const { state } = useStore()
  const inProgress = state.session.status === 'ongoing'

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
              {/* <div className={CSS.articleSpacer} /> */}
            </div>
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

        <div className={CSS.indicatorArea}>
          <ProgressIndicator />
        </div>
      </label>

      <div className={cn(CSS.results, CSS.mutable, { [CSS.mute]: inProgress })}>
        <ResultsDisplay />
      </div>

      <div
        className={cn(CSS.bottomNav, CSS.mutable, { [CSS.mute]: inProgress })}
      >
        <VariantLinks />
      </div>

      <div
        className={cn(CSS.externalNav, CSS.mutable, { [CSS.mute]: inProgress })}
      >
        <ExternalNav />
      </div>
    </div>
  )
}

export default SessionUI
