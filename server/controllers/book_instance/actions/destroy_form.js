import BookInstance from '../../../models/bookinstance';

export default (req, res, next) =>
  BookInstance.findById(req.params.id)
    .populate('book')
    .exec((err, bookinstance) => {
      if (err) { return next(err); }
      if (bookinstance == null) {
        return res.redirect('/catalog/bookinstances');
      }

      return res.render('book_instance/delete', {
        title: 'Delete Book instance',
        bookinstance: bookinstance
      });
    });
