import Author from '../../../models/author';
import Book from '../../../models/book';
import { parallel } from 'async';


export default (req, res, next) =>
  parallel({
    author: (callback) =>
      Author.findById(req.params.id).exec(callback),
    author_books: (callback) =>
      Book.find({ author: req.params.id }, 'title summary').exec(callback),
  }, (err, { author, author_books }) => {
      if (err) { return next(err); }

      if (author == null) {
          const err = new Error('Author not found');
          err.status = 404;
          return next(err);
      }

      return res.render('author/detail', {
        title: 'Author Detail',
        author: author,
        author_books: author_books
      });
  });
