

export interface PaymentVisaDataResponse {
    status: string
    session: PaymentVisaData
}

export interface PaymentVisaData {
    url: string
    success_url: string
    cancel_url: string
}
