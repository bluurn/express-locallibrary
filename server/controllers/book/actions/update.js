import Author from '../../../models/author';
import Book from '../../../models/book';
import Genre from '../../../models/genre';

import { body, validationResult } from 'express-validator/check';
import { sanitizeBody } from 'express-validator/filter';
import { parallel } from 'async';

const convertGenresToArray = (req, res, next) => {
  if(!(req.body.genre instanceof Array)) {
    if(typeof req.body.genre === 'undefined') {
      req.body.genre = [];
    } else {
      req.body.genre = new Array(req.body.genre);
    }
  }

  return next();
};

const updateBook = (req, res, next) => {
  const errors = validationResult(req);
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    summary: req.body.summary,
    isbn: req.body.isbn,
    genre: (typeof req.body.genre==='undefined') ? [] : req.body.genre,
    _id: req.params.id
  });

  if (!errors.isEmpty()) {
    parallel({
      authors: (callback) => Author.find(callback),
      genres: (callback) => Genre.find(callback)
    }, (err, results) => {
      if (err) { return next(err); }

      // Mark our selected genres as checked.
      for (let i = 0; i < results.genres.length; i++) {
        if (book.genre.indexOf(results.genres[i]._id) > -1) {
          results.genres[i].checked='true';
        }
      }

      return res.render('book/form', {
        title: 'Update Book',
        authors: results.authors,
        genres: results.genres,
        book: book,
        errors: errors.array()
      });
    });
  } else {
    Book.findByIdAndUpdate(req.params.id, book, {}, (err, book) => {
      if (err) { return next(err); }

      return res.redirect(book.url);
    });
  }
}

const pipeline = [
  convertGenresToArray,

  // Validate fields.
  body('title', 'Title must not be empty.').isLength({ min: 1 }).trim(),
  body('author', 'Author must not be empty.').isLength({ min: 1 }).trim(),
  body('summary', 'Summary must not be empty.').isLength({ min: 1 }).trim(),
  body('isbn', 'ISBN must not be empty').isLength({ min: 1 }).trim(),

  // Sanitize fields.
  sanitizeBody('title').trim().escape(),
  sanitizeBody('author').trim().escape(),
  sanitizeBody('summary').trim().escape(),
  sanitizeBody('isbn').trim().escape(),
  sanitizeBody('genre.*').trim().escape(),

  updateBook
];

export default pipeline;
