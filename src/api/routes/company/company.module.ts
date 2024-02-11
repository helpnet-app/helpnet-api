import { Module } from "@nestjs/common";
import { CompanyController } from "./company.controller";
import { CompanySchema, CompanyService } from "src/api/services/company.service";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Company', schema: CompanySchema }])],
    controllers: [CompanyController],
    providers: [CompanyService],

})
export class CompanyModule {}

