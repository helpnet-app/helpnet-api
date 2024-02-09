import { User } from "src/domain/entities/User"

export interface UserToUpdateDto {
    id: string,
    userToUpdate: User
}