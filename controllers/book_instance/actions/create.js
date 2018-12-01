import Book from '../../../models/book';
import BookInstance from '../../../models/bookinstance';

import { body,validationResult } from 'express-validator/check';
import { sanitizeBody } from 'express-validator/filter';

const createBookInstance = (req, res, next) => {
  const errors = validationResult(req);

  const bookinstance = new BookInstance({
    book: req.body.book,
    imprint: req.body.imprint,
    status: req.body.status,
    due_back: req.body.due_back
  });

  if (!errors.isEmpty()) {
    Book.find({}, 'title').exec((err, books) => {
      if (err) { return next(err); }

      return res.render('book_instance/form', {
        title: 'Create BookInstance',
        book_list : books,
        selected_book : bookinstance.book._id ,
        errors: errors.array(),
        bookinstance: bookinstance
      });
    });
  } else {
    bookinstance.save((err) => {
      if (err) { return next(err); }
      return res.redirect(bookinstance.url);
    });
  }
};

const pipeline = [
  body('book', 'Book must be specified').isLength({ min: 1 }).trim(),
  body('imprint', 'Imprint must be specified').isLength({ min: 1 }).trim(),
  body('due_back', 'Invalid date').optional({ checkFalsy: true }).isISO8601(),

  sanitizeBody('book').trim().escape(),
  sanitizeBody('imprint').trim().escape(),
  sanitizeBody('status').trim().escape(),
  sanitizeBody('due_back').toDate(),

  createBookInstance
];

export default pipeline;
