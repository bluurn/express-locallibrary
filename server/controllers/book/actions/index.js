import Book from '../../../models/book';

export default (req, res, next) =>
  Book.find({}, 'title author')
  .populate('author')
  .exec((err, book_list) => {
    if (err) { return next(err); }

    return res.render('book/index', {
      title: 'Book List',
      book_list: book_list
    });
  });
