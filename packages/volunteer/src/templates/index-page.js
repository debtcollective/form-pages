import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { Hero, Layout, Content, Form, ReadProgress } from '../components'

export const IndexPageTemplate = ({ hero, modal }) => {
  return (
    <>
      <Hero title={hero.title} />
      <div dangerouslySetInnerHTML={{ __html: hero.subtitle }} />
      <Content>
        <Form name="volunteers" modal={modal} />
      </Content>
      <ReadProgress />
    </>
  )
}

IndexPageTemplate.propTypes = {
  hero: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string
  }),
  modal: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    actionButton: PropTypes.string
  })
}

const IndexPage = ({ data }) => {
  const {
    markdownRemark: { frontmatter }
  } = data

  return (
    <Layout>
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
          subtitle
        }
        modal {
          title
          content
          actionButton
          redirectUrl
        }
      }
    }
  }
`
