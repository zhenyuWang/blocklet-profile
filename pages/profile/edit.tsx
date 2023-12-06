import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ChangeEvent, useCallback, useState } from 'react'
import { UserInfo, initUserInfo } from './index'
import useLocalStorage from '@/hooks/useLocalStorage'
import { useRouter } from 'next/navigation'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import dayjs from 'dayjs'

import {
  Badge,
  Avatar,
  FormControlLabel,
  Radio,
  RadioGroup,
  Slide,
  Snackbar,
  Alert,
  Button,
} from '@mui/material'
import InputField from '@/components/InputFiled'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import PersonIcon from '@mui/icons-material/Person'
import EmailIcon from '@mui/icons-material/Email'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import VpnKeyIcon from '@mui/icons-material/VpnKey'
import SendVerificationCodeButton from '@/components/SendVerificationCodeButton'
import LockIcon from '@mui/icons-material/Lock'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import MaleIcon from '@mui/icons-material/Male'
import FemaleIcon from '@mui/icons-material/Female'
import TransgenderIcon from '@mui/icons-material/Transgender'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import Confetti from 'react-dom-confetti'

export default function ProfileEdit() {
  const { t } = useTranslation('common')
  const [userInfo, setUserInfo] = useLocalStorage('userInfo', JSON.stringify(initUserInfo))
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [validationSuccess, setValidationSuccess] = useState(false)

  const handleAvatarChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const reader = new FileReader()
      reader.addEventListener('load', async () => {
        if ((reader.result as string).length > 1024 * 1024 * 5) {
          setIsOpenDialog(true)
        } else {
          setUserInfo({ ...userInfo, avatar: reader.result as string })
        }
        // Prevent if the resource is selected twice, onChange is not triggered
        e.target.value = ''
      })
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const togglePasswordVisibility = useCallback(
    () => setIsPasswordVisible(!isPasswordVisible),
    [isPasswordVisible]
  )

  const router = useRouter()
  const cancelHandler = useCallback(() => {
    router.replace('/profile')
  }, [router])

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInfo>({
    defaultValues: {
      avatar: '/images/avatar.png',
    },
  })

  const onSubmit: SubmitHandler<UserInfo> = (data: UserInfo) => {
    if (validationSuccess) return
    setValidationSuccess(true)
    data.avatar = userInfo.avatar
    data.gender *= 1
    data.birthDate = dayjs(data.birthDate).format('YYYY-MM-DD')
    localStorage.setItem('userInfo', JSON.stringify(data))
    setTimeout(() => {
      setValidationSuccess(false)
      router.replace('/profile')
    }, 800)
  }

  return (
    <Slide direction='down' in={true} mountOnEnter unmountOnExit>
      <div className='w-100 h-screen flex flex-col items-center sm:justify-center text-white'>
        <h1 className='text-3xl font-bold mt-14 sm:-mt-20 mb-14'>{t('profile-edit-title')}</h1>

        <form className='flex flex-col w-80' onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-2 w-28 h-28 relative mx-auto'>
            <Badge
              overlap='circular'
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={<CloudUploadIcon className='text-3xl' />}>
              <Avatar alt={t('avatar')} src={userInfo.avatar} sx={{ width: 100, height: 100 }} />
            </Badge>
            <Snackbar
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              open={isOpenDialog}
              autoHideDuration={5000}
              onClose={() => setIsOpenDialog(false)}>
              <Alert
                onClose={() => setIsOpenDialog(false)}
                severity='warning'
                sx={{ width: '100%' }}>
                The size of the profile picture cannot exceed 5M.
              </Alert>
            </Snackbar>
            <input
              accept='image/*'
              id='avatar-upload'
              type='file'
              className='w-28 h-28 opacity-0 z-20 absolute left-0 cursor-pointer'
              onChange={handleAvatarChange}
            />
          </div>
          <span className='mt-1 mb-5'>{errors.avatar?.message}</span>

          <InputField
            label={t('user-name')}
            placeholder={t('user-name-placeholder')}
            helperText={t('user-name-helper-text')}
            className='custom-input'
            variant='outlined'
            defaultValue={userInfo.username}
            StartIcon={PersonIcon}
            registerOptions={{
              ...register('username', {
                required: t('user-name-required-error-text'),
                pattern: {
                  value: /^[a-zA-Z]\w{2,14}$/,
                  message: t('user-name-pattern-error-text'),
                },
              }),
            }}
            errors={errors.username}
          />
          <InputField
            label={t('email')}
            placeholder={t('email-placeholder')}
            helperText={t('email-helper-text')}
            className='custom-input'
            variant='outlined'
            defaultValue={userInfo.email}
            StartIcon={EmailIcon}
            registerOptions={{
              ...register('email', {
                required: t('email-required-error-text'),
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: t('email-pattern-error-text'),
                },
              }),
            }}
            errors={errors.email}
          />

          <InputField
            label={t('phone')}
            placeholder={t('phone-placeholder')}
            helperText={t('phone-helper-text')}
            className='custom-input'
            variant='outlined'
            defaultValue={userInfo.phone}
            StartIcon={LocalPhoneIcon}
            registerOptions={{
              ...register('phone', {
                required: t('phone-required-error-text'),
                pattern: {
                  value: /^1[0-9]{10}$/,
                  message: t('phone-pattern-error-text'),
                },
              }),
            }}
            errors={errors.phone}
          />

          <InputField
            label={t('verification-code')}
            placeholder={t('verification-code-placeholder')}
            helperText={t('verification-code-helper-text')}
            className='custom-input'
            variant='outlined'
            type='number'
            StartIcon={VpnKeyIcon}
            EndIcon={SendVerificationCodeButton}
            registerOptions={{
              ...register('verificationCode', {
                required: t('verification-code-required-error-text'),
                pattern: {
                  value: /^[0-9]{6}$/,
                  message: t('verification-code-pattern-error-text'),
                },
              }),
            }}
            errors={errors.verificationCode}
          />

          <InputField
            label={t('password')}
            placeholder={t('password-placeholder')}
            helperText={t('password-helper-text')}
            className='custom-input'
            variant='outlined'
            type={isPasswordVisible ? 'text' : 'password'}
            defaultValue={userInfo.password}
            StartIcon={isPasswordVisible ? LockOpenIcon : LockIcon}
            EndIcon={isPasswordVisible ? VisibilityOffIcon : VisibilityIcon}
            endAdornmentClick={togglePasswordVisibility}
            registerOptions={{
              ...register('password', {
                required: t('password-required-error-text'),
                pattern: {
                  value: /^[^\s]{8,20}$/,
                  message: t('password-pattern-error-text'),
                },
              }),
            }}
            errors={errors.password}
          />

          <div className='py-2 pl-3 flex flex-row items-center border rounded border-white hover:border-[#1976d2]'>
            {userInfo.gender === 0 ? (
              <FemaleIcon style={{ fontSize: 26 }} />
            ) : userInfo.gender === 1 ? (
              <MaleIcon style={{ fontSize: 26 }} />
            ) : (
              <TransgenderIcon style={{ fontSize: 26 }} />
            )}
            <Controller
              name='gender'
              control={control}
              defaultValue={userInfo.gender}
              rules={{ required: t('gender-required-error-text') }}
              render={({ field: { onChange, value } }) => (
                <RadioGroup
                  className='ml-2'
                  value={value}
                  row
                  onChange={(e) => {
                    setUserInfo({ ...userInfo, gender: parseInt(e.target.value) })
                    onChange(e)
                  }}>
                  <FormControlLabel
                    value={0}
                    control={<Radio style={{ color: '#fff' }} size='small' />}
                    label='Female'
                  />
                  <FormControlLabel
                    value={1}
                    control={<Radio style={{ color: '#fff' }} size='small' />}
                    label='Male'
                  />
                  <FormControlLabel
                    value={2}
                    control={<Radio style={{ color: '#fff' }} size='small' />}
                    label='Other'
                  />
                </RadioGroup>
              )}
            />
          </div>
          <span className='mb-1'>{errors.gender?.message}</span>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name='birthDate'
              control={control}
              // @ts-expect-error
              defaultValue={dayjs(userInfo.birthDate)}
              rules={{ required: t('birth-date-required-error-text') }}
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  label={t('birth-date')}
                  value={value}
                  className='w-full mt-6 custom-input'
                  minDate={dayjs().subtract(150, 'year')}
                  maxDate={dayjs()}
                  views={['year', 'month', 'day']}
                  onChange={onChange}
                />
              )}
            />
          </LocalizationProvider>
          <span className='mt-1'>{errors.birthDate?.message}</span>

          <div className='w-full my-6 px-2 flex justify-between'>
            <Button variant='outlined' startIcon={<ArrowBackIosNewIcon />} onClick={cancelHandler}>
              {t('cancel')}
            </Button>
            <Button variant='outlined' startIcon={<ArrowUpwardIcon />} type='submit'>
              {t('save')}
              <Confetti
                active={validationSuccess}
                config={{
                  angle: 90,
                  spread: 360,
                  startVelocity: 45,
                  elementCount: 300,
                }}
              />
            </Button>
          </div>
        </form>
      </div>
    </Slide>
  )
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}
