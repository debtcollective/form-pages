import React from 'react'
import PropTypes from 'prop-types'
import { Card, Row, Col } from 'react-bootstrap'
import styles from './styles.module.scss'

const Content = ({ children }) => (
  <section id="content" className={`mt-4 ${styles.letterSection}`}>
    <Row>
      <Col>
        <Card>
          <Card.Body>{children}</Card.Body>
        </Card>
      </Col>
    </Row>
  </section>
)

Content.propTypes = {
  children: PropTypes.node,
}

export default Content
