'use strict'

const User = use('App/Models/User');

class AuthController {

  async login ({ request, response, auth }) 
  {
    const { email, password } = request.all();
    const user = await auth.attempt(email, password);
    return response.json(user);

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

  async profile({ response, auth })
  {
    const user = await auth.getUser();
    return response.json(user);
  }

  async revokeUserToken({ response, auth })
  {
    const user = await auth.getUser();
    await user.tokens().update({is_revoked: true});
    return response.status(204).json(null);
  }
}

module.exports = AuthController
