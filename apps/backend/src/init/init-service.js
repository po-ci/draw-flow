import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.set('useCreateIndex', true)

import {InitService} from '@dracul/user-backend'
import {initPermissionsCustomization} from '@dracul/customize-backend'
import {initCustomization} from './custom/initCustomization'
import operatorRole from './custom/initOperatorRole'

import {
    permissions as notiPermissions
} from "@dracul/notification-backend"

import modulesPermissions from './custom/modulesPermissions'

const initService = async () => {

    //Default user Permissions
    await InitService.initPermissions()

    //Notification permissions
    await InitService.initPermissions([
        notiPermissions.NOTIFICATION_SHOW,
        notiPermissions.NOTIFICATION_CREATE,
        notiPermissions.NOTIFICATION_UPDATE
    ])

    //Dracul Customization module Permissions
    await initPermissionsCustomization()

    //Custom Module permissions
    await InitService.initPermissions(modulesPermissions)

    await InitService.initAdminRole()
    await InitService.initOperatorRole()
    await InitService.initSupervisorRole()

    await InitService.initRoles([operatorRole])

    await InitService.initRootUser()
    await InitService.initSupervisorUser()
    await InitService.initOperatorUser()

    await initCustomization()
}

export {initService}

export default initService
