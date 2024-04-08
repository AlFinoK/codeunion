import { classNames } from 'shared/lib/classNames'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { Link } from 'react-router-dom'
import s from './PageError.module.scss'

interface PageErrorProps {
    className?: string
}

export const PageError = ({ className }: PageErrorProps) => {
    const reloadPage = () => {
        // eslint-disable-next-line no-restricted-globals
        location.reload()
    }
    return (
        <div className={classNames(s.PageError, {}, [className])}>
            <h1 className={s.title}>Произошла ошибка</h1>
            <Button className={s.btn} theme={ButtonTheme.PRIMARY} onClick={reloadPage}>
                Перезагрузить страницу
            </Button>
            <Link to="/" className={s.btn}>
                Вернуться на главную
            </Link>
        </div>
    )
}
