import { useEffect, useState } from 'react'
import { User } from 'entities/User/ui/User'
import { Loader } from 'shared/ui/Loader'
import { userAPI } from 'entities/User/model/services/userAPI'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { Pagination } from 'shared/ui/Pagination/Pagination'
import { Navbar } from 'widgets/Navbar'

export const UsersPage = () => {
    const [page, setPage] = useState(1)
    const { data: users, error, isLoading, refetch } = userAPI.useFetchUserDataQuery(page)

    const nextPage = () => {
        setPage(page + 1)
    }

    const previousPage = () => {
        if (page > 1) {
            setPage(page - 1)
        }
    }

    useEffect(() => {
        refetch()
        window.scrollTo(0, 0)
    }, [refetch])

    return (
        <>
            <Navbar />
            <div style={{ color: 'var(--primary-color)' }}>
                {isLoading && <Loader />}
                {error && (
                    <>
                        <span style={{ color: 'red', marginRight: '2rem' }}>{`Error is: ${error}`}</span>
                        <Button onClick={refetch} theme={ButtonTheme.PRIMARY}>
                            Запросить данные еще раз
                        </Button>
                    </>
                )}
                {users && users.map((userData) => <User userData={userData} key={userData.email} />)}

                <div>
                    <Pagination previousPage={previousPage} nextPage={nextPage} page={page} />
                </div>
            </div>
        </>
    )
}
