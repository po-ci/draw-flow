import merge from 'deepmerge'
import baseRoutes from '../modules/base/routes'
import flowRoutes from '../modules/flow/routes'

import {routes as userRoutes} from '@dracul/user-frontend'
import {routes as customRoutes} from '@dracul/customize-frontend'
import {routes as notificationRoutes} from '@dracul/notification-frontend'

const routes = merge.all([baseRoutes, flowRoutes, userRoutes, notificationRoutes, customRoutes])


export default routes;
