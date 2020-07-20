import React from 'react'
import AppMetaTags from './AppMetaTags'

function Layout(props: { children: React.ReactNode }) {
  return (
    <>
      <AppMetaTags title='Typecat' path='/' />
      {props.children}
    </>
  )
}
export default Layout
