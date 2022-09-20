import { Request, Response } from "express";
import { ListSpecificationUseCase } from "./ListSpecificationsUseCase";

class ListSpecificationsControlle {

  constructor(private listSpecificationsUseCase: ListSpecificationUseCase) {}
  
  handle(request: Request, response: Response): Response {
    const listAllSpecifications = this.listSpecificationsUseCase.execute();

    return response.json(listAllSpecifications);
  }
};

export { ListSpecificationsControlle };