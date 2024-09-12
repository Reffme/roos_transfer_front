export interface Car {
    type: CarType
    passenger: number
    baggage: number

}
export enum CarType {
    Economy ="Эконом",
    Comfort="Комфорт",
    ComfortPlus ="Комфорт+",
    Business="Бизнес",
    Premium="Премиум",
    VIP="VIP",
    SUV="Внедорожник",
    Minivan="Минивэн",
    CompactMinivan="компакт вэн",
    Minibus="Микроавтобус",
    Bus="Автобус",
}