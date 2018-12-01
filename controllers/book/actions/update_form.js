import Book from '../../../models/book';
import Author from '../../../models/author';
import Genre from '../../../models/genre';
import { parallel } from 'async';

export default (req, res, next) =>
  parallel({
    book: (callback) =>
      Book.findById(req.params.id)
        .populate('author')
        .populate('genre')
        .exec(callback),
    authors: (callback) =>
      Author.find(callback),
    genres: (callback) =>
      Genre.find(callback)
  }, (err, { authors, book, genres }) => {
    if (err) { return next(err); }

    if (book == null) {
      const err = new Error('Book not found');
      err.status = 404;
      return next(err);
    }

    for (var all_g_iter = 0; all_g_iter < genres.length; all_g_iter++) {
      for (var book_g_iter = 0; book_g_iter < book.genre.length; book_g_iter++) {
        if (genres[all_g_iter]._id.toString()==book.genre[book_g_iter]._id.toString()) {
          genres[all_g_iter].checked='true';
        }
      }
    }

    return res.render('book/form', {
      title: 'Update Book',
      authors: authors,
      genres: genres,
      book: book
    });
  });
