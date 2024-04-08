import { classNames } from 'shared/lib/classNames'
import { useEffect, useRef, useState } from 'react'
import SearchSVG from 'shared/assets/icons/search.svg?react'
import { Input, InputTheme } from 'shared/ui/Input/Input'
import s from './Search.module.scss'

interface SearchProps {
    className?: string
}

export const Search = ({ className }: SearchProps) => {
    const [isSearch, setIsSearch] = useState(false)
    const searchRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsSearch(false)
            }
        }

        if (isSearch) {
            document.addEventListener('click', handleClickOutside)
        } else {
            document.removeEventListener('click', handleClickOutside)
        }

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [isSearch])

    const onToggleSearch = (event: any) => {
        event.stopPropagation()
        setIsSearch(true)
    }

    return (
        <div className={classNames(s.Search, {}, [className])}>
            <div className={s.search} ref={searchRef}>
                {isSearch ? (
                    <Input
                        className={s.input}
                        autoFocus
                        theme={InputTheme.PRIMARY}
                        type="text"
                        placeholder="Поиск по Email"
                    />
                ) : (
                    <SearchSVG style={{ cursor: 'pointer' }} onClick={onToggleSearch} />
                )}
            </div>
        </div>
    )
}
