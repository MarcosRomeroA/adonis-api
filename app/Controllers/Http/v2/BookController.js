'use strict'

const Book = use('App/Models/Book');

class BookController {

  async index ({ response }) 
  {
    let books = await Book.all();
    return response.json(books);
  }

  async store ({ request, response }) 
  {
    const bookInfo = request.only(['title', 'isbn', 'author']);
    const book = new Book;
    
    book.title = bookInfo.title;
    book.isbn = bookInfo.isbn;
    book.author = bookInfo.author;
    await book.save();

    return response.status(201).json(book);

  }

  async show ({ params, request, response, view }) 
  {
    const book = await Book.find(params.id);

    if (!book)
      return response.status(404).json({data: "Recurso no encontrado" });

    return response.json(book);
  }

  async update ({ params, request, response }) 
  {
    const bookInfo = request.only(['title', 'isbn', 'author']);
    const book = await Book.find(params.id);

    if(!book)
      return response.status(404).json({data: "No existe el registro"});

    book.title = bookInfo.title;
    book.isbn = bookInfo.isbn;
    book.author = bookInfo.author;
    await book.save();

    return response.status(201).json(book);
  }

  async destroy ({ params, request, response }) 
  {
    const book = await Book.find(params.id);

    if(!book)
      return response.status(404).json({data: "Recurso no encontrado"});
    
    await book.delete();

    return response.status(204).json(null);
  }

  async paginated ({ response, params})
  {
    const books = await Book.query()
      .orderBy('id', 'desc')
      .paginate(params.offset, 2);

    if(!books)
      return response.status(404).json({data: "Recurso no encontrado"});

    return response.status(200).json(books);
  }
}

module.exports = BookController
