/* global Sentry */

import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import NumberFormat from 'react-number-format'
import AlgoliaPlaces from 'algolia-places-react'
import classNames from 'classnames'
import { Form } from 'react-bootstrap'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector'

export const AlgoliaPlacesField = ({
  name,
  register,
  unregister,
  setValue,
  defaultValue,
  isInvalid,
  ...props
}) => {
  useEffect(() => {
    register(name)
    return () => unregister(name)
  }, [name, register, unregister])

  const fieldName = name
  const cssClasses = classNames('form-control', { 'is-invalid': isInvalid })

  return (
    <AlgoliaPlaces
      className={cssClasses}
      placeholder="Start typing..."
      options={{
        countries: ['us'],
        type: 'address'
      }}
      defaultValue={defaultValue}
      onChange={({ suggestion }) => {
        const {
          administrative,
          city,
          country,
          countryCode,
          county,
          latlng,
          name,
          postcode,
          postcodes,
          suburb,
          type,
          value
        } = suggestion

        const addressObject = {
          administrative,
          city,
          country,
          countryCode,
          county,
          latlng,
          name,
          postcode,
          postcodes,
          suburb,
          type,
          value
        }

        setValue(fieldName, addressObject, true)
      }}
      onClear={() => setValue(name, {}, true)}
      onLimit={message => Sentry.captureMessage(message)}
      onError={message => Sentry.captureMessage(message)}
      {...props}
    />
  )
}

AlgoliaPlacesField.propTypes = {
  isInvalid: PropTypes.bool,
  defaultValue: PropTypes.string,
  name: PropTypes.string,
  register: PropTypes.func,
  setValue: PropTypes.func,
  unregister: PropTypes.func
}

export const PhoneNumberField = ({
  name,
  register,
  unregister,
  setValue,
  defaultValue,
  ...props
}) => {
  useEffect(() => {
    register(name)
    return () => unregister(name)
  }, [name, register, unregister])

  return (
    <NumberFormat
      type="tel"
      placeholder="(202) 401-3000"
      customInput={Form.Control}
      defaultValue={defaultValue}
      onValueChange={({ formattedValue, value }) => {
        setValue(name, formattedValue || value, true)
      }}
      format="(###) ###-####"
      mask="_"
      {...props}
    />
  )
}

PhoneNumberField.propTypes = {
  name: PropTypes.string,
  register: PropTypes.func,
  unregister: PropTypes.func,
  setValue: PropTypes.func,
  defaultValue: PropTypes.string
}

export const CountryDropdownField = ({
  name,
  register,
  unregister,
  setValue,
  defaultValue,
  isInvalid,
  ...props
}) => {
  const cssClasses = classNames('form-control', { 'is-invalid': isInvalid })
  const [country, setCountry] = useState(defaultValue)

  useEffect(() => {
    register(name)
    return () => unregister(name)
  }, [name, register, unregister])

  return (
    <CountryDropdown
      class={cssClasses}
      name={name}
      value={country}
      onChange={value => {
        setCountry(value)
        setValue(name, value, true)
      }}
      {...props}
    />
  )
}

CountryDropdownField.propTypes = {
  name: PropTypes.string,
  register: PropTypes.func,
  unregister: PropTypes.func,
  setValue: PropTypes.func,
  defaultValue: PropTypes.string,
  isInvalid: PropTypes.bool
}

export const RegionDropdownField = ({
  country,
  defaultValue,
  name,
  register,
  setValue,
  unregister,
  isInvalid,
  ...props
}) => {
  const cssClasses = classNames('form-control', { 'is-invalid': isInvalid })
  const [region, setRegion] = useState(defaultValue)

  useEffect(() => {
    register(name)
    return () => unregister(name)
  }, [name, register, unregister])

  return (
    <RegionDropdown
      class={cssClasses}
      name={name}
      country={country}
      value={region}
      onChange={value => {
        setRegion(value)
        setValue(name, value, true)
      }}
      {...props}
    />
  )
}

RegionDropdownField.propTypes = {
  country: PropTypes.string,
  defaultValue: PropTypes.string,
  name: PropTypes.string,
  register: PropTypes.func,
  setValue: PropTypes.func,
  unregister: PropTypes.func,
  isInvalid: PropTypes.bool
}
