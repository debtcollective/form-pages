// @flow
/* global Sentry */

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { Row, Col, Button, Form } from 'react-bootstrap'
import Recaptcha from 'react-google-recaptcha'
import { PhoneNumberField } from './fields'
import { validationSchema, skills } from './schema'

const RECAPTCHA_KEY =
  process.env.SITE_RECAPTCHA_KEY || process.env.GATSBY_SITE_RECAPTCHA_KEY

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

const VolunteerForm = ({ name }) => {
  const {
    register,
    handleSubmit,
    setValue,
    unregister,
    errors,
    reset
  } = useForm({
    validationSchema: validationSchema
  })

  const [submitted, setSubmitted] = useState(false)
  const [recaptchaToken, setRecaptchaToken] = useState(null)

  const onSubmit = data => {
    // Don't submit unless it verifies the captcha
    if (!recaptchaToken) {
      return false
    }

    fetch('/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: encode({
        'form-name': name,
        'g-recaptcha-response': recaptchaToken,
        ...data
      })
    })
      .then(() => {
        setSubmitted(true)
        reset()
        setValue('phoneNumber', null)
      })
      .catch(e => Sentry.captureException(e))
  }

  const required = <span style={{ color: 'red' }}>*</span>

  return (
    <form
      name={name}
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="__bf"
      data-netlify-recaptcha="true"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <Form.Group controlId="fullName">
          <Form.Label>Full name{required}</Form.Label>
          <Form.Control
            type="text"
            name="fullName"
            placeholder="Betsy DeVos"
            ref={register}
            isInvalid={!!errors.fullName}
          />
          <Form.Control.Feedback type="invalid">
            {errors.fullName && errors.fullName.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>City{required}</Form.Label>
          <Form.Control
            type="text"
            name="city"
            placeholder="Washington"
            ref={register}
            isInvalid={!!errors.city}
          />
          <Form.Control.Feedback type="invalid">
            {errors.city && errors.city.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="state">
          <Form.Label>State{required}</Form.Label>
          <Form.Control
            type="text"
            name="state"
            placeholder="D.C"
            ref={register}
            isInvalid={!!errors.state}
          />
          <Form.Control.Feedback type="invalid">
            {errors.state && errors.state.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="zip">
          <Form.Label>Zip{required}</Form.Label>
          <Form.Control
            type="text"
            name="zip"
            placeholder="20202"
            ref={register}
            isInvalid={!!errors.zip}
          />
          {!!errors.city && <div className="is-invalid" />}
          <Form.Control.Feedback type="invalid">
            {errors.zip && errors.zip.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="country">
          <Form.Label>Country{required}</Form.Label>
          <Form.Control
            type="text"
            name="country"
            placeholder="United States"
            ref={register}
            isInvalid={!!errors.country}
          />
          {!!errors.city && <div className="is-invalid" />}
          <Form.Control.Feedback type="invalid">
            {errors.country && errors.country.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email{required}</Form.Label>
          <Form.Control
            type="text"
            placeholder="betsy.devos@ed.gov"
            name="email"
            ref={register}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email && errors.email.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="phoneNumber">
          <Form.Label>Phone number{required}</Form.Label>
          <PhoneNumberField
            name="phoneNumber"
            register={register}
            unregister={unregister}
            setValue={setValue}
            isInvalid={!!errors.phoneNumber}
          />
          <Form.Control.Feedback type="invalid">
            {errors.phoneNumber && errors.phoneNumber.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="twitter">
          <Form.Label>Twitter</Form.Label>
          <Form.Control
            type="text"
            placeholder="@0debtzone"
            name="twitter"
            ref={register}
            isInvalid={!!errors.twitter}
          />
          <Form.Control.Feedback type="invalid">
            {errors.twitter && errors.twitter.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="skills">
          <Form.Label>I have background/skills with:</Form.Label>
          {skills.map(skill => (
            <Form.Check
              type="checkbox"
              key={skill}
              id={`skills-${skill}`}
              name="skills"
              label={skill}
              ref={register}
              isInvalid={!!errors.skills}
              value={skill}
            ></Form.Check>
          ))}
          <Form.Control.Feedback type="invalid">
            {errors.skills && errors.skills.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="otherSkills">
          <Form.Label>
            If you have other skills you’d like to share, please specify:
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="ex. Activist"
            name="otherSkills"
            ref={register}
            isInvalid={!!errors.otherSkills}
          />
          <Form.Control.Feedback type="invalid">
            {errors.otherSkills && errors.otherSkills.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="username">
          <Form.Label>
            Have you joined the Debt Collective platform? If so, share your
            username below:
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="ex. debtcollective"
            name="username"
            ref={register}
            isInvalid={!!errors.username}
          />
          <Form.Control.Feedback type="invalid">
            {errors.username && errors.username.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group
          controlId="recaptcha"
          className="text-center d-flex flex-column align-items-center"
        >
          {/* https://docs.netlify.com/forms/spam-filters/#custom-recaptcha-2 */}
          <Recaptcha
            className="field"
            sitekey={RECAPTCHA_KEY}
            onChange={value => setRecaptchaToken(value)}
          />
        </Form.Group>
      </div>

      <Row className="mt-4">
        <Col>
          <div className="text-center">
            <Button variant="primary" type="submit" disabled={submitted}>
              {submitted ? 'Thanks! We’ll be in touch soon :)' : 'Submit'}
            </Button>
          </div>
        </Col>
      </Row>
    </form>
  )
}

VolunteerForm.propTypes = {
  name: PropTypes.string.isRequired
}

VolunteerForm.defaultValues = {}

export default VolunteerForm
