import React from 'react'
import PropTypes from 'prop-types'
import { Card, Container, Row, Col } from 'react-bootstrap'
import styles from './styles.module.scss'

const Content = ({ children }) => (
  <section id="content" className={`mt-4 ${styles.letterSection}`}>
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Body>{children}</Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </section>
)

Content.propTypes = {
  children: PropTypes.node
}

export default Content
