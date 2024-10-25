import dayjs from "dayjs";

export enum ECheckStatus {
    Open = "Open",
    Closed = "Closed",
    Pending = "Pending"
}


export interface ICheckData {
    vendor: string;
    payPeriod: string;
    number: string;
    checkAmount: string;
    status: ECheckStatus;
    receivedDate: dayjs.Dayjs | null;
    payDate: dayjs.Dayjs | null;
    commissionAmount: string;
    statementGroup: string;
    additionalDetails?: string;

}