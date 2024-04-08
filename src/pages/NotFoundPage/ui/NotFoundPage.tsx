import { classNames } from 'shared/lib/classNames'
import s from './NotFoundPage.module.scss'

interface NotFoundPageProps {
    className?: string
}

export const NotFoundPage = ({ className }: NotFoundPageProps) => (
    <div className={classNames(s.NotFoundPage, {}, [className])}>Страница не найдена</div>
)
