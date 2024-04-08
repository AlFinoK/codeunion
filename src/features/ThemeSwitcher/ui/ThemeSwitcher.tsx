import { useTheme, Theme } from 'app/providers/ThemeProvider'
import { classNames } from 'shared/lib/classNames'
import LightIcon from 'shared/assets/icons/light-theme.svg?react'
import DarkIcon from 'shared/assets/icons/dark-theme.svg?react'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import s from './ThemeSwitcher.module.scss'

interface ThemeSwitcherProps {
    className?: string
}

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
    const { toggleTheme, theme } = useTheme()

    return (
        <Button
            theme={ButtonTheme.PRIMARY}
            className={classNames(s.ThemeSwitcher, {}, [className])}
            onClick={toggleTheme}
        >
            {theme === Theme.DARK ? <LightIcon className={s.light} /> : <DarkIcon className={s.dark} />}
        </Button>
    )
}
