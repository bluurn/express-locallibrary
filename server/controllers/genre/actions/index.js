import Genre from '../../../models/genre';

export default (req, res, next) =>
  Genre.find()
    .sort([['name', 'ascending']])
    .exec((err, genre_list) => {
      if (err) { return next(err); }

      return res.render('genre/index', {
        title: 'Genre list',
        genre_list: genre_list
      });
    });
