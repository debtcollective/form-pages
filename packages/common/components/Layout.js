import React from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import SEO from './SEO'

import '../styles/main.scss'

const Layout = ({
  title,
  description,
  lang,
  url,
  image,
  twitterUsername,
  meta,
  children,
}) => {
  return (
    <>
      <SEO
        title={title}
        description={description}
        lang={lang}
        url={url}
        image={image}
        twitterUsername={twitterUsername}
        meta={meta}
      />
      <Header />
      <div id="main" className="main">
        <main className="container">{children}</main>
      </div>
      <dc-footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node,
  ...SEO.PropTypes,
}

export default Layout
