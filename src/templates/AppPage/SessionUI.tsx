import React from 'react'
import Link from 'next/link'
import TextDisplay from './SessionUI/TextDisplay'
import InputField from './SessionUI/InputField'
import CSS from './SessionUI/SessionUI.module.css'
import useStore from '../../store/useStore'
import SessionTimer from './SessionUI/SessionTimer'
import MockTextDisplay from './SessionUI/MockTextDisplay'
import InterimResult from './InterimResult'

function SessionUI() {
  const { state } = useStore()

  return (
    <div className={CSS.wrap}>
      {state.interimResult ? (
        <span className={CSS.extraStatus}>
          <InterimResult result={state.interimResult} />
        </span>
      ) : null}

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

function VariantLinks() {
  const wordCounts = [25, 50, 100]
  return (
    <nav>
      {wordCounts.map((wordCount) => (
        <span key={wordCount}>
          <Link href='/english/[wordCount]' as={`/english/${wordCount}`}>
            <a>{wordCount}</a>
          </Link>{' '}
        </span>
      ))}
    </nav>
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
            {Math.round(result.wpm)} WPM, {Math.round(result.accuracy * 100)}%
            accuracy
            {result.mistakeCount !== 0 ? (
              <span title={`${result.mistakeCount} characters mistyped`}>
                {' '}
                (-{result.mistakeCount})
              </span>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}

export default SessionUI
