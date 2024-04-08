import { classNames } from 'shared/lib/classNames'
import s from './MyAccountPage.module.scss'

interface MyAccountPageProps {
    className?: string
}

export const MyAccountPage = ({ className }: MyAccountPageProps) => (
    <div className={classNames(s.MyAccountPage, {}, [className])}>My account</div>
)
