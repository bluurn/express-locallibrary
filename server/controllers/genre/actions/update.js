import Genre from '../../../models/genre';
import { body,validationResult } from 'express-validator/check';
import { sanitizeBody } from 'express-validator/filter';

const updateGenre = (req, res, next) => {
  const errors = validationResult(req);
  const genre = new Genre({
    name: req.body.name,
    _id: req.params.id
  });

  if (!errors.isEmpty()) {
    return res.render('genre/form', {
      title: 'Update Genre',
      genre: genre,
      errors: errors.array()
    });
  } else {
    return Genre.findByIdAndUpdate(req.params.id, genre, {}, (err, genre) => {
      if (err) { return next(err); }

      return res.redirect(genre.url);
    });
  }
}


const pipeline = [
  body('name', 'Genre name required').isLength({ min: 1 }).trim(),
  sanitizeBody('name').trim().escape(),
  updateGenre
];

export default pipeline;
