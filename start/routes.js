'use strict'
    
const Route = use('Route')

Route.on('/').render('welcome')

Route.group(()=>{
    Route.post('login', 'AuthController.login');
    Route.post('register', 'AuthController.register').validator('StoreUser');
}).prefix('api/v1');
