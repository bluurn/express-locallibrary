import Book from '../../../models/book';
import BookInstance from '../../../models/bookinstance';
import { parallel } from 'async';

export default (req, res, next) =>
  parallel({
    book: (callback) => Book.findById(req.params.id).remove().exec(callback),
    bookInstance: (callback) => BookInstance.find({ book: req.params.id }).remove().exec(callback)
  }, (err, results) => {
    if(err) { return next(err); }
    return res.redirect('/catalog/books');
  });
