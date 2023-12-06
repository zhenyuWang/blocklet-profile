import { MouseEventHandler } from 'react'
import { TextField, InputAdornment } from '@mui/material'

export default function InputField({
  label,
  type = 'text',
  placeholder,
  helperText,
  className,
  variant,
  defaultValue,
  StartIcon,
  EndIcon,
  endAdornmentClick,
  registerOptions,
  errors,
}: {
  label: string
  type?: string
  placeholder?: string
  helperText?: string
  className?: string
  variant?: 'standard' | 'filled' | 'outlined'
  defaultValue?: any
  StartIcon?: any
  EndIcon?: any
  endAdornmentClick?: MouseEventHandler<HTMLDivElement>
  registerOptions?: any
  errors?: any
}) {
  return (
    <>
      <TextField
        label={label}
        type={type}
        placeholder={placeholder}
        helperText={helperText}
        className={className}
        variant={variant}
        defaultValue={defaultValue}
        InputProps={{
          startAdornment: StartIcon && (
            <InputAdornment position='start'>
              <StartIcon />
            </InputAdornment>
          ),
          endAdornment: EndIcon && (
            <InputAdornment
              data-testid='input-adornment-end'
              position='end'
              onClick={endAdornmentClick}>
              <EndIcon />
            </InputAdornment>
          ),
        }}
        {...registerOptions}
      />
      <span className='mt-1 mb-5 text-orange-500 text-sm'>{errors?.message}</span>
    </>
  )
}
