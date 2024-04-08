import { classNames } from 'shared/lib/classNames'
import { Link } from 'react-router-dom'
import { RoutePath } from 'shared/config/routeConfig'
import { Tag } from 'shared/ui/Tag/Tag'
import { OverflowMenu } from 'widgets/OverflowMenu'
import s from './User.module.scss'
import { IUser } from '../model/types/user'
import { userAPI } from '../model/services/userAPI'
import { Loader } from 'shared/ui/Loader'

interface UserProps {
    className?: string
    userData: IUser
}

export const User = (props: UserProps) => {
    const { className, userData } = props
    const [updateUser, { error: updateError, isLoading: updateIsLoading }] = userAPI.useUpdateUserMutation()
    const [deleteUser, { error: deleteError, isLoading: deleteIsLoading }] = userAPI.useDeleteUserMutation()

    const handleRemove = (user: IUser) => {
        deleteUser(user)
    }

    const handleUpdate = (user: IUser) => {
        updateUser(user)
    }
    return (
        <div className={classNames(s.User, {}, [className])}>
            {deleteError && <span className={s.deleteError}>ERROR TO DELETE USER</span>}
            {deleteIsLoading && <Loader />}
            {updateError && <span className={s.updateError}>ERROR TO UPDATE USER</span>}
            {updateIsLoading && <Loader />}
            <Link to={RoutePath.main} className={s.userLeft}>
                <div className={s.img}>
                    <img src={userData.image} alt="logo" />
                </div>
                <div className={s.userInfo}>
                    <div className={s.info}>
                        <div className={s.name}>{userData.name}</div>
                        <div className={s.email}>{userData.email}</div>
                    </div>
                    <div className={s.tags}>
                        <Tag>{userData.permissions}</Tag>
                    </div>
                </div>
            </Link>
            <div className={s.userRight}>
                <OverflowMenu remove={handleRemove} update={handleUpdate} key={userData.name} userData={userData} />
            </div>
        </div>
    )
}
