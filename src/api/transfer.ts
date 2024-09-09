import service from "@/utils/request";
import type {TransferRequest} from "@/models/TransferRequest";

export const transferOrderRequest = (
    data: TransferRequest,
) =>
    service.post(
        'v1/transfer',
        data
    )
