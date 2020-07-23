import React from 'react'

function InterimResult(props: { result: { wpm: number } }) {
  const wpm: number = props.result.wpm
  return <span style={{ opacity: 0.25 }}>{Math.round(wpm)} WPM</span>
}

export default InterimResult
