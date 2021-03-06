export default [
    {
        icon: 'person',
        text: 'menu.menu',
        panel: false,
        children: [

            {
                icon: 'home',
                text: 'base.home',
                link: {name: "home"},
            },
            {
                icon: 'account_tree',
                text: 'menu.trees',
                link: {name: "TreeManagementPage"},
            },
            {
                icon: 'account_tree',
                text: 'menu.treeEditor',
                link: {name: "TreeEditorPage"},
            },
            {
                icon: 'account_tree',
                text: 'menu.treeViewer',
                link: {name: "TreeViewPage"},
            },
        ]
    },

    {
        icon: 'person',
        text: 'menu.administration',
        panel: false,
        permission: 'SECURITY_ADMIN_MENU',
        children: [
            {
                icon: 'assignment_ind',
                text: 'menu.userdashboard',
                link: {name: "userDashboard"},
                panel: false,
                permission: 'SECURITY_DASHBOARD_SHOW'
            },
            {
                icon: 'settings_applications',
                text: 'menu.customization',
                link: {name: "customization"},
                panel: false,
                permission: 'CUSTOMIZATION_SHOW'
            },
            {
                icon: 'assignment_ind',
                text: 'user.title',
                link: {name: "userManagement"},
                panel: false,
                permission: 'SECURITY_USER_SHOW'
            },
            {
                icon: 'verified_user',
                text: 'role.title',
                link: {name: "roleManagement"},
                panel: false,
                permission: 'SECURITY_ROLE_SHOW'
            },
            {
                icon: 'group',
                text: 'group.title',
                link: {name: "groupManagement"},
                panel: false,
                permission: 'SECURITY_GROUP_SHOW'
            },

        ]
    },
    {
        icon: 'perm_phone_msg',
        text: 'base.about',
        link: {name: "about"},
        panel: false,
    },


]
