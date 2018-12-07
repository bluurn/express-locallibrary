import Book from '../../../models/book';
import BookInstance from '../../../models/bookinstance';

import { parallel } from 'async';

export default (req, res, next) =>
  parallel({
    book_list: (callback) => Book.find({},'title').exec(callback),
    book_instance: (callback) => BookInstance.findById(req.params.id).exec(callback)
  }, (err, { book_list, book_instance }) => {
    if(err) { return next(err); }

    return res.render('book_instance/form', {
      title: 'Create Book Instance',
      book_list : book_list,
      selected_book : book_instance.book._id ,
      errors: [],
      bookinstance: book_instance
    });
  });
