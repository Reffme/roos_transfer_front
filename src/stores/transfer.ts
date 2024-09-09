import { defineStore } from 'pinia'
import {transferOrderRequest} from "@/api/transfer";
import type {TransferRequest} from "@/models/TransferRequest";

export const useTransferStore = defineStore('transfer', () => {
  const createTransferOrder = async (data: TransferRequest) => {
    await transferOrderRequest(data)
  }

  return {
    createTransferOrder,
  }
})
