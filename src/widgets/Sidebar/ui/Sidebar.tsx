import { useState } from 'react'
import { classNames } from 'shared/lib/classNames'
import { ThemeSwitcher } from 'features/ThemeSwitcher'
import Chevron from 'shared/assets/icons/chevron.svg?react'
import { RoutePath } from 'shared/config/routeConfig'
import { Link } from 'react-router-dom'
import Logo from 'shared/assets/icons/logo.svg?react'
import Profile from 'shared/assets/icons/profile.svg?react'
import Unauthuser from 'shared/assets/icons/unauthuser.png'
import Images from 'shared/assets/icons/images.svg?react'
import Burger from 'shared/assets/icons/burger.svg?react'
import Dollar from 'shared/assets/icons/dollar.svg?react'
import Money from 'shared/assets/icons/money.svg?react'
import Logout from 'shared/assets/icons/logout.svg?react'
import s from './Sidebar.module.scss'

interface SidebarProps {
    className?: string
}

export const Sidebar = ({ className }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false)
    const [mobileSidebar, setMobileSidebar] = useState(false)

    const handleCollapsed = () => {
        setCollapsed((prev) => !prev)
    }
    const toggleMobileSidebar = () => {
        setMobileSidebar((prev) => !prev)
    }

    return (
        <div
            className={classNames(s.Sidebar, { [s.collapsed]: collapsed, [s.mobileSidebar]: mobileSidebar }, [
                className,
            ])}
        >
            <div className={s.inner}>
                <div className={s.burger}>
                    <Burger className={s.burger} onClick={toggleMobileSidebar} />
                </div>
                <Link to={RoutePath.main} className={s.logo}>
                    <Logo />
                </Link>
                <div className={s.avatar}>
                    <img src={Unauthuser} alt="" />
                </div>
                <div className={s.links}>
                    <div className={s.link}>
                        <Link to={RoutePath.my_account}>
                            <Profile />
                        </Link>
                    </div>
                    <div className={s.link}>
                        <Link to={RoutePath.main}>
                            <Images />
                        </Link>
                    </div>
                    <div className={s.link}>
                        <Link to={RoutePath.main}>
                            <Dollar />
                        </Link>
                    </div>
                    <div className={s.link}>
                        <Link to={RoutePath.main}>
                            <Money />
                        </Link>
                    </div>
                    <div className={s.link}>
                        <Link to={RoutePath.main}>
                            <Logout />
                        </Link>
                    </div>
                </div>

                <div className={s.chevron} onClick={handleCollapsed}>
                    <Chevron />
                </div>
                <div className={s.ThemeSwitcher}>
                    <ThemeSwitcher />
                </div>
            </div>
        </div>
    )
}
