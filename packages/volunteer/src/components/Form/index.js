// @flow

import React from 'react'
import { useForm } from 'react-hook-form'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { AlgoliaPlacesField, PhoneNumberField } from './fields'
import { validationSchema, skills } from './schema'

const VolunteerForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    unregister,
    errors
  } = useForm({
    validationSchema: validationSchema
  })

  /**
   * Initial Values
   * used for controlled components to have a defaultValue
   * and for conditional rendering of components
   */
  const phoneNumber = watch('phoneNumber')
  const addressValue = watch('address')
  const address = addressValue && addressValue.value

  const onSubmit = data => {
    console.log(data)
  }

  console.log(errors)

  const required = <span style={{ color: 'red' }}>*</span>

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
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

        <Form.Group controlId="streetAddress">
          <Form.Label>Address{required}</Form.Label>
          <AlgoliaPlacesField
            name="address"
            register={register}
            unregister={unregister}
            setValue={setValue}
            isInvalid={!!errors.address}
            defaultValue={address}
          />
          {!!errors.address && <div className="is-invalid" />}
          <Form.Control.Feedback type="invalid">
            {!!errors.address && 'Select a valid address'}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="phoneNumber">
          <Form.Label>Phone number{required}</Form.Label>
          <PhoneNumberField
            name="phoneNumber"
            register={register}
            unregister={unregister}
            setValue={setValue}
            defaultValue={phoneNumber}
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
      </div>

      <Row className="mt-4">
        <Col>
          <div className="text-center">
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  )
}

VolunteerForm.propTypes = {}

VolunteerForm.defaultValues = {}

export default VolunteerForm
