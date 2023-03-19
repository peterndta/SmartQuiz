import jwt_decode from 'jwt-decode'
import { useHistory } from 'react-router-dom'

import { login, logout } from '../index'
import { useAppDispatch } from './../../../hooks/redux-hooks'

import { post } from '~/utils/ApiCaller'
import LocalStorageUtils from '~/utils/LocalStorageUtils'

const useAuthAction = () => {
    const history = useHistory()
    const dispatch = useAppDispatch()
    const loginHandler = (token) =>
        post({
            endpoint: '/api/authentication/auth',
            headers: { Authorization: `Bearer ${token}` },
        }).then((response) => {
            if (response?.data?.isSuccess) {
                LocalStorageUtils.setUser(token)
                const { email, name, image, role, exp, userId, premium } = jwt_decode(token)
                dispatch(login({ email, name, image, role, exp, userId, token, premium }))
                if (role === 'admin') {
                    history.push('/admin')
                } else {
                    history.push('/')
                }
            } else {
                throw new Error('Something went wrong')
            }
        })

    const logoutHandler = () => {
        LocalStorageUtils.deleteUser()
        dispatch(logout())
        history.push('/login')
    }

    const autoLoginHandler = () => {
        const token = LocalStorageUtils.getToken()
        const user = LocalStorageUtils.getUser()

        if (user && typeof user === 'object') {
            if (user?.exp && user?.exp * 1000 > Date.now()) {
                dispatch(
                    login({
                        token,
                        email: user.email,
                        name: user.name,
                        image: user.image,
                        role: user.role,
                        exp: user.exp,
                        userId: +user.userId,
                        premium: user.premium,
                    })
                )
            } else {
                logoutHandler()
            }
        } else {
            dispatch(
                login({
                    token: null,
                    email: '',
                    name: '',
                    image: '',
                    role: '',
                    exp: 0,
                    userId: null,
                    premium: 'False',
                })
            )
        }
    }

    return { loginHandler, logoutHandler, autoLoginHandler }
}

export default useAuthAction
