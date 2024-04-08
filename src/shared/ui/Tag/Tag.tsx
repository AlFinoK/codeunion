import { classNames } from 'shared/lib/classNames'
import { FC } from 'react'
import s from './Tag.module.scss'

interface TagProps {
    className?: string
    disabled?: boolean
    children?: string
}

export const Tag: FC<TagProps> = (props) => {
    const { className, children, ...otherProps }: TagProps = props

    return (
        <div className={classNames(s.Tag, {}, [className])} {...otherProps}>
            {children}
        </div>
    )
}
