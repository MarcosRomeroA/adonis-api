'use strict'
    
const Route = use('Route')

Route.on('/').render('welcome')

Route.group(()=>{
    Route.post('login', 'AuthController.login');
    Route.post('register', 'AuthController.register').validator('StoreUser');

    Route.get('profile', 'AuthController.profile').middleware(['auth:api']);

    Route.post('revokeUserToken', 'AuthController.revokeUserToken').middleware(['auth:api']);

    Route.resource('books', 'BookController')
    .middleware(['auth:api'])
    .validator(new Map([
        [['books.store'], ['StoreBook']],
        [['books.update'], ['UpdateBook']],
    ]))
    
}).prefix('api/v1');

Route.group(()=>{
    Route.resource('books', 'v2/BookController').middleware(['auth:api'])
    .validator(new Map([
        [['books.store'], ['StoreBook']],
        [['books.update'], ['UpdateBook']],
    ]))
    
    Route.get('books/paginated/:offset', 'v2/BookController.paginated').middleware(['auth:api']);
}).prefix('api/v2');
 