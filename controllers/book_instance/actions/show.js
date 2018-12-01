import BookInstance from '../../../models/bookinstance';

export default (req, res, next) =>
  BookInstance.findById(req.params.id)
    .populate('book')
    .exec((err, bookinstance) => {
      if (err) { return next(err); }
      if (bookinstance == null) {
        const err = new Error('Book copy not found');
        err.status = 404;
        return next(err);
      }

      return res.render('book_instance/detail', {
        title: 'Book:',
        bookinstance:  bookinstance
      });
  });
