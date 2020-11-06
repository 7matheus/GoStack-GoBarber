import { Router } from 'express';

import ensureAuthenticaded from '@modules/users/infra/http/middleware/ensureAuthenticated';
import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityControllers';
import ProviderMounthAvailabilityController from '../controllers/ProviderMounthAvailabilityController';
import { celebrate, Joi, Segments } from 'celebrate';

const providersRouter = Router();
const providersController = new ProvidersController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();
const providerMounthAvailabilityController = new ProviderMounthAvailabilityController();

providersRouter.use(ensureAuthenticaded);

providersRouter.get('/', providersController.index);
providersRouter.get(
  '/:id/mounth-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required()
    }
  }),
  providerDayAvailabilityController.index
);
providersRouter.get(
  '/:id/day-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required()
    }
  }),
  providerMounthAvailabilityController.index
);

export default providersRouter;
