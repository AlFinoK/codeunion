import { classNames } from 'shared/lib/classNames'

import s from './Pagination.module.scss'
import { Button, ButtonTheme } from '../Button/Button'

interface PaginationProps {
    className?: string
    previousPage: () => void
    nextPage: () => void
    page: number
}

export const Pagination = ({ className, previousPage, nextPage, page }: PaginationProps) => (
    <div className={classNames(s.Pagination, {}, [className])}>
        <Button onClick={previousPage} disabled={page === 1} theme={ButtonTheme.PRIMARY}>
            Предыдущая страница
        </Button>
        <Button onClick={nextPage} disabled={page === 3} theme={ButtonTheme.PRIMARY}>
            Следующая страница
        </Button>
    </div>
)
