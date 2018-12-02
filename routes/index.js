import session_controller from '../controllers/session/controller';

import { Router } from 'express';

export default Router()
  .get('/', (req, res, next) => res.redirect('/catalog'))
  .get('/login', session_controller.create_form)
  .post('/login', session_controller.create)
  .get('/logout', session_controller.destroy);
