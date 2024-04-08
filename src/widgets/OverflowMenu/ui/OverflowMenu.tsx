import { classNames } from 'shared/lib/classNames'
import Settings from 'shared/assets/icons/settings.svg?react'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { MouseEventHandler, useEffect, useRef, useState } from 'react'
import { IUser, getUserData } from 'entities/User'
import { Modal } from 'shared/ui/Modal'
import s from './OverflowMenu.module.scss'

interface OverflowMenuProps {
    className?: string
    userData: IUser
    remove: (user: IUser) => void
    update: (user: IUser) => void
}

export const OverflowMenu = (props: OverflowMenuProps) => {
    const { className, userData, remove, update } = props
    const [showOverMenu, setShowOverMenu] = useState(false)
    const [showDeleteNotification, setShowDeleteNotification] = useState(false)
    const [showUpdateNotification, setShowUpdateNotification] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    const toggleOverflowMenu: MouseEventHandler<SVGSVGElement> = () => {
        setShowOverMenu((prev) => !prev)
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setShowOverMenu(false)
        }
    }

    const handleRemove: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation()
        remove(userData)
        setShowDeleteNotification(true)
    }

    const handleUpdate: MouseEventHandler<HTMLButtonElement> = () => {
        const name = prompt() || ''
        update({ ...userData, name })
        setShowUpdateNotification(true)
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <>
            <div className={classNames(s.OverflowMenu, {}, [className])}>
                <Settings className={s.svg} onClick={toggleOverflowMenu} />
                {showOverMenu ? (
                    <div ref={menuRef} className={s.popup}>
                        <div className={s.popupBtns}>
                            <Button onClick={handleUpdate} theme={ButtonTheme.CLEAR} className={s.btn}>
                                Изменить данные участника
                            </Button>
                            <Button theme={ButtonTheme.CLEAR} className={s.btn}>
                                Отправить код повторно
                            </Button>
                            <Button onClick={handleRemove} theme={ButtonTheme.CLEAR} className={s.btn}>
                                Удалить
                            </Button>
                        </div>
                    </div>
                ) : null}
            </div>
            <Modal
                isOpen={showDeleteNotification}
                onClose={() => setShowDeleteNotification(false)}
                className={s.removeModal}
            >
                <p>Пользователь удален!</p>
            </Modal>
            <Modal
                isOpen={showUpdateNotification}
                onClose={() => setShowUpdateNotification(false)}
                className={s.removeModal}
            >
                <p>Данные пользователя изменены!</p>
            </Modal>
        </>
    )
}
