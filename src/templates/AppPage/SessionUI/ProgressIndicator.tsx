import useStore, { State } from '../../../store/useStore'
import CSS from './ProgressIndicator.module.css'
import React from 'react'

function ProgressIndicator() {
  const { state } = useStore()

  const { percent } = getProgressStats(state)
  const { interimResult } = state
  const wpm = interimResult ? Math.round(interimResult.wpm) : null
  const isEnoughTime = interimResult && interimResult.durationMs > 2500

  return (
    <div>
      <div className={CSS.track}>
        <span
          className={CSS.indicator}
          style={{ width: `${percent * 100}%` }}
        />
        <span className={CSS.spacer} style={{ width: `${percent * 100}%` }} />
      </div>
    </div>
  )
}

function getProgressStats(state: State) {
  if (state.session.status !== 'ongoing') {
    return { done: 0, total: 0, percent: 0 }
  }

  const done = state.currentInput.finishedTokens.length
  const total = state.article.tokens.length
  const percent = done / total

  return { done, total, percent }
}

export { ProgressIndicator }
