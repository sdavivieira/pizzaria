import { Request, Response } from "express";
import { ListOrdersService } from "../../services/order/ListOrdersService";

class ListOrdersController{
  async handle(req: Request, res: Response){
    const listordersService = new ListOrdersService()

    const orders = await listordersService.execute();

    return res.json(orders)
  }
}
export{ListOrdersController}