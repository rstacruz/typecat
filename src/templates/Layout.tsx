import React from 'react'
import AppMetaTags from './AppPage/AppMetaTags'

function Layout(props: { children: React.ReactNode }) {
  return (
    <>
      <AppMetaTags
        title='Typecat'
        path='/'
        description='How fast can you type?'
      />
      {props.children}
    </>
  )
}
export default Layout
