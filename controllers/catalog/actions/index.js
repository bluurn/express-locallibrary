import Author from '../../../models/author';
import Book from '../../../models/book';
import BookInstance from '../../../models/bookinstance';
import Genre from '../../../models/genre';

import { parallel } from 'async';

export default (req, res, next) =>
  parallel({
    author_count: (callback) =>
      Author.countDocuments({}, callback),
    book_count: (callback) =>
      Book.countDocuments({}, callback),
    book_instance_count: (callback) =>
      BookInstance.countDocuments({}, callback),
    book_instance_available_count: (callback) =>
      BookInstance.countDocuments({ status: 'Available' }, callback),
    genre_count: (callback) =>
      Genre.countDocuments({}, callback)
  }, (err, results) => {
      if (err) { return next(err); }

      return res.render('index', {
        title: 'Local Library Home',
        error: err,
        data: results
      });
  });
