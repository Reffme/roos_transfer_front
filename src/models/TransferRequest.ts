export interface TransferRequest {
    carType: string
    childSeats?: ChildSeatInfo
    comment?: string
    date: string
    from: string
    isExpressDelivery?: boolean
    isImmediate?: boolean
    personCount: number
    phoneNumber: string
    tableName?: string
    time: string
    to: string
}

export interface ChildSeatInfo {
    boosterSeatCount?: number
    childSeatCount?: number
    infantSeatCount?: number
    personSeatAvailable?: boolean
}