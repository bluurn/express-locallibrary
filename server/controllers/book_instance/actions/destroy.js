import BookInstance from '../../../models/bookinstance';

export default (req, res, next) =>
  BookInstance.findByIdAndRemove(req.params.id)
    .exec((err, bookInstance) => {
      if (err) { return next(err); }
      return res.redirect('/catalog/bookinstances');
    });
