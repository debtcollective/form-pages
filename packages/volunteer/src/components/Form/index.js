// @flow
/* global Sentry */

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { Button, Form, InputGroup, Modal } from 'react-bootstrap'
import Recaptcha from 'react-google-recaptcha'
import { CountryDropdownField, RegionDropdownField } from './fields'
import { validationSchema, skills } from './schema'
import _ from 'lodash'
import './styles.scss'

const RECAPTCHA_KEY =
  process.env.SITE_RECAPTCHA_KEY || process.env.GATSBY_SITE_RECAPTCHA_KEY

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

const AfterSubmitModal = ({ show, onClose, onPrimaryClick, copy }) => {
  return (
    <Modal show={show}>
      <Modal.Header closeButton>
        <Modal.Title>{copy.title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{copy.content}</Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => onClose()}>
          Close
        </Button>
        <Button variant="primary" onClick={() => onPrimaryClick()}>
          {copy.actionButton}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

AfterSubmitModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  onPrimaryClick: PropTypes.func,
  copy: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    actionButton: PropTypes.string
  })
}

AfterSubmitModal.defaultProps = {
  onClose: _.noop,
  onPrimaryClick: _.noop,
  copy: { title: '', content: '', actionButton: 'Ok' }
}

const VolunteerForm = ({ name, modal }) => {
  const {
    errors,
    handleSubmit,
    register,
    reset,
    setValue,
    unregister,
    watch
  } = useForm({
    validationSchema: validationSchema
  })
  const [submitted, setSubmitted] = useState(false)
  const [show, setShow] = useState(false)
  const [recaptchaToken, setRecaptchaToken] = useState(null)

  const handleModalClose = () => {
    // reset form and custom fields
    reset()
    setValue('phoneNumber', null)
    setValue('country', null)

    // hide modal
    setShow(false)
  }

  const handleModalShow = () => setShow(true)

  // Watching country to pass it to state dropdown
  const country = watch('country')

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
        handleModalShow()
      })
      .catch(e => Sentry.captureException(e))
  }

  const afterSubmitRedirect = () => {
    window.location = process.env.AFTER_SUBMIT_URL
  }

  const required = <span style={{ color: 'red' }}>*</span>

  return (
    <>
      <AfterSubmitModal
        show={show}
        onClose={handleModalClose}
        onPrimaryClick={afterSubmitRedirect}
        copy={modal}
      />
      <form
        name={name}
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="__bf"
        data-netlify-recaptcha="true"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-section">
          <h3 className="mb-3">Personal information</h3>
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

          <Form.Group controlId="country">
            <Form.Label>Country{required}</Form.Label>
            <CountryDropdownField
              name="country"
              register={register}
              unregister={unregister}
              setValue={setValue}
              priorityOptions={['US']}
              isInvalid={!!errors.fullName}
            />
            {!!errors.country && <div className="is-invalid" />}
            <Form.Control.Feedback type="invalid">
              {errors.country && errors.country.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="state">
            <Form.Label>State{required}</Form.Label>
            <RegionDropdownField
              name="state"
              country={country}
              register={register}
              unregister={unregister}
              setValue={setValue}
              isInvalid={!!errors.fullName}
            />
            {!!errors.state && <div className="is-invalid" />}
            <Form.Control.Feedback type="invalid">
              {errors.state && errors.state.message}
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
            <Form.Control
              type="tel"
              name="phoneNumber"
              ref={register}
              isInvalid={!!errors.phoneNumber}
            />
            <Form.Control.Feedback type="invalid">
              {errors.phoneNumber && errors.phoneNumber.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="username">
            <Form.Label>
              Have you joined The Debt Collective platform? If so, share your
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
        </div>

        <div className="form-section mt-4">
          <h3>Skills</h3>
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
        </div>

        <div className="form-section mt-4">
          <h3 className="mb-3">Social networks</h3>
          <Form.Group controlId="twitter">
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">
                  twitter.com/
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="text"
                placeholder="0debtzone"
                name="twitter"
                ref={register}
                isInvalid={!!errors.twitter}
              />
            </InputGroup>
            <Form.Control.Feedback type="invalid">
              {errors.twitter && errors.twitter.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="facebook">
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">
                  facebook.com/
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="text"
                placeholder="DebtCollective"
                name="facebook"
                ref={register}
                isInvalid={!!errors.facebook}
              />
            </InputGroup>
            <Form.Control.Feedback type="invalid">
              {errors.facebook && errors.facebook.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="instagram">
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">
                  instagram.com/
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="text"
                placeholder="DebtCollective"
                name="instagram"
                ref={register}
                isInvalid={!!errors.instagram}
              />
            </InputGroup>
            <Form.Control.Feedback type="invalid">
              {errors.instagram && errors.instagram.message}
            </Form.Control.Feedback>
          </Form.Group>
        </div>

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

        <div className="text-center">
          <Button variant="primary" type="submit" disabled={submitted}>
            Submit
          </Button>
        </div>
      </form>
    </>
  )
}

VolunteerForm.propTypes = {
  name: PropTypes.string.isRequired,
  modal: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    actionButton: PropTypes.string
  })
}

VolunteerForm.defaultValues = {}

export default VolunteerForm
