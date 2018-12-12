import React from 'react'
import PropTypes from 'prop-types'

const Exception = ({ type }) => (
  <div>{type}</div>
)

Exception.propTypes = {
  type: PropTypes.oneOf([403, 404, 500]).isRequired,
}

export default Exception
