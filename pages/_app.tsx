import 'sanitize.css'
import 'typeface-roboto-mono'
import '../src/templates/AppPage/Layout/base.css'

export default function App(props: any) {
  const { Component, pageProps } = props
  return <Component {...pageProps} />
}
