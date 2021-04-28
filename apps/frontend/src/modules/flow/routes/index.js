import TreeManagementPage from '../pages/TreeManagementPage'
import TreeEditorPage from '../pages/TreeEditorPage'
import TreeViewPage from '../pages/TreeViewPage'

const routes = [
     {name: 'TreeManagementPage', path: '/tree-management', component: TreeManagementPage},
     {name: 'TreeEditorPage', path: '/tree-editor/:id?', component: TreeEditorPage},
     {name: 'TreeViewPage', path: '/tree-view/:id?', component: TreeViewPage},


]

export default routes;
