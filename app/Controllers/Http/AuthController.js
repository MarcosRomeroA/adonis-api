'use strict'

const User = use('App/Models/User');

class AuthController {

  async login ({ request, response, view }) 
  {

  }

  async register ({ request, response, auth }) 
  {
    const user = new User;

    user.username = request.input('username');
    user.email = request.input('email');
    user.password = request.input('password');

    await user.save();
    await auth.generate(user);
    return response.json(user);
  }

}

module.exports = AuthController
