import { useEffect, useState } from 'react'

import { Avatar, Box } from '@mui/material'
import ButtonCompo from '~/components/ButtonCompo'
import Input from '~/components/Input'
import SelectCompo from '~/components/SelectCompo'
import SelectMultiCompo from '~/components/SelectMultiCompo'

import { AppStyles } from './../../../constants/styles'

import { useSnackbar } from '~/HOC/SnackbarContext'
import { initialValue } from '~/Mock'
import { useUser } from '~/actions/user'
import { useAppSelector } from '~/hooks/redux-hooks'
import Loading from '~/pages/Loading'

const selectStyle = {
    border: 'none',
    backgroundColor: AppStyles.colors['#FAFBFF'],
}

const FormControlStyle = {
    mt: 1.5,
    minWidth: 260,
}

const MyInfo = () => {
    const { userId } = useAppSelector((state) => state.auth)
    const [user, setUser] = useState(null)
    const [isFirstLoading, setIsLoading] = useState(true)
    const { getUserInfo } = useUser()
    const [userName, setUserName] = useState('')
    const [classLevel, setClassLevel] = useState(initialValue)
    const grades = useAppSelector((state) => state.grades)
    const subjects = useAppSelector((state) => state.subjects)
    const [listSubject, setListSubject] = useState({ value: [] })
    const showSnackbar = useSnackbar()

    const handleChangeName = (event) => {
        const name = event.target.value
        setUserName(name)
    }

    // const handleChangeHandler = (event) => {
    //     const {
    //         target: { value },
    //       } = event;
    //       setPersonName(
    //         // On autofill we get a stringified value.
    //         typeof value === 'string' ? value.split(',') : value,
    //       );
    //   }

    const classChangeHandler = (name, value) => setClassLevel(() => ({ label: name, value: value }))

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal

        getUserInfo(userId, signal)
            .then((res) => {
                const user = res.data.data
                const level = user.gradeId ? { value: user.gradeId, label: user.gradeName } : { ...initialValue }
                setUser(user)
                setUserName(user.name)
                setClassLevel(level)
            })
            .catch(() => {
                showSnackbar({
                    severity: 'error',
                    children: 'Something went wrong, please try again later.',
                })
            })
            .finally(() => {
                setIsLoading(false)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return isFirstLoading ? (
        <Loading />
    ) : (
        <Box>
            <Box display="flex" alignItems="center">
                <Avatar alt="avatar" src={user.imageUrl} sx={{ width: 120, height: 120, mb: 2 }} variant="circular" />
                <ButtonCompo
                    fullWidth={false}
                    style={{ minWidth: 100, backgroundColor: AppStyles.colors['#004DFF'], ml: 3 }}
                >
                    Cập nhật
                </ButtonCompo>
            </Box>
            <Box mt={5}>
                <label>Tên Đăng nhập</label>
                <Input
                    label="Tên đăng nhập"
                    value={userName}
                    isRequired={true}
                    isFullwidth={true}
                    onChange={handleChangeName}
                />
            </Box>
            <Box display="flex" mt={2}>
                <Box mr={2}>
                    <label>Cấp học</label>
                    <SelectCompo
                        selectStyle={selectStyle}
                        formControlStyle={FormControlStyle}
                        onChange={classChangeHandler}
                        value={classLevel}
                        data={grades}
                    />
                </Box>
                <Box>
                    <label>Những môn yêu thích</label>
                    <SelectMultiCompo
                        selectStyle={selectStyle}
                        formControlStyle={FormControlStyle}
                        onChange={classChangeHandler}
                        value={listSubject}
                        data={
                            classLevel.value === '' || classLevel.value < 3
                                ? subjects.secondarySubjects
                                : classLevel.value >= 3 && classLevel.value <= 7
                                ? subjects.highSchoolSubjects
                                : subjects.universitySubjects
                        }
                    />
                </Box>
            </Box>
        </Box>
    )
}

export default MyInfo
