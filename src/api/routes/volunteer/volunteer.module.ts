import { Module } from "@nestjs/common";
import { VolunteerController } from "./volunteer.controller";
import { VolunteerService } from "src/api/services/volunteer.service";

@Module({
    controllers: [VolunteerController],
    providers: [VolunteerService],
})

export class VolunteerModule {}