interface Purchaser {
    id?: string;
    companyName?: string;
}

interface Vendor {
    id?: string;
    label?: string;
}

interface Source {
    id?: string;
    label?: string;
}

interface Representative {
    name?: string;
}

export interface Orders {
    offset: number;
    total: number;
    results: Order[];
}

export interface Order {
    purchaser?: Purchaser;
    vendor?: Vendor;
    showCode?: Record<string, unknown>; // Adjust the type based on the actual structure
    source?: Source;
    salesRep?: Record<string, unknown>; // Adjust as needed
    currentRep?: Representative;
    writingRep?: Representative;
    paymentTerm?: Record<string, unknown>; // Adjust as needed
    id?: string;
    companyName?: string;
    retailerId?: string;
    purchaseOrder?: string;
    orderedOn?: string; // Consider using Date type if parsing is needed
    shipOn?: string; // Consider using Date type if parsing is needed
    expectedToClear?: string; // Consider using Date type if parsing is needed
    timeStampOn?: string; // Consider using Date type if parsing is needed
    grandTotal?: number;
    openTotal?: number;
    shippedTotal?: number;
    shippedAmount?: number;
    checkAmount?: number;
    balance?: number;
    vendorId?: string;
    vendorLabel?: string;
    status?: string;
    subTotal?: number;
    promoDiscount?: number;
    parcelCount?: number;
    changeCount?: number;
    pendingChangeCount?: number;
    approvedChangeCount?: number;
    declinedChangeCount?: number;
    currentRepName?: string;
    writingRepName?: string;
    orderSourceLabel?: string;
    shipCity?: string;
    shipState?: string;
    retailerIsCreditHold?: boolean;
    exported?: boolean;
    uploaded?: boolean;
    generatedFrom?: string;
    isEmunOrder?: boolean;
    stage?: string;
    canEdit?: boolean;
    reviewReason?: string;
    cancelOn?: string; // Consider using Date type if parsing is needed
    discountPercentage?: number;
    backorderTotal?: number;
    shippableTotal?: number;
    isCorpModified?: boolean;
    hasNotes?: boolean;
}

