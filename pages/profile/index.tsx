import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function ProfileIndex() {
  const { t } = useTranslation('common')

  return <main className='mt-20 text-center text-2xl text-white'>{t('profile-index-title')}</main>
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}
