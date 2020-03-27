import React from "react";
import PropTypes from "prop-types";
import { Card, Container, Row, Col } from "react-bootstrap";
import styles from "./styles.module.scss";

const Letter = ({ text }) => (
  <section id="letter" className={`mt-4 ${styles.letterSection}`}>
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <div
                className={styles.letter}
                dangerouslySetInnerHTML={{ __html: text }}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </section>
);

Letter.propTypes = {
  text: PropTypes.string,
};

export default Letter;
