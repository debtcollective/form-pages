import React from 'react'
import PropTypes from 'prop-types'
import { IndexPageTemplate } from '../../templates/index-page'

const IndexPagePreview = ({ entry }) => {
  // NOTE: in this case data represents the content of `src/pages/index.md`
  const data = entry.getIn(['data']).toJS()
  const { hero = {} } = data

  if (data) {
    return <IndexPageTemplate hero={hero} />
  } else {
    return <div>Loading...</div>
  }
}

IndexPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  }),
  getAsset: PropTypes.func
}

export default IndexPagePreview
