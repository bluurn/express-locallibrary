import Book from '../../../models/book';
import Genre from '../../../models/genre';

import { parallel } from 'async';

export default (req, res, next) =>
  parallel({
    genre: (callback) => Genre.findById(req.body.authorid).exec(callback),
    genre_books: (callback) => Book.find({ genre: req.body.genreid }).exec(callback)
  },
  (err, { genre, genre_books }) => {
    if (err) { return next(err); }

    if (genre_books.length) {
      return res.render('genre/delete', {
        title: 'Delete Genre',
        genre: genre,
        genre_books: genre_books
      });
    } else {
      Genre.findByIdAndRemove(req.body.genreid, (err) => {
        if (err) { return next(err); }
        return res.redirect('/catalog/genres');
      });
    }
  });
