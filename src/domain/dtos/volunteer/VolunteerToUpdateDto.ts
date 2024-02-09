import { UserToUpdateDto } from "../user/UserToUpdateDto";
import { Volunteer } from "src/domain/entities/Volunteer";

export interface VolunteerToUpdateDto extends UserToUpdateDto {
    userToUpdate: Volunteer;
}
