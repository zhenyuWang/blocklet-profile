import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'

export default function SendVerificationCodeButton() {
  const { i18n } = useTranslation('common')
  const [defaultSendCodeText, setDefaultSendCodeText] = useState('Send code')
  const [sendVerificationCodeButtonText, setSendVerificationCodeButtonText] = useState('Send code')

  useEffect(() => {
    const defaultSendCodeText = i18n.language === 'en' ? 'Send code' : '发送验证码'
    setDefaultSendCodeText(defaultSendCodeText)
    setSendVerificationCodeButtonText(defaultSendCodeText)
  }, [i18n.language])

  const sendVerificationCode = () => {
    let count = 59
    setSendVerificationCodeButtonText(`${60}s`)
    const timer = setInterval(() => {
      if (count > 0) {
        count--
        setSendVerificationCodeButtonText(`${count}s`)
      } else {
        clearInterval(timer)
        setSendVerificationCodeButtonText(defaultSendCodeText)
      }
    }, 1000)
  }

  return (
    <button
      className='focus:outline-none w-[90px] text-white'
      type='button'
      disabled={sendVerificationCodeButtonText !== defaultSendCodeText}
      onClick={sendVerificationCode}>
      {sendVerificationCodeButtonText}
    </button>
  )
}
