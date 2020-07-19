import React from 'react'

export type MetaTagsProps = {
  /** Reference to helmet or next/head */
  using: any
  /** Description */
  description?: string
  /* Language in the <html> tag */
  lang?: 'en'
  /** Title to appear in social cards, defaults to the value of `title` */
  ogTitle?: string
  ogDescription?: string
  /** (eg `'article'`) */
  ogType?: string
  /** Title to appear in <title>, defaults to the value of `title` */
  seoTitle?: string
  seoDescription?: string
  /** Default title */
  title?: string
  keywords?: string[]
  /** Canonical URL */
  url?: string
  baseUrl?: string
  path?: string
  /** Additional tags */
  children?: React.ReactNode
}

/**
 * Meta tags.
 *
 * @example
 *    <MetaTags
 *      title='My page'
 *      description='This is my page'
 *      keywords={['my', 'page']}
 *      url='https://example.com/page'
 *    />
 */

function MetaTags(meta: MetaTagsProps) {
  const seoTitle = meta.seoTitle || meta.title
  const ogTitle = meta.ogTitle || meta.title
  const ogDescription = meta.ogDescription || meta.description
  const seoDescription = meta.seoDescription || meta.description
  const Helmet = meta.using
  const url = meta.url
    ? meta.url
    : meta.baseUrl && meta.path
    ? `${meta.baseUrl.replace(/\/$/, '')}${meta.path}`
    : null

  return (
    <Helmet>
      {meta.lang ? <html lang={meta.lang} /> : null}
      {meta.ogType ? <meta property='og:type' content={meta.ogType} /> : null}

      {seoTitle ? <title>{seoTitle}</title> : null}
      {ogTitle ? <meta property='og:title' content={ogTitle} /> : null}
      {ogTitle ? <meta name='twitter:title' content={ogTitle} /> : null}

      {meta.keywords ? (
        <meta name='keywords' content={meta.keywords.join(',')} />
      ) : null}

      {seoDescription ? (
        <meta name='description' content={seoDescription} />
      ) : null}
      {ogDescription ? (
        <meta property='og:description' content={ogDescription} />
      ) : null}
      {ogDescription ? (
        <meta name='twitter:description' content={ogDescription} />
      ) : null}

      {url ? <link rel='canonical' href={url} /> : null}
      {url ? <meta property='og:url' content={url} /> : null}
      {meta.children ? meta.children : null}
    </Helmet>
  )
}

export default MetaTags
