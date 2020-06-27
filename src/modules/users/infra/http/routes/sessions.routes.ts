import { Router } from 'express';

import AuthenticationUserService from '@modules/users/services/AuthenticationUserService';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const usersReposotory = new UsersRepository();
  const authenticateUser = new AuthenticationUserService(usersReposotory);

  const { user, token } = await authenticateUser.execute({
    email,
    password
  });

  delete user.password;

  return response.json({ user, token });
});

export default sessionsRouter;
