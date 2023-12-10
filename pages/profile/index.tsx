import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import useLocalStorage from '@/hooks/useLocalStorage'
import { useCallback } from 'react'
import { useRouter } from 'next/navigation'

import { Zoom, Avatar } from '@mui/material'
import UserInfoListItem from '@/components/UserInfoListItem'
import EmailIcon from '@mui/icons-material/Email'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import MaleIcon from '@mui/icons-material/Male'
import FemaleIcon from '@mui/icons-material/Female'
import TransgenderIcon from '@mui/icons-material/Transgender'
import CakeIcon from '@mui/icons-material/Cake'
import EditIcon from '@mui/icons-material/Edit'
import Button from '@mui/material/Button'

export type UserInfo = {
  avatar: string
  username: string
  email: string
  gender: number
  phone: string
  verificationCode: string
  birthDate: string
  password: string
}

export const initUserInfo: UserInfo = {
  avatar: '/images/avatar.png',
  username: 'Running_Snail',
  email: 'Running-snail@test.com',
  gender: 1,
  phone: '12345678901',
  verificationCode: '',
  birthDate: '1992-05-13',
  password: '123456789',
}

export default function ProfileIndex() {
  const { t } = useTranslation('common')
  const [userInfo] = useLocalStorage('userInfo', JSON.stringify(initUserInfo))

  const router = useRouter()
  const navigateToProfileEdit = useCallback(() => {
    router.push('/profile/edit')
  }, [router])

  return (
    <main>
      <Zoom in={true} mountOnEnter unmountOnExit>
        <div className='w-full min-h-screen flex flex-col items-center sm:justify-center dark:text-white'>
          <h1 className='text-3xl font-bold mt-14 mb-14'>{t('profile-index-title')}</h1>
          <Avatar alt={t('avatar')} src={userInfo.avatar} sx={{ width: 100, height: 100 }} />
          <div className='mt-6 mb-4 text-center'>
            <p>
              {t('hi')}, <span className='font-bold'>{userInfo.username}</span>
            </p>
            <p className='mt-2'>{t('welcome-back')}</p>
          </div>

          <ul className='w-80 flex flex-col'>
            <UserInfoListItem
              icon={<EmailIcon />}
              label={t('email-label')}
              value={userInfo.email}
            />
            <UserInfoListItem
              icon={<LocalPhoneIcon />}
              label={t('phone-label')}
              value={userInfo.phone}
            />
            <UserInfoListItem
              icon={
                userInfo.gender === 0 ? (
                  <FemaleIcon style={{ fontSize: 26 }} />
                ) : userInfo.gender === 1 ? (
                  <MaleIcon style={{ fontSize: 26 }} />
                ) : (
                  <TransgenderIcon style={{ fontSize: 26 }} />
                )
              }
              label={t('gender-label')}
              value={
                userInfo.gender === 0 ? t('female') : userInfo.gender === 1 ? t('male') : t('other')
              }
            />
            <UserInfoListItem
              icon={<CakeIcon />}
              label={t('birth-date-label')}
              value={userInfo.birthDate}
            />
          </ul>

          <div className='my-6'>
            <Button
              variant='outlined'
              className='w-32'
              startIcon={<EditIcon />}
              onClick={navigateToProfileEdit}>
              {t('edit')}
            </Button>
          </div>
        </div>
      </Zoom>
    </main>
  )
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}
