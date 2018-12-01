import Author from '../../../models/author';
import Genre from '../../../models/author';
import { parallel } from 'async';

export default (req, res, next) =>
  parallel({
    authors: (callback) => Author.find(callback),
    genres: (callback) => Genre.find(callback),
  }, (err, { authors, genres }) => {
      if (err) { return next(err); }

      return res.render('book/form', {
        title: 'Create Book',
        authors: authors,
        genres: genres
      });
  });
