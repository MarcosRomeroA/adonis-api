'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')

class ExceptionHandler extends BaseExceptionHandler {

  async handle (error, { request, response }) {
    response.status(error.status).json({msg:error.message})

    super.handle(...arguments)
  }

  async report (error, { request }) {
  }
}

module.exports = ExceptionHandler
