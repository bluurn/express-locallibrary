import { Router } from 'express';

export default Router()
  .get('/', (req, res, next) => res.redirect('/catalog'))
