// @flow

import React from 'react'
import { useForm } from 'react-hook-form'
import { navigate } from 'gatsby'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { AlgoliaPlacesField, PhoneNumberField } from './fields'
import { validationSchema } from './schema'

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

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="action-detail">
      <div>
        <Form.Group controlId="fullName">
          <Form.Label>Full name</Form.Label>
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
          <Form.Label>Email</Form.Label>
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
          <Form.Label>Street Address</Form.Label>
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
          <Form.Label>Phone number</Form.Label>
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
      </div>

      <Row className="mt-4">
        <Col>
          <div className="text-left">
            <Button
              variant="secondary"
              onClick={() => {
                navigate('/app/actions')
              }}
            >
              Go back
            </Button>
          </div>
        </Col>
        <Col>
          <div className="text-right">
            <Button variant="primary" type="submit">
              Save information
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
