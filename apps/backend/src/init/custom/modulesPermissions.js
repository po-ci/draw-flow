/* ADD YOUR MODULE PERMISSIONS HERE */

import {
 BASE_SHOW
} from '../../modules/base/permissions'

import {
    TREE_CREATE,
    TREE_DELETE,
    TREE_SHOW,
    TREE_UPDATE
} from '../../modules/flow/permissions/Tree'

export default [
    BASE_SHOW,
    TREE_CREATE,
    TREE_DELETE,
    TREE_SHOW,
    TREE_UPDATE
]
