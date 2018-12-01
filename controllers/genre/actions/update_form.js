import Genre from '../../../models/genre';

export default (req, res, next) =>
  Genre.findById(req.params.id).exec((err, genre) => {
    if (err) { return next(err); }

    return res.render('genre/form', {
      title: 'Update Genre',
      genre: genre
    });
  });
