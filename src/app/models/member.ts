import { Photo } from "./Photo"

export interface Member {
    id: string
    userName: string
    age: number
    photoUrl: string
    knownAs: string
    created: Date
    lastActive: Date
    gender: string
    introduction: string
    lookingFor: string
    interests: string
    city: string
    country: string
    photos: Photo[]
}

export interface updateMember {
    introduction: string
    lookingFor: string
    country: string
    city: string
    interests: string
  }