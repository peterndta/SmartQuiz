import { FormControl, MenuItem, Select } from '@mui/material'

import { AppStyles } from '~/constants/styles'

const SelectMultiCompo = ({ selectStyle, formControlStyle, onChange, value, data, isDisable = false }) => {
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
            disabled={isDisable}
        >
            <Select
                multiple={true}
                sx={{ ...selectStyle }}
                onChange={(event) => {
                    onChange(event)
                }}
                value={value.name}
                name={value.value}
            >
                {data.map((dt, index) => (
                    <MenuItem value={dt.label} key={index} name={dt.value}>
                        {dt.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default SelectMultiCompo
