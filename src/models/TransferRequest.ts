export interface TransferRequest {
    carType: string
    additionalServices?: AdditionalServicesInfo
    comment?: string
    date: string
    from: string
    isExpressDelivery?: boolean
    isImmediate?: boolean
    personCount: number
    luggageCount: number
    phoneNumber: string
    tableName?: string
    time: string
    to: string
}

export interface AdditionalServicesInfo {
    boosterSeatCount?: number
    childSeatCount?: number
    infantSeatCount?: number
    personSeatAvailable?: boolean
    dogCarrierCount?: number
    dogMatCount?: number
    ownDogCarrier?: boolean
}