import Vue from "vue";
import VueI18n from 'vue-i18n'
import merge from 'deepmerge'

import baseMessages from '../modules/base/i18n/messages'
import flowMessages from '../modules/flow/i18n/messages'
import menuMessages from '../menu-config/menu-i18n'
import {i18nMessages as i18nMessagesCommon} from '@dracul/common-frontend'
import {i18nMessages as i18nMessagesUser} from '@dracul/user-frontend'
import {i18nMessages as i18nMessagesCustom} from '@dracul/customize-frontend'
import {i18nMessages as i18nMessagesNotification} from '@dracul/notification-frontend'

const messages = merge.all([
    baseMessages,
    flowMessages,
    menuMessages,
    i18nMessagesCommon,
    i18nMessagesUser,
    i18nMessagesCustom,
    i18nMessagesNotification
])

Vue.use(VueI18n)

const i18n = new VueI18n({
    locale: 'en',
    messages,
})

export default i18n
