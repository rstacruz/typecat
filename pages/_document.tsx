import Document, { Head, Main, NextScript, Html } from 'next/document'
import { readFileSync } from 'fs'
import { join } from 'path'

// https://github.com/vercel/next-plugins/issues/238#issuecomment-432211871
class InlineStylesHead extends Head {
  getCssLinks() {
    if (process.env.NODE_ENV === 'production') {
      return this.__getInlineStyles()
    } else {
      return []
    }
  }

  __getInlineStyles() {
    const { assetPrefix, files } = this.context._documentProps
    if (!files || files.length === 0) return null

    return files
      .filter((file) => /\.css$/.test(file))
      .map((file) => (
        <style
          key={file}
          nonce={this.props.nonce}
          data-href={`${assetPrefix}/_next/${file}`}
          dangerouslySetInnerHTML={{
            __html: readFileSync(join(process.cwd(), '.next', file), 'utf-8'),
          }}
        />
      ))
  }
}

export default class CustomDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <InlineStylesHead />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
