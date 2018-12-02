import { ensureLoggedIn } from 'connect-ensure-login';

const destroySession = (req, res, next) => {
  req.logout();
  res.redirect('/');
};

const pipeline = [
  ensureLoggedIn(),
  destroySession
];

export default pipeline;
