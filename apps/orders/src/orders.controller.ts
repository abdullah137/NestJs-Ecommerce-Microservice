import { Controller, Body, Req, Post, UseGuards, Get } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '@app/common';
import { CreateOrderRequest } from './dtos/create-order.request';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createOrder(@Body() request: CreateOrderRequest, @Req() req: any) {
    return this.ordersService.createOrder(request, req.cookies?.Authentication);
  }

  @Get()
  getOrders() {
    return this.ordersService.getOrders();
  }
}
