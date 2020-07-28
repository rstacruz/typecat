import React from 'react'
import useStore from '../../../store/useStore'
import { Sun, Moon } from 'react-feather'
import CSS from './ThemeToggle.module.css'

export function ThemeToggle() {
  const { state, actions } = useStore()
  const { themeStyle } = state.preferences

  if (themeStyle === 'night') {
    return (
      <button
        className={CSS.dayButton}
        onClick={() => {
          actions.setThemeStyle('day')
        }}
      >
        <Sun />
      </button>
    )
  } else {
    return (
      <button
        className={CSS.nightButton}
        onClick={() => {
          actions.setThemeStyle('night')
        }}
      >
        <Moon />
      </button>
    )
  }
}
