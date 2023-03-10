import { useEffect, useState } from 'react'

import { useHistory, useParams } from 'react-router-dom'

import Loading from '../Loading'

import { useClass } from '~/actions/class'

const Join = () => {
    const { id } = useParams()
    const { getClassIdByJoinedCode } = useClass()
    const history = useHistory()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal

        getClassIdByJoinedCode(id, signal)
            .then((res) => {
                const classId = res.data.data.classId
                if (classId) history.replace(`/class/${classId}`)
                else history.replace('/404')
            })
            .finally(() => {
                setLoading(false)
            })
        return () => {
            setLoading(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return loading && <Loading />
}

export default Join
