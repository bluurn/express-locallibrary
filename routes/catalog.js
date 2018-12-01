import catalog_controller from '../controllers/catalog/controller';
import book_controller from '../controllers/book/controller';
import author_controller from '../controllers/author/controller';
import genre_controller from '../controllers/genreController';
import book_instance_controller from '../controllers/bookInstanceController';
import { Router } from 'express';

export default Router()
  .get('/', catalog_controller.index)
  .get('/book/create', book_controller.book_create_get)
  .post('/book/create', book_controller.book_create_post)
  .get('/book/:id/delete', book_controller.book_delete_get)
  .post('/book/:id/delete', book_controller.book_delete_post)
  .get('/book/:id/update', book_controller.book_update_get)
  .post('/book/:id/update', book_controller.book_update_post)
  .get('/book/:id', book_controller.book_detail)
  .get('/books', book_controller.book_list)

  .get('/author/create', author_controller.author_create_get)
  .post('/author/create', author_controller.author_create_post)
  .get('/author/:id/delete', author_controller.author_delete_get)
  .post('/author/:id/delete', author_controller.author_delete_post)
  .get('/author/:id/update', author_controller.author_update_get)
  .post('/author/:id/update', author_controller.author_update_post)
  .get('/author/:id', author_controller.author_detail)
  .get('/authors', author_controller.author_list)

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
