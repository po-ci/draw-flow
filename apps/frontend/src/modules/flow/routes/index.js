import TreeManagementPage from '../pages/TreeManagementPage'
import TreeEditorPage from '../pages/TreeEditorPage'

const routes = [
     {name: 'TreeManagementPage', path: '/tree-management', component: TreeManagementPage},
     {name: 'TreeEditorPage', path: '/tree-editor/:id?', component: TreeEditorPage},


]

export default routes;
