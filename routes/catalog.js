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

  .get('/genre/create', genre_controller.genre_create_get)
  .post('/genre/create', genre_controller.genre_create_post)
  .get('/genre/:id/delete', genre_controller.genre_delete_get)
  .post('/genre/:id/delete', genre_controller.genre_delete_post)
  .get('/genre/:id/update', genre_controller.genre_update_get)
  .post('/genre/:id/update', genre_controller.genre_update_post)
  .get('/genre/:id', genre_controller.genre_detail)
  .get('/genres', genre_controller.genre_list)

  .get('/bookinstance/create', book_instance_controller.bookinstance_create_get)
  .post('/bookinstance/create', book_instance_controller.bookinstance_create_post)
  .get('/bookinstance/:id/delete', book_instance_controller.bookinstance_delete_get)
  .post('/bookinstance/:id/delete', book_instance_controller.bookinstance_delete_post)
  .get('/bookinstance/:id/update', book_instance_controller.bookinstance_update_get)
  .post('/bookinstance/:id/update', book_instance_controller.bookinstance_update_post)
  .get('/bookinstance/:id', book_instance_controller.bookinstance_detail)
  .get('/bookinstances', book_instance_controller.bookinstance_list);
