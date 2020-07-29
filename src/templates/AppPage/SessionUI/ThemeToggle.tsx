import React from 'react'
import useStore from '../../../store/useStore'
import { Sun, Moon } from 'react-feather'
import CSS from './ThemeToggle.module.css'
import cn from 'classnames'

export function ThemeToggle() {
  const { state, actions } = useStore()
  const { themeStyle } = state.preferences

  return (
    <span className={CSS.root}>
      <button
        className={cn(CSS.dayButton, themeStyle !== 'night' && CSS.isInactive)}
        onClick={() => {
          actions.setThemeStyle('day')
        }}
      >
        <Sun />
      </button>
      <button
        className={cn(
          CSS.nightButton,
          themeStyle === 'night' && CSS.isInactive
        )}
        onClick={() => {
          actions.setThemeStyle('night')
        }}
      >
        <Moon />
      </button>
    </span>
  )
}
