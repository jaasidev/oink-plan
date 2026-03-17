import { useState, useRef, useEffect } from 'react'
const getPreviousState = (): string => {
  const saved = localStorage.getItem('theme')
  if (saved != null) {
    return saved
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}
export function useTheme() {
  const themeRef = useRef<HTMLInputElement>(null)
  const [theme, setTheme] = useState(getPreviousState)

  const updateTheme = (newTheme: 'dark' | 'light') => {
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    updateTheme(e.target.checked ? 'dark' : 'light')
  }

  useEffect(() => {
    const raiz = document.documentElement
    raiz.setAttribute('data-theme', theme)
    if (themeRef.current) themeRef.current.checked = theme === 'dark'
  }, [theme])

  return { handleChange, themeRef }
}
