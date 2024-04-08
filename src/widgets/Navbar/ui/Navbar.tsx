import { classNames } from 'shared/lib/classNames'
import { useState } from 'react'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { Search } from 'widgets/Search'
import { Modal } from 'shared/ui/Modal'
import { IUser } from 'entities/User'
import { Input, InputTheme } from 'shared/ui/Input/Input'
import { userAPI } from 'entities/User/model/services/userAPI'
import { Loader } from 'shared/ui/Loader'
import s from './Navbar.module.scss'

interface NavbarProps {
    className?: string
}

export const Navbar = ({ className }: NavbarProps) => {
    const [isAddUserModal, setIsAddUserModal] = useState(false)
    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [error, setError] = useState<string | null>(null) // Добавлено состояние для отслеживания ошибок

    const [createUser, { error: createError, isLoading: createLoading }] = userAPI.useCreateUserMutation()

    const onToggleModal = () => {
        setIsAddUserModal((prev) => !prev)
    }

    const handleCreate = async () => {
        if (userName.length < 2 || userEmail.length < 2) {
            setError('Имя и фамилия, а также email, должны содержать минимум 2 символа.')
            return
        }

        setError(null) // Сбрасываем ошибку перед выполнением запроса

        await createUser({ name: userName, email: userEmail } as IUser)

        // Если пользователь был добавлен успешно, сбросить поля ввода
        setUserName('')
        setUserEmail('')
        setError('Пользователь успешно добавлен')
    }

    return (
        <div className={classNames(s.navbar, {}, [className])}>
            <h1 className={s.title}>Команда</h1>
            <div className={s.addUser}>
                <Search />
                <Button
                    className={s.addUserBtn}
                    theme={ButtonTheme.PRIMARY}
                    onClick={onToggleModal}
                    style={{ fontSize: '1rem', height: '38px' }}
                >
                    Добавить пользователя
                </Button>
                <Modal className={s.modal} isOpen={isAddUserModal} onClose={onToggleModal}>
                    {createLoading && <Loader />}
                    {createError && <span>ERROR</span>}
                    <div className={s.inner}>
                        <h4 className={s.modalTitle}>Добавление пользователя</h4>
                        <Input
                            onChange={(e) => setUserName(e)}
                            value={userName}
                            theme={InputTheme.PRIMARY}
                            placeholder="Введите имя и фамилию"
                            type="text"
                        />
                        <Input
                            onChange={(e) => setUserEmail(e)}
                            value={userEmail}
                            theme={InputTheme.PRIMARY}
                            placeholder="Введите email"
                            type="email"
                        />
                        <Button onClick={handleCreate} theme={ButtonTheme.PRIMARY} className={s.addBtn}>
                            Добавить пользователя
                        </Button>
                        {error && <span>{error}</span>}
                    </div>
                </Modal>
            </div>
        </div>
    )
}
