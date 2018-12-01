import BookInstance from '../../../models/bookinstance';

export default (req, res, next) =>
  BookInstance.find()
    .populate('book')
    .exec((err, bookinstance_list) => {
      if (err) { return next(err); }
      // Successful, so render
      return res.render('book_instance/index', {
        title: 'Book Instance List',
        bookinstance_list: bookinstance_list
      });
    });
