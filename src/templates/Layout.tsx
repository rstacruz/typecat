import React from 'react'
import { Helmet } from 'react-helmet'
import './AppPage/Layout/css'

function Layout(props: { children: React.ReactNode }) {
  return (
    <>
      <Helmet>
        <html lang='en' />
        <title>Type</title>
      </Helmet>

      <div>{props.children}</div>
    </>
  )
}
export default Layout
