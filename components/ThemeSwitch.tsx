'use client'

import { useTheme } from '@/context/theme-context'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'

export default function ThemeSwitch() {
  const themeContext = useTheme()
  const theme = themeContext?.theme
  const toggleTheme = themeContext?.toggleTheme

  return (
    <button
      className='text-black shadow-2xl rounded-full hover:scale-[1.15] active:scale-105 transition-all dark:text-white'
      onClick={toggleTheme}>
      {theme === 'light' ? <LightModeIcon /> : <DarkModeIcon />}
    </button>
  )
}
