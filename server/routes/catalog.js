import catalogController from '../controllers/catalog';
import bookController from '../controllers/book';
import authorController from '../controllers/author';
import genreController from '../controllers/genre';
import bookInstanceController from '../controllers/book_instance';

import { ensureLoggedIn } from 'connect-ensure-login';
import { Router } from 'express';

export default Router()
  .use(ensureLoggedIn())
  .get('/', catalogController.index)

  .get('/book/create', bookController.createForm)
  .post('/book/create', bookController.create)
  .get('/book/:id/delete', bookController.destroyForm)
  .post('/book/:id/delete', bookController.destroy)
  .get('/book/:id/update', bookController.updateForm)
  .post('/book/:id/update', bookController.update)
  .get('/book/:id', bookController.show)
  .get('/books', bookController.index)

  .get('/author/create', authorController.createForm)
  .post('/author/create', authorController.create)
  .get('/author/:id/delete', authorController.destroyForm)
  .post('/author/:id/delete', authorController.destroy)
  .get('/author/:id/update', authorController.updateForm)
  .post('/author/:id/update', authorController.update)
  .get('/author/:id', authorController.show)
  .get('/authors', authorController.index)

  .get('/genre/create', genreController.createForm)
  .post('/genre/create', genreController.create)
  .get('/genre/:id/delete', genreController.destroyForm)
  .post('/genre/:id/delete', genreController.destroy)
  .get('/genre/:id/update', genreController.updateForm)
  .post('/genre/:id/update', genreController.update)
  .get('/genre/:id', genreController.show)
  .get('/genres', genreController.index)

  .get('/bookinstance/create', bookInstanceController.createForm)
  .post('/bookinstance/create', bookInstanceController.create)
  .get('/bookinstance/:id/delete', bookInstanceController.destroyForm)
  .post('/bookinstance/:id/delete', bookInstanceController.destroy)
  .get('/bookinstance/:id/update', bookInstanceController.updateForm)
  .post('/bookinstance/:id/update', bookInstanceController.update)
  .get('/bookinstance/:id', bookInstanceController.show)
  .get('/bookinstances', bookInstanceController.index);
