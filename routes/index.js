import { Router } from 'express';

export default Router().get('/', function(req, res, next) {
  res.redirect('/catalog');
});
