import Book from '../../../models/book';
import BookInstance from '../../../models/bookinstance';

import { body,validationResult } from 'express-validator/check';
import { sanitizeBody } from 'express-validator/filter';

const updateBookInstance = (req, res, next) => {
    const errors = validationResult(req);

    const bookInstance = new BookInstance({
      book: req.body.book,
      imprint: req.body.imprint,
      status: req.body.status,
      due_back: req.body.due_back,
      _id: req.params.id
    });

    if (!errors.isEmpty()) {
      return Book.find({}, 'title').exec((err, book_list) =>
        res.render('book_instance/form', {
          title: 'Create BookInstance',
          book_list : book_list,
          selected_book : bookInstance.book._id ,
          errors: errors.array(),
          bookinstance: bookInstance
        }));
    } else {
      return BookInstance.findByIdAndUpdate(req.params.id, bookInstance, {}, (err, bookInstance) => {
        if(err) { return next(err); }
        return res.redirect(bookInstance.url);
      });
    }
}

const pipeline = [
  body('book', 'Book must be specified').isLength({ min: 1 }).trim(),
  body('imprint', 'Imprint must be specified').isLength({ min: 1 }).trim(),
  body('due_back', 'Invalid date').optional({ checkFalsy: true }).isISO8601(),

  sanitizeBody('book').trim().escape(),
  sanitizeBody('imprint').trim().escape(),
  sanitizeBody('status').trim().escape(),
  sanitizeBody('due_back').toDate(),

  updateBookInstance
];


export default pipeline;
