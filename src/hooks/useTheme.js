import { useState, useRef, useEffect } from "react";
export function useTheme(){
    const prev = () => {
        if (localStorage.getItem('theme') != null) {
            return localStorage.getItem('theme')
        }
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light'
    }
    const themeRef = useRef(null)
    const [theme, setTheme] = useState(prev)

    const handleChange = () => {
        if (themeRef.current.checked) {
            setTheme('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            setTheme('light',)
            localStorage.setItem('theme', 'light')
        }
    }

    useEffect(() => {
        const raiz = document.querySelector("html")
        themeRef.current.checked = theme == 'dark'
        raiz.setAttribute('data-theme', theme)
    }, [theme])

    return{handleChange, themeRef}
}