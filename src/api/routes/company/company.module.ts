import { Module } from "@nestjs/common";
import { CompanyController } from "./company.controller";
import { CompanyService } from "src/api/services/company.service";

@Module({
    controllers: [CompanyController],
    providers: [CompanyService],

})
export class CompanyModule {}

