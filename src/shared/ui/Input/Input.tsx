import { memo, InputHTMLAttributes, useEffect, useRef } from 'react'

import { Mods, classNames } from 'shared/lib/classNames'
import s from './Input.module.scss'

export enum InputTheme {
    PRIMARY = 'primary',
}

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

interface InputProps extends HTMLInputProps {
    className?: string
    theme?: InputTheme
    type?: string
    placeholder: string
    value?: string
    autofocus?: boolean
    onChange?: (value: string) => void
}

export const Input = memo((props: InputProps) => {
    const { className, onChange, type = 'text', placeholder, theme, value, autofocus, ...otherProps } = props
    const inputRef = useRef<HTMLInputElement>(null)

    const handleClearInput = (e: any) => {
        inputRef.current?.focus()
        onChange?.((e.target.value = ''))
    }

    const onChangeInput = (e: any) => {
        onChange?.(e.target.value)
    }

    useEffect(() => {
        if (autofocus) {
            inputRef.current?.focus()
        }
    }, [autofocus])

    const mods: Mods = {
        [s.theme]: true,
    }
    return (
        <div className={s.inputBox}>
            <input
                className={classNames(s.Input, mods)}
                ref={inputRef}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChangeInput}
                {...otherProps}
            />
            <div onClick={handleClearInput} className={s.clear}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        // eslint-disable-next-line max-len
                        d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z"
                    />
                </svg>
            </div>
        </div>
    )
})
