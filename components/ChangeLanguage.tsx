import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import LanguageIcon from '@mui/icons-material/Language'

export default function ChangeLanguage() {
  const { t, i18n } = useTranslation('common')

  const router = useRouter()
  const changeTo = i18n.language === 'zh' ? 'en' : 'zh'
  return (
    <div
      className='mr-1 flex items-center cursor-pointer dark:text-white'
      onClick={() => router.replace(router.pathname, router.pathname, { locale: changeTo })}>
      <LanguageIcon />
      <div className='min-w-[70px] text-center'>{t('current-language')}</div>
    </div>
  )
}
