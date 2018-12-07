import Author from '../../../models/author';
import Book from '../../../models/book';
import { parallel } from 'async';

export default (req, res, next) =>
  parallel({
    author: (callback) =>
      Author.findById(req.body.authorid).exec(callback),
    author_books: (callback) =>
      Book.find({ author: req.body.authorid }).exec(callback),
  }, (err, { author, author_books}) => {
      if (err) { return next(err); }
      if (author_books.length > 0) {
        return res.render('author/delete', {
          title: 'Delete Author',
          author: author,
          author_books: authors_books
        });
      } else {
        return Author.findByIdAndRemove(req.body.authorid, (err) => {
          if (err) { return next(err); }
          return res.redirect('/catalog/authors')
        });
      }
  });
