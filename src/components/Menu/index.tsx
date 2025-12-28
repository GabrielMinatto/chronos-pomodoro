import { HistoryIcon, HouseIcon, MoonIcon, SettingsIcon, SunIcon } from "lucide-react";
import styles from "./styles.module.css";
import React, { useState, useEffect } from "react";
import { RouterLink } from "../RouterLink";

type AvaliableThemes = 'dark' | 'light'


export function Menu() {
    const [theme, setTheme] = useState<AvaliableThemes>(() => {
        const storageTheme = (localStorage.getItem('theme') as AvaliableThemes) || 'dark';
        return storageTheme
    });

    const nextThemeICon = {
        dark: <SunIcon />,
        light: <MoonIcon />
    }

    function HandleThemeChange(
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    ) {
        event.preventDefault();
        setTheme(prevTheme => {
            const nextTheme = prevTheme === 'dark' ? 'light' : 'dark';
            return nextTheme
        })
    }

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme)
    }, [theme]);

    return (
        <nav className={styles.menu}>
            <RouterLink className={styles.menuLink} href='/' aria-label="Ir para a Home" title="Ir para a Home">
                <HouseIcon />
            </RouterLink>
            <RouterLink className={styles.menuLink} href="/history/" aria-label="Ver histórico" title="Ver histórico">
                <HistoryIcon />
            </RouterLink>
            <RouterLink className={styles.menuLink} href="/settings/" aria-label="Configurações" title="Configurações">
                <SettingsIcon />
            </RouterLink>
            <a className={styles.menuLink} href="#" aria-label="Mudar tema" title="Mudar tema" onClick={HandleThemeChange}>
                {nextThemeICon[theme]}
            </a>
        </nav>
    );
}