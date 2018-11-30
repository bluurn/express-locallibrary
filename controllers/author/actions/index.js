import Author from '../../../models/author';

export default (req, res, next) => {
  Author.find().sort([['family_name', 'ascending']])
  .exec((err, author_list) => {
    if (err) { return next(err); }

    return res.render('author/index', {
      title: 'Author List',
      author_list: author_list
    });
  })
}
