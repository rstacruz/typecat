import React from 'react'
import useStore from '../../../store/useStore'

export function ResultsDisplay() {
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
