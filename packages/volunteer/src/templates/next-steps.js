import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { Layout, Hero, FAQ, Mailto } from '../components'
import { Container, Row, Col, Card } from 'react-bootstrap'

const mailtoHeaders = {
  subject: 'Next Steps for College For All'
}

export const NextStepsTemplate = ({ hero, content }) => (
  <Container>
    <Row className="mb-md-5">
      <Col>
        <Hero title={hero.title} />
      </Col>
    </Row>
    <Row>
      <Col>
        <Card>
          <Card.Body>
            <Card.Title>
              <h1>Get involved!</h1>
            </Card.Title>
            <Card.Text className="mb-4">
              Here are a few ideas to help you engage and involve others on your
              campus and beyond in the fight for the College for All agenda. If
              you have more questions please contact{' '}
              <Mailto email="happel@ucla.edu" headers={mailtoHeaders}>
                Hannah Appel
              </Mailto>{' '}
              or{' '}
              <Mailto email="andrew.ross@nyu.edu" headers={mailtoHeaders}>
                Andrew Ross
              </Mailto>
            </Card.Text>

            <Card.Title>
              <h4>First Steps - 5 Minutes or Less</h4>
            </Card.Title>
            <Card.Text>
              Contact your representative with{' '}
              <a
                href="https://y.dsausa.org/c4a/debt/reps/"
                target="_blank"
                rel="noopener noreferrer"
              >
                this easy form
              </a>
              . Identify yourself as a professor and clearly express your
              support for College for All.
            </Card.Text>

            <Card.Text>
              <a
                href="https://bit.ly/i-am-your-professor"
                target="_blank"
                rel="noopener noreferrer"
              >
                Order a T-Shirt!
              </a>{' '}
              The shirts read: “I am your professor. I think your student debt
              is unjust. Let’s talk.” Worn on campus and to class, they are a
              perfect way to get meaningful conversations started. 
            </Card.Text>

            <Card.Title className="mt-4">
              <h4>Next Steps - Get Organized!</h4>
            </Card.Title>
            <Card.Text>
              See our steps below to get started on building the movement on
              your campus and beyond.
            </Card.Text>

            <FAQ entries={content.faq} />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
)

NextStepsTemplate.propTypes = {
  hero: PropTypes.shape({
    title: PropTypes.string
  }),
  content: PropTypes.shape({
    faq: PropTypes.arrayOf(PropTypes.any)
  })
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout title="Why Faculty Support College For All · Next Steps">
      <NextStepsTemplate {...frontmatter} />
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
  query NextStepsTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "next-steps" } }) {
      frontmatter {
        hero {
          title
        }
        content {
          faq {
            title
            text
          }
        }
      }
    }
  }
`
