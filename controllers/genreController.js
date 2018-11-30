var Genre = require('../models/genre');
var Book = require('../models/book');
var async = require('async');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display list of all Genre.
exports.genre_list = function(req, res) {
    Genre.find()
    .sort([['name', 'ascending']])
    .exec(function (err, list_genres) {
      if (err) { return next(err); }
      res.render('genre/index', { title: 'Genre list', genre_list: list_genres})
    })
};

// Display detail page for a specific Genre.
exports.genre_detail = function(req, res, next) {
    async.parallel({
        genre: function(callback) {
            Genre.findById(req.params.id)
              .exec(callback);
        },

        genre_books: function(callback) {
          Book.find({ 'genre': req.params.id })
          .exec(callback);
        },

    }, function(err, results) {
        if (err) { return next(err); }
        if (results.genre==null) { // No results.
            var err = new Error('Genre not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render
        res.render('genre/detail', { title: 'Genre Detail', genre: results.genre, genre_books: results.genre_books } );
    });
};

// Display Genre create form on GET.
exports.genre_create_get = function(req, res) {
    res.render('genre/form', { title: 'Create Genre' });
};

// Handle Genre create on POST.
exports.genre_create_post =  [
    // Validate that the name field is not empty.
    body('name', 'Genre name required').isLength({ min: 1 }).trim(),
    // Sanitize (trim and escape) the name field.
    sanitizeBody('name').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a genre object with escaped and trimmed data.
        var genre = new Genre(
            { name: req.body.name }
        );


        if (!errors.isEmpty()) {
        // There are errors. Render the form again with sanitized values/error messages.
        res.render('genre/form', { title: 'Create Genre', genre: genre, errors: errors.array()});
        return;
        } else {
        // Data from form is valid.
        // Check if Genre with same name already exists.
        Genre.findOne({ name: req.body.name })
            .exec( function(err, found_genre) {
                if (err) { return next(err); }

                if (found_genre) {
                // Genre exists, redirect to its detail page.
                    res.redirect(found_genre.url);
                } else {
                    genre.save(function (err) {
                        if (err) { return next(err); }
                        // Genre saved. Redirect to genre detail page.
                        res.redirect(genre.url);
                    });
                }
            });
        }
    }
];
// Display Genre delete form on GET.
exports.genre_delete_get = (req, res, next) =>
    async.parallel({
        genre: (callback) => Genre.findById(req.params.id).exec(callback),
        genre_books: (callback) => Book.find({ genre: req.params.id }).exec(callback)
    }, (err, result) => {
        if (err) { return next(err); }
        const { genre, genre_books } = result;

        res.render('genre/delete', {
            title: 'Delete Genre',
            genre: genre,
            genre_books: genre_books
        });
    });


// Handle Genre delete on POST.
exports.genre_delete_post = (req, res, next) =>
    async.parallel({
        genre: (callback) => Genre.findById(req.body.authorid).exec(callback),
        genre_books: (callback) => Book.find({ genre: req.body.genreid }).exec(callback)
    }, (err, results) => {
        if (err) { return next(err); }
        const { genre, genre_books } = results;

        if (genre_books.length) {
            return res.render('genre/delete', {
                title: 'Delete Genre',
                genre: genre,
                genre_books: genre_books
            });
        } else {
            Genre.findByIdAndRemove(req.body.genreid, (err) => {
                if (err) { return next(err); }
                res.redirect('/catalog/genres');
            });
        }
    });

// Display Genre update form on GET.
exports.genre_update_get = (req, res, next) =>
    Genre.findById(req.params.id).exec((err, genre) => {
        if (err) { return next(err); }

        res.render('genre/form', {
            title: 'Update Genre',
            genre: genre
        })
    });

// Handle Genre update on POST.
exports.genre_update_post = [
    body('name', 'Genre name required').isLength({ min: 1 }).trim(),
    sanitizeBody('name').trim().escape(),
    (req, res, next) => {
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
            Genre.findByIdAndUpdate(req.params.id, genre, {}, (err, genre) => {
                if (err) { return next(err); }
                res.redirect(genre.url);
            });
        }
    }
];
