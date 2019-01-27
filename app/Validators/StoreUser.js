'use strict'

class StoreUser {
  get rules () {
    return {
      username: 'required',
      email: 'required|unique:users,email',
      password: 'required'
    }
  }

  get messages(){
    return {
      'username.required': 'El campo usuario es requerido',
      'email.required': 'El campo email es requerido',
      'email.unique': 'El email ya existe!',
      'password.required': 'El campo password es requerido'
    }
  }
}

module.exports = StoreUser
