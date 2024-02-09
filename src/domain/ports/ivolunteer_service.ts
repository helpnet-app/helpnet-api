import { IUserService } from "./iuser_service";
import { Volunteer } from "../entities/Volunteer";

export interface IVolunteerService extends IUserService{
    create(newVolunteer: Volunteer): Promise<Volunteer>
    update(id: string, volunteerToUpdate: Volunteer): Promise<Volunteer>;
    deleteById(id: string): Promise<Volunteer>;
    findById(id: string): Promise<Volunteer>;
    fetchAll(): Promise<Volunteer[]>;
}