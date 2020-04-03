import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import {
  Hero,
  Layout,
  Content,
  Form,
  ReadProgress,
  Mailto
} from '../components'

export const IndexPageTemplate = ({ hero }) => {
  return (
    <>
      <Hero title={hero.title} />
      <p className="text-center mb-0 mt-2">
        Submit this form if you’d like to get involved in The Debt Collective.
        Someone will be in touch with you soon!
      </p>
      <p className="text-center mb-0">
        If you are looking to start a local group/collective, please email{' '}
        <Mailto email="winter@debtcollective.org">
          winter@debtcollective.org
        </Mailto>
        .
      </p>
      <p className="text-center mb-0 mt-2">
        <i>We will keep your information as secure and private as possible.</i>
      </p>
      <Content>
        <Form name="volunteers" />
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
          button
        }
      }
    }
  }
`
