import React from 'react'
import Layout from './AppPage/Layout'

const NotFoundPage = () => (
  <Layout>
    <div
      style={{
        margin: '48vh auto 0 auto',
        textAlign: 'center',
        userSelect: 'none',
      }}
    >
      <strong>Oops!</strong> <span>This page doesn't exist yet.</span>
    </div>
  </Layout>
)

export default NotFoundPage
