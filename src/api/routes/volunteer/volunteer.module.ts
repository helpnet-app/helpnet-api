import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VolunteerSchema } from 'src/api/schemas/volunteer.schema';
import { VolunteerService } from 'src/api/services/volunteer.service';
import { VolunteerController } from './volunteer.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Volunteer', schema: VolunteerSchema }]),
  ],
  controllers: [VolunteerController],
  providers: [VolunteerService],
  exports: [VolunteerService],
})
export class VolunteerModule {}
