import Book from '../../../models/book';

export default (req, res, next) =>
  Book.findById(req.params.id).exec((err, book) => {
    if(err) { return next(err); }
    if(book == null) {
      return res.redirect('/catalog/books');
    }

    return res.render('book/delete', {
      title: 'Delete Book',
      book: book
    });
  });
