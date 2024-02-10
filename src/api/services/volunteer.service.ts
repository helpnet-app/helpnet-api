import { Volunteer } from "src/domain/entities/Volunteer";
import { Injectable } from "@nestjs/common";
import { IVolunteerService } from "src/domain/ports/ivolunteer_service";

@Injectable()
export class VolunteerService implements IVolunteerService {
    volunteers: Volunteer[] = [];

    create(newVolunteer: Volunteer): Promise<Volunteer> {
        const createdVolunteer = { ...newVolunteer };
        this.volunteers.push(createdVolunteer);
        return Promise.resolve(createdVolunteer);
    }

    update(id: string, volunteerToUpdate: Volunteer): Promise<Volunteer> {
        const volunteerIndex = this.volunteers.findIndex(volunteer => volunteer.id === id);
        if (volunteerIndex !== -1) {
            this.volunteers[volunteerIndex] = { ...volunteerToUpdate };
            return Promise.resolve(this.volunteers[volunteerIndex]);
        }
        return Promise.reject(new Error("Volunteer not found"));
    }

    deleteById(id: string): Promise<Volunteer> {
        const volunteerIndex = this.volunteers.findIndex(volunteer => volunteer.id === id);
        if (volunteerIndex !== -1) {
            const deletedVolunteer = this.volunteers.splice(volunteerIndex, 1)[0];
            return Promise.resolve(deletedVolunteer);
        }
        return Promise.reject(new Error("Volunteer not found"));
    }

    findById(id: string): Promise<Volunteer> {
        const foundVolunteer = this.volunteers.find(volunteer => volunteer.id === id);
        if (foundVolunteer) {
            return Promise.resolve(foundVolunteer);
        }
        return Promise.reject(new Error("Volunteer not found"));
    }

    fetchAll(): Promise<Volunteer[]> {
        return Promise.resolve(this.volunteers);
    }
}
