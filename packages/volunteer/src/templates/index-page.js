import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import _ from 'lodash'

import { Hero, Layout, Content, ReadProgress } from '../components'

export const IndexPageTemplate = ({ hero }) => {
  return (
    <>
      <Hero title={hero.title} />
      <Content>
        <p>test</p>
      </Content>
      <ReadProgress />
    </>
  )
}

IndexPageTemplate.propTypes = {
  hero: PropTypes.shape({
    title: PropTypes.string,
    button: PropTypes.string
  }),
  letter: PropTypes.shape({
    text: PropTypes.string
  })
}

const IndexPage = ({ data }) => {
  const {
    markdownRemark: { frontmatter }
  } = data

  return (
    <Layout title="Why Faculty Support College For All · Sign the letter">
      <IndexPageTemplate {...frontmatter} />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        hero {
          title
          button
        }
      }
    }
  }
`
