import type {DeliveryRequest} from "@/models/DeliveryRequest";
import service from "@/utils/request";

export const deliveryOrderRequest = (
    data: DeliveryRequest,
) =>
    service.post(
        'v1/delivery',
        data
    )