export const ordersMock: Orders = {
    "offset": 0,
    "total": 101376,
    "results": [
        {
            "purchaser": {
                "id": "100019962",
                "companyName": "MINT JULEP"
            },
            "vendor": {
                "id": "148",
                "label": "Mary Square"
            },
            "showCode": {},
            "source": {
                "id": "DIRECT",
                "label": "DIRECT"
            },
            "salesRep": {},
            "currentRep": {
                "name": "SUSAN FINLEY"
            },
            "writingRep": {
                "name": "SUSAN FINLEY"
            },
            "paymentTerm": {},
            "id": "OC-1591339",
            "companyName": "MINT JULEP",
            "retailerId": "100019962",
            "purchaseOrder": "0000906",
            "orderedOn": "2024-10-31T00:00:00.0000000Z",
            "shipOn": "2024-10-07T09:10:46.4030000Z",
            "expectedToClear": "0001-01-01T00:00:00.0000000Z",
            "timeStampOn": "0001-01-01T00:00:00.0000000Z",
            "grandTotal": 0,
            "openTotal": 0,
            "shippedTotal": 0,
            "shippedAmount": 0,
            "checkAmount": 0,
            "balance": 0,
            "vendorId": "148",
            "vendorLabel": "Mary Square",
            "status": "Completed",
            "subTotal": 0,
            "promoDiscount": 0,
            "parcelCount": 0,
            "changeCount": 0,
            "pendingChangeCount": 0,
            "approvedChangeCount": 0,
            "declinedChangeCount": 0,
            "currentRepName": "SUSAN FINLEY",
            "writingRepName": "SUSAN FINLEY",
            "orderSourceLabel": "DIRECT",
            "shipCity": "TALLADEGA",
            "shipState": "AL",
            "retailerIsCreditHold": false,
            "exported": false,
            "uploaded": false,
            "generatedFrom": "",
            "isEmunOrder": true,
            "stage": "EMUN",
            "canEdit": true,
            "reviewReason": "",
            "cancelOn": "0001-01-01T00:00:00.0000000Z",
            "discountPercentage": 0,
            "backorderTotal": 0,
            "shippableTotal": 0,
            "isCorpModified": false,
            "hasNotes": false
        },
        {
            "purchaser": {
                "id": "OC-241746_919",
                "companyName": "On The Corner Gifts"
            },
            "vendor": {
                "id": "151",
                "label": "Caren"
            },
            "showCode": {},
            "source": {
                "id": "DIRECT",
                "label": "DIRECT"
            },
            "salesRep": {},
            "currentRep": {
                "name": "RACHEL DAVIS"
            },
            "writingRep": {
                "name": "RACHEL DAVIS"
            },
            "paymentTerm": {},
            "id": "OC-1590056",
            "companyName": "On The Corner Gifts",
            "retailerId": "OC-241746_919",
            "purchaseOrder": "001",
            "orderedOn": "2024-10-31T00:00:00.0000000Z",
            "shipOn": "2024-10-01T08:14:31.6670000Z",
            "expectedToClear": "0001-01-01T00:00:00.0000000Z",
            "timeStampOn": "0001-01-01T00:00:00.0000000Z",
            "grandTotal": 0,
            "openTotal": 0,
            "shippedTotal": 0,
            "shippedAmount": 0,
            "checkAmount": 0,
            "balance": 0,
            "vendorId": "151",
            "vendorLabel": "Caren",
            "status": "Completed",
            "subTotal": 0,
            "promoDiscount": 0,
            "parcelCount": 0,
            "changeCount": 0,
            "pendingChangeCount": 0,
            "approvedChangeCount": 0,
            "declinedChangeCount": 0,
            "currentRepName": "RACHEL DAVIS",
            "writingRepName": "RACHEL DAVIS",
            "orderSourceLabel": "DIRECT",
            "shipCity": "Berryville",
            "shipState": "AR",
            "retailerIsCreditHold": false,
            "exported": false,
            "uploaded": false,
            "generatedFrom": "",
            "isEmunOrder": true,
            "stage": "EMUN",
            "canEdit": true,
            "reviewReason": "",
            "cancelOn": "0001-01-01T00:00:00.0000000Z",
            "discountPercentage": 0,
            "backorderTotal": 0,
            "shippableTotal": 0,
            "isCorpModified": false,
            "hasNotes": false
        },
        {
            "purchaser": {
                "id": "OC-411852",
                "companyName": "STITCHES CLOTHING CO."
            },
            "vendor": {
                "id": "118",
                "label": "Jane Marie"
            },
            "showCode": {},
            "source": {
                "id": "DIRECT",
                "label": "DIRECT"
            },
            "salesRep": {},
            "currentRep": {
                "name": "RAMON FLORES"
            },
            "writingRep": {
                "name": "RAMON FLORES"
            },
            "paymentTerm": {},
            "id": "OC-1589683",
            "companyName": "STITCHES CLOTHING CO.",
            "retailerId": "OC-411852",
            "purchaseOrder": "0123",
            "orderedOn": "2024-10-31T00:00:00.0000000Z",
            "shipOn": "2024-09-27T07:09:49.6370000Z",
            "expectedToClear": "0001-01-01T00:00:00.0000000Z",
            "timeStampOn": "0001-01-01T00:00:00.0000000Z",
            "grandTotal": 0,
            "openTotal": 0,
            "shippedTotal": 0,
            "shippedAmount": 0,
            "checkAmount": 0,
            "balance": 0,
            "vendorId": "118",
            "vendorLabel": "Jane Marie",
            "status": "Completed",
            "subTotal": 0,
            "promoDiscount": 0,
            "parcelCount": 0,
            "changeCount": 0,
            "pendingChangeCount": 0,
            "approvedChangeCount": 0,
            "declinedChangeCount": 0,
            "currentRepName": "RAMON FLORES",
            "writingRepName": "RAMON FLORES",
            "orderSourceLabel": "DIRECT",
            "shipCity": "Sparks",
            "shipState": "NV",
            "retailerIsCreditHold": false,
            "exported": false,
            "uploaded": false,
            "generatedFrom": "",
            "isEmunOrder": true,
            "stage": "EMUN",
            "canEdit": true,
            "reviewReason": "",
            "cancelOn": "0001-01-01T00:00:00.0000000Z",
            "discountPercentage": 0,
            "backorderTotal": 0,
            "shippableTotal": 0,
            "isCorpModified": false,
            "hasNotes": false
        },
        {
            "purchaser": {
                "id": "OC-205660",
                "companyName": "BIG BRONCO"
            },
            "vendor": {
                "id": "118",
                "label": "Jane Marie"
            },
            "showCode": {},
            "source": {
                "id": "DIRECT",
                "label": "DIRECT"
            },
            "salesRep": {},
            "currentRep": {
                "name": "COLLEEN HEISTAND"
            },
            "writingRep": {
                "name": "COLLEEN HEISTAND"
            },
            "paymentTerm": {},
            "id": "OC-1589671",
            "companyName": "BIG BRONCO",
            "retailerId": "OC-205660",
            "purchaseOrder": "027138",
            "orderedOn": "2024-10-31T00:00:00.0000000Z",
            "shipOn": "2024-09-27T06:26:13.4600000Z",
            "expectedToClear": "0001-01-01T00:00:00.0000000Z",
            "timeStampOn": "0001-01-01T00:00:00.0000000Z",
            "grandTotal": 0,
            "openTotal": 0,
            "shippedTotal": 0,
            "shippedAmount": 0,
            "checkAmount": 0,
            "balance": 0,
            "vendorId": "118",
            "vendorLabel": "Jane Marie",
            "status": "Completed",
            "subTotal": 0,
            "promoDiscount": 0,
            "parcelCount": 0,
            "changeCount": 0,
            "pendingChangeCount": 0,
            "approvedChangeCount": 0,
            "declinedChangeCount": 0,
            "currentRepName": "COLLEEN HEISTAND",
            "writingRepName": "COLLEEN HEISTAND",
            "orderSourceLabel": "DIRECT",
            "shipCity": "Cave Creek",
            "shipState": "AZ",
            "retailerIsCreditHold": false,
            "exported": false,
            "uploaded": false,
            "generatedFrom": "",
            "isEmunOrder": true,
            "stage": "EMUN",
            "canEdit": true,
            "reviewReason": "",
            "cancelOn": "0001-01-01T00:00:00.0000000Z",
            "discountPercentage": 0,
            "backorderTotal": 0,
            "shippableTotal": 0,
            "isCorpModified": false,
            "hasNotes": false
        },
        {
            "purchaser": {
                "id": "OC-283014_966",
                "companyName": "BAYLOR SCOTT & WHITE MEDICAL CENTER-BRENHAM"
            },
            "vendor": {
                "id": "118",
                "label": "Jane Marie"
            },
            "showCode": {},
            "source": {
                "id": "DIRECT",
                "label": "DIRECT"
            },
            "salesRep": {},
            "currentRep": {
                "name": "ANJIE SIMMONS"
            },
            "writingRep": {
                "name": "ANJIE SIMMONS"
            },
            "paymentTerm": {},
            "id": "OC-1589395",
            "companyName": "BAYLOR SCOTT & WHITE MEDICAL CENTER-BRENHAM",
            "retailerId": "OC-283014_966",
            "purchaseOrder": "027259",
            "orderedOn": "2024-10-31T00:00:00.0000000Z",
            "shipOn": "2024-09-26T06:59:03.5800000Z",
            "expectedToClear": "0001-01-01T00:00:00.0000000Z",
            "timeStampOn": "0001-01-01T00:00:00.0000000Z",
            "grandTotal": 0,
            "openTotal": 0,
            "shippedTotal": 0,
            "shippedAmount": 0,
            "checkAmount": 0,
            "balance": 0,
            "vendorId": "118",
            "vendorLabel": "Jane Marie",
            "status": "Completed",
            "subTotal": 0,
            "promoDiscount": 0,
            "parcelCount": 0,
            "changeCount": 0,
            "pendingChangeCount": 0,
            "approvedChangeCount": 0,
            "declinedChangeCount": 0,
            "currentRepName": "ANJIE SIMMONS",
            "writingRepName": "ANJIE SIMMONS",
            "orderSourceLabel": "DIRECT",
            "shipCity": "BRENHAM",
            "shipState": "TX",
            "retailerIsCreditHold": false,
            "exported": false,
            "uploaded": false,
            "generatedFrom": "",
            "isEmunOrder": true,
            "stage": "EMUN",
            "canEdit": true,
            "reviewReason": "",
            "cancelOn": "0001-01-01T00:00:00.0000000Z",
            "discountPercentage": 0,
            "backorderTotal": 0,
            "shippableTotal": 0,
            "isCorpModified": false,
            "hasNotes": false
        },
        {
            "purchaser": {
                "id": "263000200",
                "companyName": "GOLDSMITH'S"
            },
            "vendor": {
                "id": "159",
                "label": "The Gift Wrap Company"
            },
            "showCode": {},
            "source": {
                "id": "DIRECT",
                "label": "DIRECT"
            },
            "salesRep": {},
            "currentRep": {
                "name": "JULIANA GILIBERTO"
            },
            "writingRep": {
                "name": "JULIANA GILIBERTO"
            },
            "paymentTerm": {},
            "id": "OC-1588955",
            "companyName": "GOLDSMITH'S",
            "retailerId": "263000200",
            "purchaseOrder": "04232024",
            "orderedOn": "2024-10-31T00:00:00.0000000Z",
            "shipOn": "2024-09-24T09:49:44.5870000Z",
            "expectedToClear": "0001-01-01T00:00:00.0000000Z",
            "timeStampOn": "0001-01-01T00:00:00.0000000Z",
            "grandTotal": 0,
            "openTotal": 0,
            "shippedTotal": 0,
            "shippedAmount": 0,
            "checkAmount": 0,
            "balance": 0,
            "vendorId": "159",
            "vendorLabel": "The Gift Wrap Company",
            "status": "Completed",
            "subTotal": 0,
            "promoDiscount": 0,
            "parcelCount": 0,
            "changeCount": 0,
            "pendingChangeCount": 0,
            "approvedChangeCount": 0,
            "declinedChangeCount": 0,
            "currentRepName": "JULIANA GILIBERTO",
            "writingRepName": "JULIANA GILIBERTO",
            "orderSourceLabel": "DIRECT",
            "shipCity": "GREENPORT",
            "shipState": "NY",
            "retailerIsCreditHold": false,
            "exported": false,
            "uploaded": false,
            "generatedFrom": "",
            "isEmunOrder": true,
            "stage": "EMUN",
            "canEdit": true,
            "reviewReason": "",
            "cancelOn": "0001-01-01T00:00:00.0000000Z",
            "discountPercentage": 0,
            "backorderTotal": 0,
            "shippableTotal": 0,
            "isCorpModified": false,
            "hasNotes": false
        },
        {
            "purchaser": {
                "id": "OC-279364",
                "companyName": "A Bushel And A Peck"
            },
            "vendor": {
                "id": "141",
                "label": "Bridgewater Candle Company"
            },
            "showCode": {},
            "source": {
                "id": "WEB-ONECOAST.COM",
                "label": "WEB-ONECOAST.COM"
            },
            "salesRep": {},
            "currentRep": {
                "name": "CHRISTINE PETRI"
            },
            "writingRep": {},
            "paymentTerm": {},
            "id": "OC-1595073",
            "companyName": "A Bushel And A Peck",
            "retailerId": "OC-279364",
            "purchaseOrder": "OC-1595073",
            "orderedOn": "2024-10-23T00:00:00.0000000Z",
            "shipOn": "2024-10-24T00:00:00.0000000Z",
            "expectedToClear": "0001-01-01T00:00:00.0000000Z",
            "timeStampOn": "0001-01-01T00:00:00.0000000Z",
            "grandTotal": 191.85,
            "openTotal": 191.85,
            "shippedTotal": 0,
            "shippedAmount": 0,
            "checkAmount": 0,
            "balance": 0,
            "vendorId": "141",
            "vendorLabel": "Bridgewater Candle Company",
            "status": "Cart",
            "subTotal": 0,
            "promoDiscount": 0,
            "parcelCount": 0,
            "changeCount": 0,
            "pendingChangeCount": 0,
            "approvedChangeCount": 0,
            "declinedChangeCount": 0,
            "currentRepName": "CHRISTINE PETRI",
            "orderSourceLabel": "WEB-ONECOAST.COM",
            "shipCity": "DEVINE",
            "shipState": "TX",
            "retailerIsCreditHold": false,
            "exported": false,
            "uploaded": false,
            "generatedFrom": "B2B",
            "isEmunOrder": true,
            "stage": "EMUN",
            "canEdit": true,
            "cancelOn": "0001-01-01T00:00:00.0000000Z",
            "discountPercentage": 0,
            "backorderTotal": 0,
            "shippableTotal": 0,
            "isCorpModified": false,
            "hasNotes": false
        },
        {
            "purchaser": {
                "id": "OC-405204_Showroom",
                "companyName": "Fox in the henhouse gifts"
            },
            "vendor": {
                "id": "149",
                "label": "Michelle McDowell"
            },
            "showCode": {},
            "source": {
                "id": "WEB-ONECOAST.COM",
                "label": "WEB-ONECOAST.COM"
            },
            "salesRep": {},
            "currentRep": {
                "name": "SUSAN FINLEY"
            },
            "writingRep": {},
            "paymentTerm": {},
            "id": "OC-1592552",
            "companyName": "Fox in the henhouse gifts",
            "retailerId": "OC-405204_Showroom",
            "purchaseOrder": "OC-1592552",
            "orderedOn": "2024-10-23T00:00:00.0000000Z",
            "shipOn": "2024-10-24T00:00:00.0000000Z",
            "expectedToClear": "0001-01-01T00:00:00.0000000Z",
            "timeStampOn": "0001-01-01T00:00:00.0000000Z",
            "grandTotal": 192,
            "openTotal": 192,
            "shippedTotal": 0,
            "shippedAmount": 0,
            "checkAmount": 0,
            "balance": 192,
            "vendorId": "149",
            "vendorLabel": "Michelle McDowell",
            "status": "Open",
            "subTotal": 0,
            "promoDiscount": 0,
            "parcelCount": 0,
            "changeCount": 0,
            "pendingChangeCount": 0,
            "approvedChangeCount": 0,
            "declinedChangeCount": 0,
            "currentRepName": "SUSAN FINLEY",
            "orderSourceLabel": "WEB-ONECOAST.COM",
            "shipCity": "Gordo",
            "shipState": "AL",
            "retailerIsCreditHold": false,
            "exported": false,
            "uploaded": false,
            "generatedFrom": "B2B",
            "isEmunOrder": true,
            "stage": "EMUN",
            "canEdit": true,
            "reviewReason": "",
            "cancelOn": "0001-01-01T00:00:00.0000000Z",
            "discountPercentage": 0,
            "backorderTotal": 0,
            "shippableTotal": 0,
            "isCorpModified": false,
            "hasNotes": false
        },
        {
            "purchaser": {
                "id": "OC-388305",
                "companyName": "Crown Ace Hardware #9113"
            },
            "vendor": {
                "id": "4",
                "label": "Woodstock Chimes"
            },
            "showCode": {},
            "source": {
                "id": "ROAD",
                "label": "ROAD"
            },
            "salesRep": {},
            "currentRep": {
                "name": "LAURIE BAILIE"
            },
            "writingRep": {
                "name": "LAURIE BAILIE"
            },
            "paymentTerm": {},
            "id": "OC-1595074",
            "companyName": "Crown Ace Hardware #9113",
            "retailerId": "OC-388305",
            "purchaseOrder": "",
            "orderedOn": "2024-10-22T00:00:00.0000000Z",
            "shipOn": "2024-10-23T00:00:00.0000000Z",
            "expectedToClear": "0001-01-01T00:00:00.0000000Z",
            "timeStampOn": "0001-01-01T00:00:00.0000000Z",
            "grandTotal": 951,
            "openTotal": 951,
            "shippedTotal": 0,
            "shippedAmount": 0,
            "checkAmount": 0,
            "balance": 0,
            "vendorId": "4",
            "vendorLabel": "Woodstock Chimes",
            "status": "Cart",
            "subTotal": 0,
            "promoDiscount": 0,
            "parcelCount": 0,
            "changeCount": 0,
            "pendingChangeCount": 0,
            "approvedChangeCount": 0,
            "declinedChangeCount": 0,
            "currentRepName": "LAURIE BAILIE",
            "writingRepName": "LAURIE BAILIE",
            "orderSourceLabel": "ROAD",
            "shipCity": "Calistoga",
            "shipState": "CA",
            "retailerIsCreditHold": false,
            "exported": false,
            "uploaded": false,
            "generatedFrom": "EMUN1-W",
            "isEmunOrder": true,
            "stage": "EMUN",
            "canEdit": true,
            "cancelOn": "0001-01-01T00:00:00.0000000Z",
            "discountPercentage": 0,
            "backorderTotal": 0,
            "shippableTotal": 0,
            "isCorpModified": false,
            "hasNotes": false
        },
        {
            "purchaser": {
                "id": "OC-400926_Showroom",
                "companyName": "Never Enough"
            },
            "vendor": {
                "id": "148",
                "label": "Mary Square"
            },
            "showCode": {},
            "source": {
                "id": "ROAD",
                "label": "ROAD"
            },
            "salesRep": {},
            "currentRep": {
                "name": "KRISTI MAESAKA"
            },
            "writingRep": {
                "name": "KRISTI MAESAKA"
            },
            "paymentTerm": {},
            "id": "OC-1595072",
            "companyName": "Never Enough",
            "retailerId": "OC-400926_Showroom",
            "purchaseOrder": "",
            "orderedOn": "2024-10-22T00:00:00.0000000Z",
            "shipOn": "2024-10-23T00:00:00.0000000Z",
            "expectedToClear": "0001-01-01T00:00:00.0000000Z",
            "timeStampOn": "0001-01-01T00:00:00.0000000Z",
            "grandTotal": 3260,
            "openTotal": 3260,
            "shippedTotal": 0,
            "shippedAmount": 0,
            "checkAmount": 0,
            "balance": 0,
            "vendorId": "148",
            "vendorLabel": "Mary Square",
            "status": "On Hold",
            "subTotal": 0,
            "promoDiscount": 0,
            "parcelCount": 0,
            "changeCount": 0,
            "pendingChangeCount": 0,
            "approvedChangeCount": 0,
            "declinedChangeCount": 0,
            "currentRepName": "KRISTI MAESAKA",
            "writingRepName": "KRISTI MAESAKA",
            "orderSourceLabel": "ROAD",
            "shipCity": "Saint Louis",
            "shipState": "MO",
            "retailerIsCreditHold": false,
            "exported": false,
            "uploaded": false,
            "generatedFrom": "EMUN1-W",
            "isEmunOrder": true,
            "stage": "EMUN",
            "canEdit": true,
            "cancelOn": "0001-01-01T00:00:00.0000000Z",
            "discountPercentage": 0,
            "backorderTotal": 0,
            "shippableTotal": 0,
            "isCorpModified": false,
            "hasNotes": false
        },
        {
            "purchaser": {
                "id": "OC-408543_Showroom_ATL",
                "companyName": "Toluca Paperie & Gifts"
            },
            "vendor": {
                "id": "148",
                "label": "Mary Square"
            },
            "showCode": {},
            "source": {
                "id": "ROAD",
                "label": "ROAD"
            },
            "salesRep": {},
            "currentRep": {
                "name": "SARA SPITLER"
            },
            "writingRep": {
                "name": "SARA SPITLER"
            },
            "paymentTerm": {},
            "id": "OC-1595071",
            "companyName": "Toluca Paperie & Gifts",
            "retailerId": "OC-408543_Showroom_ATL",
            "purchaseOrder": "",
            "orderedOn": "2024-10-22T00:00:00.0000000Z",
            "shipOn": "2024-10-24T00:00:00.0000000Z",
            "expectedToClear": "0001-01-01T00:00:00.0000000Z",
            "timeStampOn": "0001-01-01T00:00:00.0000000Z",
            "grandTotal": 312,
            "openTotal": 312,
            "shippedTotal": 0,
            "shippedAmount": 0,
            "checkAmount": 0,
            "balance": 0,
            "vendorId": "148",
            "vendorLabel": "Mary Square",
            "status": "Cart",
            "subTotal": 0,
            "promoDiscount": 0,
            "parcelCount": 0,
            "changeCount": 0,
            "pendingChangeCount": 0,
            "approvedChangeCount": 0,
            "declinedChangeCount": 0,
            "currentRepName": "SARA SPITLER",
            "writingRepName": "SARA SPITLER",
            "orderSourceLabel": "ROAD",
            "shipCity": "Munster",
            "shipState": "IN",
            "retailerIsCreditHold": false,
            "exported": false,
            "uploaded": false,
            "generatedFrom": "EMUN1-W",
            "isEmunOrder": true,
            "stage": "EMUN",
            "canEdit": true,
            "cancelOn": "0001-01-01T00:00:00.0000000Z",
            "discountPercentage": 0,
            "backorderTotal": 0,
            "shippableTotal": 0,
            "isCorpModified": false,
            "hasNotes": false
        },
        {
            "purchaser": {
                "id": "PBK-WEB242699",
                "companyName": "Cass Health Auxiliary Gift Shop"
            },
            "vendor": {
                "id": "167",
                "label": "Primitives by Kathy"
            },
            "showCode": {},
            "source": {
                "id": "ROAD",
                "label": "ROAD"
            },
            "salesRep": {},
            "currentRep": {
                "name": "TRACY LEVINE"
            },
            "writingRep": {
                "name": "TRACY LEVINE"
            },
            "paymentTerm": {},
            "id": "OC-1595070",
            "companyName": "Cass Health Auxiliary Gift Shop",
            "retailerId": "PBK-WEB242699",
            "purchaseOrder": "OC-1595070",
            "orderedOn": "2024-10-22T00:00:00.0000000Z",
            "shipOn": "2024-10-22T00:00:00.0000000Z",
            "expectedToClear": "0001-01-01T00:00:00.0000000Z",
            "timeStampOn": "0001-01-01T00:00:00.0000000Z",
            "grandTotal": 182.1,
            "openTotal": 182.1,
            "shippedTotal": 0,
            "shippedAmount": 0,
            "checkAmount": 0,
            "balance": 182.1,
            "vendorId": "167",
            "vendorLabel": "Primitives by Kathy",
            "status": "Open",
            "subTotal": 0,
            "promoDiscount": 0,
            "parcelCount": 0,
            "changeCount": 0,
            "pendingChangeCount": 0,
            "approvedChangeCount": 0,
            "declinedChangeCount": 0,
            "currentRepName": "TRACY LEVINE",
            "writingRepName": "TRACY LEVINE",
            "orderSourceLabel": "ROAD",
            "shipCity": "Atlantic",
            "shipState": "IA",
            "retailerIsCreditHold": false,
            "exported": false,
            "uploaded": false,
            "generatedFrom": "EMUN1-W",
            "isEmunOrder": true,
            "stage": "EMUN",
            "canEdit": true,
            "reviewReason": "",
            "cancelOn": "0001-01-01T00:00:00.0000000Z",
            "discountPercentage": 0,
            "backorderTotal": 0,
            "shippableTotal": 0,
            "isCorpModified": false,
            "hasNotes": false
        }
    ]
}