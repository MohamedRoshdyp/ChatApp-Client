export interface ILogin {
    userName:string
    password:string
}

export interface User{
    userName:string
    email:string
    token:string
    photoUrl:string
    gender:string
    roles:string[]
}