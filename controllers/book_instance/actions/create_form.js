import Book from '../../../models/book';

export default (req, res) =>
  Book.find({},'title')
    .exec((err, book_list) => {
      if (err) { return next(err); }

      return res.render('book_instance/form', {
        title: 'Create Book Instance',
        book_list: book_list
      });
    });
