import React from 'react'
import Helmet from 'next/head'

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
