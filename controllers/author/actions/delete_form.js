import Author from '../../../models/author';
import Book from '../../../models/book';
import { parallel } from 'async';

export default (req, res, next) =>
  parallel({
    author: (callback) =>
      Author.findById(req.params.id).exec(callback),
    author_books: (callback) =>
      Book.find({ 'author': req.params.id }).exec(callback),
  }, (err, { author, author_books }) => {
      if (err) { return next(err); }
      if (author == null) {
        return res.redirect('/catalog/authors');
      }

      return res.render('author/delete', {
        title: 'Delete Author',
        author: author,
        author_books: author_books
      });
  });
