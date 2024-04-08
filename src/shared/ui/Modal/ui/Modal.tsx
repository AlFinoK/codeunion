import { classNames } from 'shared/lib/classNames'
import { MouseEvent, ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { Portal } from 'shared/Portal'
import { useTheme } from 'app/providers/ThemeProvider'

import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import s from './Modal.module.scss'

const ANIMATION_DELAY = 150

interface ModalProps {
    className?: string
    children?: ReactNode
    isOpen?: boolean
    onClose?: () => void
    lazy?: boolean
}

export const Modal = (props: ModalProps) => {
    const { className, children, isOpen, onClose, lazy } = props
    const [isClosing, setIsClosing] = useState(false)
    const [isMounted, setIsMounted] = useState(false)
    const timerRef = useRef<ReturnType<typeof setTimeout>>()
    const { theme } = useTheme()

    const mods: Record<string, boolean> = {
        [s.opened]: isOpen,
        [s.isClosing]: isClosing,
    }

    const closeHandler = useCallback(() => {
        if (onClose) {
            setIsClosing(true)
            timerRef.current = setTimeout(() => {
                onClose()
                setIsClosing(false)
            }, ANIMATION_DELAY)
        }
    }, [onClose])

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeHandler()
            }
        },
        [closeHandler],
    )

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true)
        }
    }, [isOpen])

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown)
        }

        return () => {
            clearTimeout(timerRef.current)
            window.removeEventListener('keydown', onKeyDown)
        }
    }, [isOpen, onKeyDown])

    const onContentClick = (e: MouseEvent) => {
        e.stopPropagation()
    }

    if (lazy && !isMounted) {
        return null
    }

    return (
        <Portal>
            <div className={classNames(s.Modal, mods, [className, theme])}>
                <div onClick={closeHandler} className={s.overlay}>
                    <div onClick={onContentClick} className={s.content}>
                        {children}
                        <Button theme={ButtonTheme.PRIMARY} onClick={onClose} className={s.closeBtn}>
                            Закрыть
                        </Button>
                    </div>
                </div>
            </div>
        </Portal>
    )
}
