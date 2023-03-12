import { useEffect, useState } from 'react'

import { Box, Typography } from '@mui/material'
import { blueGrey } from '@mui/material/colors'

import Chart from './Chart'
import PremiumTable from './PremiumTable'
import StatisticCards from './StatisticCards'

import { useSnackbar } from '~/HOC/SnackbarContext'
import { useAdmin } from '~/actions/admin'
import Loading from '~/pages/Loading'

const Dashboard = () => {
    const [topUser, settopUser] = useState([])
    const [topClasses, settopClasses] = useState([])

    const adminAction = useAdmin()
    const showSnackBar = useSnackbar()
    const [isLoadingMostUser, setIsLoadingMostUser] = useState(true)
    const [isLoadingMostClasses, setIsLoadingMostClasses] = useState(true)
    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal

        adminAction
            .getTopUsers(signal)
            .then((res) => {
                const datas = res.data.data

                settopUser(datas)
            })
            .catch(() => {
                showSnackBar({
                    severity: 'error',
                    children: 'Something went wrong, please try again later.',
                })
            })
        // .finally(() => {
        //     setIsLoadingMostUser(false)
        // })
        return () => {
            controller.abort()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal

        adminAction
            .getTopClasses(signal)
            .then((res) => {
                const datas = res.data.data

                settopClasses(datas)
            })
            .catch(() => {
                showSnackBar({
                    severity: 'error',
                    children: 'Something went wrong, please try again later.',
                })
            })
            .finally(() => {
                setIsLoadingMostClasses(false)
            })

        return () => {
            controller.abort()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    if (isLoadingMostClasses) {
        return <Loading />
    }
    return (
        <Box maxWidth={1450} sx={{ m: '0 auto' }}>
            <Box mb={4.5} mt={6}>
                <Typography component="span" variant="h4" sx={{ color: blueGrey[800], fontWeight: 500 }}>
                    Dashboard
                </Typography>
            </Box>
            <StatisticCards />
            <Box mt={6}>
                <Chart
                    topUser={topUser}
                    topClasses={topClasses}
                    isLoadingMostUser={isLoadingMostUser}
                    isLoadingMostClasses={isLoadingMostClasses}
                />
            </Box>
            <Box mt={8} mb={11}>
                <PremiumTable />
            </Box>
        </Box>
    )
}

export default Dashboard
