'use strict'

class ProjectError extends Error {
  constructor(message) {
    super(message)
    this.message = message
    this.error = message
  }
}

module.exports.badRequest = (err) => {
  const error = new ProjectError('BAD_REQUEST')
  if (err) error.message = err
  error.code = 400
  return error
}

