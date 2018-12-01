import Genre from '../../../models/genre';
import { body,validationResult } from 'express-validator/check';
import { sanitizeBody } from 'express-validator/filter';

const createGenre = (req, res, next) => {
  const errors = validationResult(req);
  const genre = new Genre({ name: req.body.name });

  if (!errors.isEmpty()) {
    return res.render('genre/form', {
      title: 'Create Genre',
      genre: genre,
      errors: errors.array()
    });
  } else {
    Genre.findOne({ name: req.body.name }).exec((err, found_genre) => {
      if (err) { return next(err); }

      if (found_genre) {
        return res.redirect(found_genre.url);
      } else {
        return genre.save((err) => {
          if (err) { return next(err); }
          return res.redirect(genre.url);
        });
      }
    });
  }
};

const pipeline = [
  body('name', 'Genre name required').isLength({ min: 1 }).trim(),
  sanitizeBody('name').trim().escape(),
  createGenre
];

export default pipeline;
