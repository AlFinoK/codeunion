import { useTheme } from 'app/providers/ThemeProvider'
import { classNames } from 'shared/lib/classNames'
import { Sidebar } from 'widgets/Sidebar'
import { Suspense } from 'react'
import { PageLoader } from 'widgets/PageLoader'
import { AppRouter } from './providers/router'

export const App = () => {
    const { theme } = useTheme()

    return (
        <div className={classNames('app', {}, [theme])}>
            <Suspense fallback={<PageLoader />}>
                <div className="inner">
                    <Sidebar />
                    <div className="content">
                        <div className="content-inner">
                            <AppRouter />
                        </div>
                    </div>
                </div>
            </Suspense>
        </div>
    )
}
