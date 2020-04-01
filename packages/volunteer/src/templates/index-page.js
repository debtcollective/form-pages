import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import _ from 'lodash'

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
        Submit this form if you’d like to get involved in the Debt Collective.
        If you are looking to start a local group/collective, please email{' '}
        <Mailto email="winter@debtcollective.org">
          winter@debtcollective.org
        </Mailto>{' '}
        instead.
      </p>
      <p className="text-center mb-0 mt-2">
        We’ll review your submission and get back to you soon.{' '}
        <i>We will keep your information as secure and private as possible.</i>
      </p>
      <Content>
        <Form />
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
