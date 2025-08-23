export interface Transaction {
    id: string; // "d49137b4-8a62-4fce-a794-9daf6216781a"
    amount: number;
    card: "visa" | "mastercard" | "amex";
    installments: number;
    createdAt: string; // "2025-01-01T11:48:55Z"
    updatedAt: string; // "2025-01-01T12:11:55Z"
    paymentMethod: keyof typeof PaymentMethod;
}

export enum PaymentMethod {
    link = "Link de Pago",
    qr = "Código QR",
    mpos = "mPOS",
    pospro = "POS Pro",
}
