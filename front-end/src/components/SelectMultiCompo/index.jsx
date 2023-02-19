import { FormControl, MenuItem, Select } from '@mui/material'

import { AppStyles } from '~/constants/styles'

const SelectMultiCompo = ({ selectStyle, formControlStyle, onChange, value, data }) => {
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
        >
            <Select
                multiple={true}
                sx={{ ...selectStyle }}
                onChange={(_, props) => {
                    const { name, value } = props.props
                    onChange(name, value)
                }}
                value={value.value}
            >
                {data.map((dt, index) => (
                    <MenuItem value={dt.label} key={index} name={dt.label}>
                        {dt.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default SelectMultiCompo
