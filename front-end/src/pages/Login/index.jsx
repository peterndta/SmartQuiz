import { useEffect, useState } from 'react'

import queryString from 'query-string'
import { useLocation } from 'react-router-dom'

import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Grid, Tab } from '@mui/material'

import Loading from '../Loading'
import SigninForm from './SigninForm'
import SignupForm from './SignupForm'
import Welcome from './Welcome'

import { useSnackbar } from '~/HOC/SnackbarContext'
import LoginImage from '~/assets/images/LoginImage.png'
import useAuthAction from '~/features/authSlice/auth-actions'

const Login = () => {
    const [index, setIndex] = useState('0')
    const { search } = useLocation()
    const { loginHandler } = useAuthAction()
    const { token, error } = queryString.parse(search)
    const [isLoading, setIsLoading] = useState(token ? true : false)
    const showSnackbar = useSnackbar()

    const changeIndexHandler = (_, value) => {
        setIndex(value)
    }

    useEffect(() => {
        if (error && error === 'inactive-user') {
            showSnackbar({
                severity: 'error',
                children: 'Your email is banned, please contact Admin to unban.',
            })
        } else if (error) {
            showSnackbar({
                severity: 'error',
                children: 'Something went wrong, please try again later.',
            })
        } else if (token) {
            loginHandler(token).catch(() => {
                showSnackbar({
                    severity: 'error',
                    children: 'Something went wrong, please try again later.',
                })
                setIsLoading(false)
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return isLoading ? (
        <Loading />
    ) : (
        <Grid container>
            <Grid item xs={6}>
                <Welcome src={LoginImage} size="cover" />
            </Grid>
            <Grid item xs={6}>
                <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                    <Box sx={{ width: '100%', maxWidth: 560 }}>
                        <TabContext value={index}>
                            <TabList onChange={changeIndexHandler} variant="fullWidth">
                                <Tab label="Đăng nhập" value={'0'} />
                                <Tab label="Đăng ký" value={'1'} />
                            </TabList>
                            <TabPanel value={'0'} sx={{ p: 0 }}>
                                <SigninForm />
                            </TabPanel>
                            <TabPanel value={'1'}>
                                <SignupForm />
                            </TabPanel>
                        </TabContext>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}

export default Login
