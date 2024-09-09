import { CarType} from "@/models/CarType";
import type {Car} from "@/models/CarType";

export const carsOptions: Car[] = [
    {
     type: CarType.Economy,
        passenger: 3,
        baggage: 3,
    },
    {
        type: CarType.Comfort,
        passenger: 3,
        baggage: 3,
    },
    {
        type: CarType.ComfortPlus,
        passenger: 3,
        baggage: 3,
    },
    {
        type: CarType.Business,
        passenger: 3,
        baggage: 3,
    },
    {
        type: CarType.Premium,
        passenger: 3,
        baggage: 3,
    },
    {
        type: CarType.VIP,
        passenger: 3,
        baggage: 3,
    },
    {
        type: CarType.SUV,
        passenger: 4,
        baggage: 4,
    },
    {
        type: CarType.Minivan,
        passenger: 4,
        baggage: 4,
    },
    {
        type: CarType.CompactMinivan,
        passenger: 8,
        baggage: 6,
    },
    {
        type: CarType.Minibus,
        passenger: 16,
        baggage: 16,
    },
    {
        type: CarType.Bus,
        passenger: 50,
        baggage: 50,
    },
]