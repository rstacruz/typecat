import React from 'react'
import AppMetaTags from './AppPage/AppMetaTags'

function Layout(props: { children: React.ReactNode }) {
  return (
    <>
      <AppMetaTags title='Typecat' path='/' />
      {props.children}
    </>
  )
}
export default Layout
