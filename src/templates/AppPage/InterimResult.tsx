import React from 'react'

function InterimResult(props: { result: { wpm: number } }) {
  const wpm: number = props.result.wpm
  return (
    <span
      style={{ position: 'fixed', opacity: 0.25, top: '2rem', right: '2rem' }}
    >
      {Math.round(wpm)} WPM
    </span>
  )
}

export default InterimResult
