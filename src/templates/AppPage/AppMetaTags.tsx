import MetaTags, { MetaTagsProps } from '../../meta-helper/MetaTags'
import Helmet from 'next/head'

const AppMetaTags = (props: Partial<MetaTagsProps>) => {
  return <MetaTags using={Helmet} baseUrl='https://typecat.now.sh' {...props} />
}

export default AppMetaTags
