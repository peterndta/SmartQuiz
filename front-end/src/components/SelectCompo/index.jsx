import { FormControl, MenuItem, Select } from '@mui/material'

import { AppStyles } from '~/constants/styles'

const SelectCompo = ({
    selectStyle,
    formControlStyle,
    isRequire = false,
    isDisable = false,
    onChange,
    value,
    data,
    multiple = false,
}) => {
    return (
        <FormControl
            fullWidth
            sx={{
                ...formControlStyle,
                '& svg': {
                    color: AppStyles.colors['#004DFF'],
                },
                '& .MuiInputBase-root': {
                    borderRadius: 3,
                },
            }}
            required={isRequire}
            disabled={isDisable}
        >
            <Select
                multiple={multiple}
                sx={{ ...selectStyle }}
                onChange={(_, props) => {
                    const { name, value } = props.props
                    onChange(name, value)
                }}
                value={value.value}
            >
                {data.map((dt, index) => (
                    <MenuItem value={dt.value} key={index} name={dt.label}>
                        {dt.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default SelectCompo
