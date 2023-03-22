import React, { useEffect, useState } from 'react'

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

    const { getTopUsers, getTopClasses } = useAdmin()
    const showSnackBar = useSnackbar()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal
        const secondController = new AbortController()
        const secondSignal = secondController.signal

        const listTopUsers = getTopUsers(signal)
        const listTopClasses = getTopClasses(secondSignal)

        Promise.all([listTopUsers, listTopClasses])
            .then((res) => {
                const topUsers = res[0].data.data
                const topClasses = res[1].data.data

                settopUser(topUsers)
                settopClasses(topClasses)
            })
            .catch(() => {
                showSnackBar({
                    severity: 'error',
                    children: 'Something went wrong, please try again later.',
                })
            })
            .finally(() => {
                setLoading(false)
            })

        return () => {
            controller.abort()
            secondController.abort()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return loading ? (
        <Loading />
    ) : (
        <React.Fragment>
            <Box maxWidth={1450} sx={{ m: '0 auto' }}>
                <Box mb={4.5} mt={6}>
                    <Typography component="span" variant="h4" sx={{ color: blueGrey[800], fontWeight: 500 }}>
                        Dashboard
                    </Typography>
                </Box>
                <StatisticCards />
                <Box mt={6}>
                    <Chart topUser={topUser} topClasses={topClasses} />
                </Box>
                <Box mt={8} mb={11}>
                    <PremiumTable />
                </Box>
            </Box>
        </React.Fragment>
    )
}

export default Dashboard
