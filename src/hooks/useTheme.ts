import { useState, useRef, useEffect } from "react";
const getPreviuosState = (): string => {
    const saved = localStorage.getItem('theme')
    if (saved != null) {
        return saved
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light'
}
export function useTheme() {
    const themeRef = useRef<HTMLInputElement>(null)
    const [theme, setTheme] = useState(getPreviuosState)

    const handleChange = () => {
        if (themeRef.current) {
            if (themeRef.current.checked) {
                setTheme('dark')
                localStorage.setItem('theme', 'dark')
            } else {
                setTheme('light')
                localStorage.setItem('theme', 'light')
            }
        }
    }

    useEffect(() => {
        const raiz = document.documentElement
        raiz.setAttribute('data-theme', theme)
        if (themeRef.current) themeRef.current.checked = theme === 'dark'
    }, [theme])

    return { handleChange, themeRef }
}