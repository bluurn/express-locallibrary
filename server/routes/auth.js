import session_controller from '../controllers/session';

import { Router } from 'express';

export default Router()
  .get('/login', session_controller.createForm)
  .post('/login', session_controller.create)
  .get('/logout', session_controller.destroy);
