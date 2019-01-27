'use strict'

const Model = use('Model')

class Book extends Model 
{
    // change table name
    static get table()
    {
        return 'books';
    }

    // get column
    static get primaryKey()
    {
        return 'id';
    }

    // returnable data
    static get visible(){
        return ['title', 'isbn', 'author', 'created_at'];
    }

    // array de campos
    static get dates()
    {
        return super.dates.concat(['created_at', 'updated_at']);
    }

    // date format
    static castDates(field, value)
    {
        return value.format('DD-MM-YYYY');
    }
}

module.exports = Book
