import Author from '../../../models/author';
export default (req, res, next) =>
  Author.findById(req.params.id)
  .exec(function(err, author) {
      if (err) { return next(err); }
      return res.render('author/form', {
        title: 'Edit Author',
        author: author
      });
  });
