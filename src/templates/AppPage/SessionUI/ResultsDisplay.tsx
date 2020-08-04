import React from 'react'
import useStore from '../../../store/useStore'
import { ResultItem } from './ResultsDisplay/ResultItem'
import CSS from './ResultsDisplay/ResultsDisplay.module.css'

export function ResultsDisplay() {
  const { state } = useStore()
  const { results } = state
  return (
    <div className={CSS.root}>
      {[...results]
        .reverse()
        .slice(0, 5)
        .map((result, index) => {
          if (!result) return null
          return (
            <span className={CSS.item} key={results.length - index}>
              <ResultItem result={result} latest={index === 0} />
            </span>
          )
        })}
    </div>
  )
}
