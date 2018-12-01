import Genre from '../../../models/genre';
import Book from '../../../models/book';

import { parallel } from 'async';

export default (req, res, next) =>
  parallel({
    genre: (callback) =>
      Genre.findById(req.params.id).exec(callback),
    genre_books: (callback) =>
      Book.find({ genre: req.params.id }).exec(callback)
  }, (err, { genre, genre_books }) => {
    if (err) { return next(err); }

    if (genre == null) {
        const err = new Error('Genre not found');
        err.status = 404;
        return next(err);
    }

    return res.render('genre/detail', {
      title: 'Genre Detail',
      genre: genre,
      genre_books: genre_books
    });
  });
