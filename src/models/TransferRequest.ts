export interface TransferRequest {
    carType: string
    childSeats?: ChildSeatInfo
    comment?: string
    date: string
    from: string
    personCount: number
    phoneNumber: string
    time: string
    to: string
}

export interface ChildSeatInfo {
    boosterSeatCount?: number
    childSeatCount?: number
    infantSeatCount?: number
    personSeatAvailable?: boolean
}