import Book from '../../../models/book';
import BookInstance from '../../../models/bookinstance';
import { parallel } from 'async';

export default (req, res) =>
  parallel({
    book: (callback) =>
      Book.findById(req.params.id)
        .populate('author')
        .populate('genre')
        .exec(callback),
    book_instances: (callback) =>
      BookInstance.find({ 'book': req.params.id })
      .exec(callback),
  }, (err, { book, book_instances }) => {
      if (err) { return next(err); }
      if (book == null) {
          const err = new Error('Book not found');
          err.status = 404;
          return next(err);
      }

      return res.render('book/detail', {
        title: book.title,
        book: book,
        book_instances: book_instances
      });
  });
