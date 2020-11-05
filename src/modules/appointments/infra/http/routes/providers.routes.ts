import { Router } from 'express';

import ensureAuthenticaded from '@modules/users/infra/http/middleware/ensureAuthenticated';
import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityControllerts';
import ProviderMounthAvailabilityController from '../controllers/ProviderMounthAvailabilityController';

const providersRouter = Router();
const providersController = new ProvidersController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();
const providerMounthAvailabilityController = new ProviderMounthAvailabilityController();

providersRouter.use(ensureAuthenticaded);

providersRouter.get('/', providersController.index);
providersRouter.get(
  '/:id/mounth-availability',
  providerDayAvailabilityController.index
);
providersRouter.get(
  '/:id/day-availability',
  providerMounthAvailabilityController.index
);

export default providersRouter;
