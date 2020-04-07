import React from 'react'
import PropTypes from 'prop-types'

const toSearchString = (searchParams = {}) => {
  return Object.keys(searchParams)
    .map(key => `${key}=${encodeURIComponent(searchParams[key])}`)
    .join('&')
}

const createMailtoLink = (email, headers) => {
  let link = `mailto:${email}`
  if (headers) {
    link += `?${toSearchString(headers)}`
  }
  return link
}

const Mailto = ({ children, email, headers, ...others }) => {
  const onClick = e => {
    e.preventDefault()

    window.location.href = createMailtoLink(email, headers)
  }

  return (
    <a onClick={onClick} href={`mailto:obfuscated`} {...others}>
      {children}
    </a>
  )
}

Mailto.propTypes = {
  children: PropTypes.node.isRequired,
  email: PropTypes.string.isRequired,
  headers: PropTypes.object
}

Mailto.defaultProps = {
  headers: {}
}

export default Mailto
