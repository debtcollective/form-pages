import React from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import Footer from './Footer'
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
        <div className="container">{children}</div>
      </div>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node,
  ...SEO.PropTypes,
}

export default Layout
