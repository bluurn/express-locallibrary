import Author from '../../../models/author';
import { body, validationResult } from 'express-validator/check';
import { sanitizeBody } from 'express-validator/filter';

const createAuthor = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render('author/form', {
      title: 'Create Author',
      author: req.body,
      errors: errors.array()
    });
  } else {
    const author = new Author({
      first_name: req.body.first_name,
      family_name: req.body.family_name,
      date_of_birth: req.body.date_of_birth,
      date_of_death: req.body.date_of_death
    });

    return author.save(function (err) {
      if (err) { return next(err); }
      return res.redirect(author.url);
    });
  }
}

const pipeline = [
  body('first_name')
    .isLength({ min: 1 })
    .trim().withMessage('First name must be specified.')
    .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),

  body('family_name')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Family name must be specified.')
    .isAlphanumeric()
    .withMessage('Family name has non-alphanumeric characters.'),

  body('date_of_birth', 'Invalid date of birth')
    .optional({ checkFalsy: true })
    .isISO8601(),

  body('date_of_death', 'Invalid date of death')
    .optional({ checkFalsy: true })
    .isISO8601(),

  sanitizeBody('first_name').trim().escape(),
  sanitizeBody('family_name').trim().escape(),
  sanitizeBody('date_of_birth').toDate(),
  sanitizeBody('date_of_death').toDate(),

  createAuthor
];

export default pipeline;
