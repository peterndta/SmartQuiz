import LocalStorageUtils from '~/utils/LocalStorageUtils'

const authMiddleware = () => {
    const token = LocalStorageUtils.getItem('token')
    return !!token
}

export default authMiddleware
