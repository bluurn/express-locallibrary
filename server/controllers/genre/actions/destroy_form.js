import Book from '../../../models/book';
import Genre from '../../../models/genre';

import { parallel } from 'async';

export default (req, res, next) =>
  parallel({
    genre: (callback) => Genre.findById(req.params.id).exec(callback),
    genre_books: (callback) => Book.find({ genre: req.params.id }).exec(callback)
  },
  (err, { genre, genre_books }) => {
    if (err) { return next(err); }

    return res.render('genre/delete', {
      title: 'Delete Genre',
      genre: genre,
      genre_books: genre_books
    });
  });
