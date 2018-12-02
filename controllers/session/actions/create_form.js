import { ensureLoggedOut } from 'connect-ensure-login';

const pipeline = [
  ensureLoggedOut('/'),
  (req, res, next) => res.render('session/form')
];

export default pipeline;
