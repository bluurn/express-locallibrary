import catalog_controller from '../controllers/catalog/controller';
import book_controller from '../controllers/book/controller';
import author_controller from '../controllers/author/controller';
import genre_controller from '../controllers/genre/controller';
import book_instance_controller from '../controllers/book_instance/controller';
import { Router } from 'express';

export default Router()
  .get('/', catalog_controller.index)

  .get('/book/create', book_controller.create_form)
  .post('/book/create', book_controller.create)
  .get('/book/:id/delete', book_controller.destroy_form)
  .post('/book/:id/delete', book_controller.destroy)
  .get('/book/:id/update', book_controller.update_form)
  .post('/book/:id/update', book_controller.update)
  .get('/book/:id', book_controller.show)
  .get('/books', book_controller.index)

  .get('/author/create', author_controller.create_form)
  .post('/author/create', author_controller.create)
  .get('/author/:id/delete', author_controller.destroy_form)
  .post('/author/:id/delete', author_controller.destroy)
  .get('/author/:id/update', author_controller.update_form)
  .post('/author/:id/update', author_controller.update)
  .get('/author/:id', author_controller.show)
  .get('/authors', author_controller.index)

  .get('/genre/create', genre_controller.create_form)
  .post('/genre/create', genre_controller.create)
  .get('/genre/:id/delete', genre_controller.destroy_form)
  .post('/genre/:id/delete', genre_controller.destroy)
  .get('/genre/:id/update', genre_controller.update_form)
  .post('/genre/:id/update', genre_controller.update)
  .get('/genre/:id', genre_controller.show)
  .get('/genres', genre_controller.index)

  .get('/bookinstance/create', book_instance_controller.create_form)
  .post('/bookinstance/create', book_instance_controller.create)
  .get('/bookinstance/:id/delete', book_instance_controller.destroy_form)
  .post('/bookinstance/:id/delete', book_instance_controller.destroy)
  .get('/bookinstance/:id/update', book_instance_controller.update_form)
  .post('/bookinstance/:id/update', book_instance_controller.update)
  .get('/bookinstance/:id', book_instance_controller.show)
  .get('/bookinstances', book_instance_controller.index);
