import { defineStore } from 'pinia'

import {deliveryOrderRequest} from "@/api/delivery";
import type {DeliveryRequest} from "@/models/DeliveryRequest";

export const useDeliveryStore = defineStore('delivery', () => {
  const createDeliveryOrder = async (data: DeliveryRequest) => {
    await deliveryOrderRequest(data)
  }

  return {
    createDeliveryOrder,
  }
})
