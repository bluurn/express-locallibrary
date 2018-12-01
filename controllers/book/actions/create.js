import Book from '../../../models/book';

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

const createBook = (req, res, next) => {
  const errors = validationResult(req);

  const book = new Book({
      title: req.body.title,
      author: req.body.author,
      summary: req.body.summary,
      isbn: req.body.isbn,
      genre: req.body.genre
  });

  if (!errors.isEmpty()) {
    parallel({
      authors: (callback) => Author.find(callback),
      genres: (callback) => Genre.find(callback),
    }, (err, { authors, genres }) => {
      if (err) { return next(err); }

      for (let i = 0; i < genres.length; i++) {
        if (book.genre.indexOf(genres[i]._id) > -1) {
          genres[i].checked='true';
        }
      }

      return res.render('book/form', {
        title: 'Create Book',
        authors: authors,
        genres: genres,
        book: book,
        errors: errors.array()
      });
    });
  } else {
    book.save((err) => {
      if (err) { return next(err); }
      return res.redirect(book.url);
    });
  }
};

const pipeline = [
  convertGenresToArray,

  body('title', 'Title must not be empty.').isLength({ min: 1 }).trim(),
  body('author', 'Author must not be empty.').isLength({ min: 1 }).trim(),
  body('summary', 'Summary must not be empty.').isLength({ min: 1 }).trim(),
  body('isbn', 'ISBN must not be empty').isLength({ min: 1 }).trim(),

  sanitizeBody('*').trim().escape(),

  createBook
];

export default pipeline;
