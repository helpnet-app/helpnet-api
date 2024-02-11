import { Module } from "@nestjs/common";
import { VolunteerController } from "./volunteer.controller";
import { VolunteerSchema, VolunteerService } from "src/api/services/volunteer.service";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports: [MongooseModule.forFeature([{name: 'Volunteer', schema: VolunteerSchema}])],
    controllers: [VolunteerController],
    providers: [VolunteerService],
})

export class VolunteerModule {}