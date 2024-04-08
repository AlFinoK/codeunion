import { type ButtonHTMLAttributes, type FC } from 'react'
import { classNames } from 'shared/lib/classNames'
import s from './Button.module.scss'

export enum ButtonTheme {
    PRIMARY = 'primary',
    CLEAR = 'clear',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
    theme?: ButtonTheme
    disabled?: boolean
}

export const Button: FC<ButtonProps> = (props) => {
    const { className, children, theme, disabled, ...otherProps }: ButtonProps = props

    const mods: Record<string, boolean> = {
        [s[theme]]: true,
        [s.disabled]: disabled,
    }
    return (
        <button className={classNames(s.Button, mods, [className])} {...otherProps} disabled={disabled} type="button">
            {children}
        </button>
    )
}
