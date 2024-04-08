export interface IUser {
    name: string
    id: string
    email?: string
    permissions?: string
    image?: string
}

export interface UserSchema {
    userData?: IUser[]
    isLoading?: boolean
    error?: string
}
