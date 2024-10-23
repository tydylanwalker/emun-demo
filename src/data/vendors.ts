/* eslint-disable @typescript-eslint/no-empty-object-type */
export interface Vendors {
    offset:  number;
    total:   number;
    results: Vendor[];
}

export interface Vendor {
    id?:                       string;
    label?:                    string;
    vendorName?:               string;
    abbreviation?:             string;
    orderMinimum?:             number;
    reOrderMinimum?:           number;
    minimumBalance?:           number;
    active?:                   boolean;
    isInvoiceOnly?:            boolean;
    allowPriceOverride?:       boolean;
    defaultShipDatePrevious?:  boolean;
    enforceMinimums?:          boolean;
    enforcePurchaseIncrement?: boolean;
    allowDiscounts?:           boolean;
    emailOrders?:              boolean;
    allowBackorders?:          boolean;
    useVendorCustId?:          boolean;
    useVendorShipId?:          boolean;
    useVendorTerms?:           boolean;
    exportReviewOrders?:       boolean;
    emailUrlToExport?:         boolean;
    includeInBatch?:           boolean;
    decryptCCOnExport?:        boolean;
    customerNumber?:           string;
    exportOrders?:             boolean;
    splitByProductLine?:       boolean;
    isShowroomVendor?:         boolean;
    allowManualItemEntry?:     boolean;
    requireCreditSheet?:       boolean;
    address?:                  string;
    city?:                     string;
    state?:                    string;
    zip?:                      string;
    phone?:                    string;
    fax?:                      string;
    email?:                    string;
    website?:                  string;
    note?:                     string;
    commissionPercent?:        number;
    orderTagLine?:             string;
    productTags?:              string[];
    settings?:                 Setting[];
    lastLoginAttempt?:         string;
    lastOrderedOn?:            string;
    meta?:                     Meta;
    tags?:                     Tags;
}

export interface Meta {
}

export interface Setting {
    vendorId?: string;
    key?:      string;
    value?:    string;
}

export interface Tags {
    EditForm?: string[];
}

export const vendors: Vendors = {
    "offset": 0,
    "total": 20,
    "results": [
        {
            "id": "133",
            "label": "8 Oak Lane",
            "vendorName": "8 Oak Lane",
            "abbreviation": "",
            "orderMinimum": 300,
            "reOrderMinimum": 150,
            "minimumBalance": 0,
            "active": true,
            "isInvoiceOnly": false,
            "allowPriceOverride": true,
            "defaultShipDatePrevious": true,
            "enforceMinimums": true,
            "enforcePurchaseIncrement": true,
            "allowDiscounts": false,
            "emailOrders": true,
            "allowBackorders": true,
            "useVendorCustId": false,
            "useVendorShipId": false,
            "useVendorTerms": false,
            "exportReviewOrders": true,
            "emailUrlToExport": false,
            "includeInBatch": false,
            "decryptCCOnExport": true,
            "customerNumber": "",
            "exportOrders": true,
            "splitByProductLine": false,
            "isShowroomVendor": false,
            "allowManualItemEntry": false,
            "requireCreditSheet": true,
            "address": "3601 SE OCEAN BLVD #103",
            "city": "SEWALL'S POINT",
            "state": "FL",
            "zip": "34996",
            "phone": "7724487350",
            "fax": "",
            "email": "fschmidt@8oaklane.com",
            "website": "www.shadecritters.com; www.8oaklane.com",
            "note": "",
            "commissionPercent": 15,
            "orderTagLine": "",
            "productTags": [],
            "settings": [
                {
                    "vendorId": "133",
                    "key": "FTPDestinationDirectory",
                    "value": ""
                },
                {
                    "vendorId": "133",
                    "key": "FTPPassword",
                    "value": ""
                },
                {
                    "vendorId": "133",
                    "key": "FTPServer",
                    "value": ""
                },
                {
                    "vendorId": "133",
                    "key": "FTPType",
                    "value": ""
                },
                {
                    "vendorId": "133",
                    "key": "FTPUsername",
                    "value": ""
                },
                {
                    "vendorId": "133",
                    "key": "PromotionCheck",
                    "value": "True"
                },
                {
                    "vendorId": "133",
                    "key": "SplitOrdersIntoPDFs",
                    "value": "False"
                },
                {
                    "vendorId": "133",
                    "key": "UseDirectEmailAttachment",
                    "value": "False"
                },
                {
                    "vendorId": "133",
                    "key": "UseFTP",
                    "value": "False"
                },
                {
                    "vendorId": "133",
                    "key": "VendorExportDestinationType",
                    "value": "OCAWS"
                }
            ],
            "lastLoginAttempt": "0001-01-01T00:00:00.0000000Z",
            "lastOrderedOn": "0001-01-01T00:00:00.0000000Z",
            "meta": {},
            "tags": {}
        },
        {
            "id": "999",
            "label": "Adjustment Vendor",
            "vendorName": "Adjustment Vendor",
            "orderMinimum": 0,
            "reOrderMinimum": 0,
            "minimumBalance": 0,
            "active": true,
            "isInvoiceOnly": true,
            "allowPriceOverride": false,
            "defaultShipDatePrevious": false,
            "enforceMinimums": false,
            "enforcePurchaseIncrement": false,
            "allowDiscounts": false,
            "emailOrders": false,
            "allowBackorders": true,
            "useVendorCustId": false,
            "useVendorShipId": false,
            "useVendorTerms": false,
            "exportReviewOrders": true,
            "emailUrlToExport": false,
            "includeInBatch": false,
            "decryptCCOnExport": false,
            "exportOrders": false,
            "splitByProductLine": false,
            "isShowroomVendor": false,
            "allowManualItemEntry": true,
            "requireCreditSheet": true,
            "commissionPercent": 0,
            "productTags": [],
            "settings": [],
            "lastLoginAttempt": "0001-01-01T00:00:00.0000000Z",
            "lastOrderedOn": "0001-01-01T00:00:00.0000000Z",
            "meta": {},
            "tags": {}
        },
        {
            "id": "141",
            "label": "Bridgewater Candle Company",
            "vendorName": "Bridgewater Candle Company",
            "abbreviation": "",
            "orderMinimum": 500,
            "reOrderMinimum": 150,
            "minimumBalance": 0,
            "active": true,
            "isInvoiceOnly": false,
            "allowPriceOverride": false,
            "defaultShipDatePrevious": true,
            "enforceMinimums": true,
            "enforcePurchaseIncrement": false,
            "allowDiscounts": false,
            "emailOrders": false,
            "allowBackorders": true,
            "useVendorCustId": true,
            "useVendorShipId": true,
            "useVendorTerms": true,
            "exportReviewOrders": false,
            "emailUrlToExport": false,
            "includeInBatch": false,
            "decryptCCOnExport": true,
            "customerNumber": "",
            "exportOrders": true,
            "splitByProductLine": false,
            "isShowroomVendor": true,
            "allowManualItemEntry": false,
            "requireCreditSheet": true,
            "address": "951 SOUTH PINE ST, SUITE 105",
            "city": "SPARTANBURG",
            "state": "SC",
            "zip": "29302",
            "phone": "8778432743",
            "fax": "8645824781",
            "email": "",
            "website": "www.bridgewatercandles.com",
            "note": "",
            "commissionPercent": 15,
            "orderTagLine": "",
            "productTags": [],
            "settings": [
                {
                    "vendorId": "141",
                    "key": "CartMessage",
                    "value": "<h4>Bridgewater Candle Company Order Notice:</h4>\n<span>Sweet Grace & Holiday Flower Diffusers (excluding the mini diffuser) will automatically have a ship date of 9/15 and orders will not split</span>"
                },
                {
                    "vendorId": "141",
                    "key": "CartMessageType",
                    "value": "Notification"
                },
                {
                    "vendorId": "141",
                    "key": "CustomizationCode",
                    "value": "GD043"
                },
                {
                    "vendorId": "141",
                    "key": "EmailReviewAlert",
                    "value": "False"
                },
                {
                    "vendorId": "141",
                    "key": "FTPDestinationDirectory",
                    "value": ""
                },
                {
                    "vendorId": "141",
                    "key": "FTPPassword",
                    "value": ""
                },
                {
                    "vendorId": "141",
                    "key": "FTPServer",
                    "value": ""
                },
                {
                    "vendorId": "141",
                    "key": "FTPType",
                    "value": ""
                },
                {
                    "vendorId": "141",
                    "key": "FTPUsername",
                    "value": ""
                },
                {
                    "vendorId": "141",
                    "key": "PromotionCheck",
                    "value": "True"
                },
                {
                    "vendorId": "141",
                    "key": "SplitByShipDate",
                    "value": "false"
                },
                {
                    "vendorId": "141",
                    "key": "SplitOrdersIntoPDFs",
                    "value": "False"
                },
                {
                    "vendorId": "141",
                    "key": "UseDirectEmailAttachment",
                    "value": "False"
                },
                {
                    "vendorId": "141",
                    "key": "UseFTP",
                    "value": "False"
                },
                {
                    "vendorId": "141",
                    "key": "VendorExportDestinationType",
                    "value": "OCAWS"
                }
            ],
            "lastLoginAttempt": "0001-01-01T00:00:00.0000000Z",
            "lastOrderedOn": "0001-01-01T00:00:00.0000000Z",
            "meta": {},
            "tags": {
                "EditForm": [
                    "85d9158a-9e9c-4ecb-823a-099256f601f4"
                ]
            }
        },
        {
            "id": "3",
            "label": "C.R. Gibson Signature",
            "vendorName": "C.R. Gibson Signature",
            "abbreviation": "",
            "orderMinimum": 175,
            "reOrderMinimum": 175,
            "minimumBalance": 0,
            "active": true,
            "isInvoiceOnly": false,
            "allowPriceOverride": false,
            "defaultShipDatePrevious": true,
            "enforceMinimums": true,
            "enforcePurchaseIncrement": true,
            "allowDiscounts": false,
            "emailOrders": true,
            "allowBackorders": true,
            "useVendorCustId": true,
            "useVendorShipId": false,
            "useVendorTerms": false,
            "exportReviewOrders": true,
            "emailUrlToExport": false,
            "includeInBatch": false,
            "decryptCCOnExport": true,
            "customerNumber": "",
            "exportOrders": true,
            "splitByProductLine": false,
            "isShowroomVendor": false,
            "allowManualItemEntry": false,
            "requireCreditSheet": true,
            "address": "PO BOX 120452",
            "city": "DALLAS",
            "state": "TX",
            "zip": "75312-0452",
            "phone": "8002436004",
            "fax": "8002548515",
            "email": "ORDERS@CRGIBSON.COM; CUSTOMERSERVICE@GIFTWRAPCOMPANY.COM; Samantha.Shuman@dgamericas.com",
            "website": "CRGIBSONWHOLESALE.COM",
            "note": "",
            "commissionPercent": 15,
            "orderTagLine": "",
            "productTags": [],
            "settings": [
                {
                    "vendorId": "3",
                    "key": "FTPDestinationDirectory",
                    "value": ""
                },
                {
                    "vendorId": "3",
                    "key": "FTPPassword",
                    "value": ""
                },
                {
                    "vendorId": "3",
                    "key": "FTPServer",
                    "value": ""
                },
                {
                    "vendorId": "3",
                    "key": "FTPType",
                    "value": ""
                },
                {
                    "vendorId": "3",
                    "key": "FTPUsername",
                    "value": ""
                },
                {
                    "vendorId": "3",
                    "key": "PromotionCheck",
                    "value": "True"
                },
                {
                    "vendorId": "3",
                    "key": "SplitOrdersIntoPDFs",
                    "value": "False"
                },
                {
                    "vendorId": "3",
                    "key": "UseDirectEmailAttachment",
                    "value": "False"
                },
                {
                    "vendorId": "3",
                    "key": "UseFTP",
                    "value": "False"
                },
                {
                    "vendorId": "3",
                    "key": "VendorExportDestinationType",
                    "value": "TOAGENCY"
                }
            ],
            "lastLoginAttempt": "0001-01-01T00:00:00.0000000Z",
            "lastOrderedOn": "0001-01-01T00:00:00.0000000Z",
            "meta": {},
            "tags": {
                "EditForm": [
                    "3f36b276-a6c1-4d88-bd62-69f6d7a62fec"
                ]
            }
        },
        {
            "id": "151",
            "label": "Caren",
            "vendorName": "Caren",
            "abbreviation": "",
            "orderMinimum": 300,
            "reOrderMinimum": 150,
            "minimumBalance": 0,
            "active": true,
            "isInvoiceOnly": false,
            "allowPriceOverride": false,
            "defaultShipDatePrevious": false,
            "enforceMinimums": true,
            "enforcePurchaseIncrement": true,
            "allowDiscounts": false,
            "emailOrders": true,
            "allowBackorders": true,
            "useVendorCustId": true,
            "useVendorShipId": false,
            "useVendorTerms": false,
            "exportReviewOrders": true,
            "emailUrlToExport": false,
            "includeInBatch": false,
            "decryptCCOnExport": true,
            "customerNumber": "",
            "exportOrders": true,
            "splitByProductLine": false,
            "isShowroomVendor": true,
            "allowManualItemEntry": true,
            "requireCreditSheet": true,
            "address": "3080 NORTHFIELD PLACE, STE 106",
            "city": "ROSWELL",
            "state": "GA",
            "zip": "30076",
            "phone": "8006266272",
            "fax": "7703933885",
            "email": "nancy@carenproducts.com",
            "website": "www.carenproducts.com",
            "note": "",
            "commissionPercent": 15,
            "orderTagLine": "",
            "productTags": [],
            "settings": [
                {
                    "vendorId": "151",
                    "key": "FTPDestinationDirectory",
                    "value": "/DataOut/"
                },
                {
                    "vendorId": "151",
                    "key": "FTPPassword",
                    "value": "th5He_okesw"
                },
                {
                    "vendorId": "151",
                    "key": "FTPServer",
                    "value": "files.emun1.com"
                },
                {
                    "vendorId": "151",
                    "key": "FTPType",
                    "value": ""
                },
                {
                    "vendorId": "151",
                    "key": "FTPUsername",
                    "value": ""
                },
                {
                    "vendorId": "151",
                    "key": "PromotionCheck",
                    "value": "True"
                },
                {
                    "vendorId": "151",
                    "key": "SplitOrdersIntoPDFs",
                    "value": "False"
                },
                {
                    "vendorId": "151",
                    "key": "UseDirectEmailAttachment",
                    "value": "False"
                },
                {
                    "vendorId": "151",
                    "key": "UseFTP",
                    "value": "False"
                },
                {
                    "vendorId": "151",
                    "key": "VendorExportDestinationType",
                    "value": "OCAWS"
                }
            ],
            "lastLoginAttempt": "0001-01-01T00:00:00.0000000Z",
            "lastOrderedOn": "0001-01-01T00:00:00.0000000Z",
            "meta": {},
            "tags": {
                "EditForm": [
                    "b1926eb7-9421-4127-9fbc-f0902be506c4"
                ]
            }
        },
        {
            "id": "150",
            "label": "Caus",
            "vendorName": "Caus",
            "abbreviation": "",
            "orderMinimum": 0,
            "reOrderMinimum": 0,
            "minimumBalance": 0,
            "active": true,
            "isInvoiceOnly": false,
            "allowPriceOverride": false,
            "defaultShipDatePrevious": false,
            "enforceMinimums": false,
            "enforcePurchaseIncrement": false,
            "allowDiscounts": false,
            "emailOrders": false,
            "allowBackorders": true,
            "useVendorCustId": true,
            "useVendorShipId": true,
            "useVendorTerms": true,
            "exportReviewOrders": true,
            "emailUrlToExport": false,
            "includeInBatch": true,
            "decryptCCOnExport": false,
            "customerNumber": "",
            "exportOrders": true,
            "splitByProductLine": false,
            "isShowroomVendor": true,
            "allowManualItemEntry": true,
            "requireCreditSheet": true,
            "address": "2514 RELIANCE AVENUE",
            "city": "APEX",
            "state": "NC",
            "zip": "27539",
            "phone": "9406262064",
            "fax": "",
            "email": "sales@thisismycaus.com",
            "website": "www.thisismycaus.com",
            "note": "",
            "commissionPercent": 15,
            "orderTagLine": "",
            "productTags": [],
            "settings": [
                {
                    "vendorId": "150",
                    "key": "FTPDestinationDirectory",
                    "value": ""
                },
                {
                    "vendorId": "150",
                    "key": "FTPPassword",
                    "value": ""
                },
                {
                    "vendorId": "150",
                    "key": "FTPServer",
                    "value": ""
                },
                {
                    "vendorId": "150",
                    "key": "FTPType",
                    "value": ""
                },
                {
                    "vendorId": "150",
                    "key": "FTPUsername",
                    "value": ""
                },
                {
                    "vendorId": "150",
                    "key": "PromotionCheck",
                    "value": "False"
                },
                {
                    "vendorId": "150",
                    "key": "SplitByShipDate",
                    "value": "True"
                },
                {
                    "vendorId": "150",
                    "key": "SplitOrdersIntoPDFs",
                    "value": "False"
                },
                {
                    "vendorId": "150",
                    "key": "UseDirectEmailAttachment",
                    "value": "False"
                },
                {
                    "vendorId": "150",
                    "key": "UseFTP",
                    "value": "False"
                },
                {
                    "vendorId": "150",
                    "key": "VendorExportDestinationType",
                    "value": "OCAWS"
                }
            ],
            "lastLoginAttempt": "0001-01-01T00:00:00.0000000Z",
            "lastOrderedOn": "0001-01-01T00:00:00.0000000Z",
            "meta": {},
            "tags": {}
        },
        {
            "id": "144",
            "label": "Fresh Scents by Willowbrook",
            "vendorName": "Fresh Scents by Willowbrook",
            "abbreviation": "",
            "orderMinimum": 90,
            "reOrderMinimum": 90,
            "minimumBalance": 0,
            "active": true,
            "isInvoiceOnly": false,
            "allowPriceOverride": false,
            "defaultShipDatePrevious": true,
            "enforceMinimums": true,
            "enforcePurchaseIncrement": false,
            "allowDiscounts": false,
            "emailOrders": false,
            "allowBackorders": true,
            "useVendorCustId": true,
            "useVendorShipId": true,
            "useVendorTerms": true,
            "exportReviewOrders": false,
            "emailUrlToExport": false,
            "includeInBatch": false,
            "decryptCCOnExport": true,
            "customerNumber": "",
            "exportOrders": true,
            "splitByProductLine": false,
            "isShowroomVendor": true,
            "allowManualItemEntry": false,
            "requireCreditSheet": true,
            "address": "951 S PINE ST, SUITE 110",
            "city": "SPARTANBURG",
            "state": "SC",
            "zip": "29302",
            "phone": "8888773132",
            "fax": "8645738730",
            "email": "",
            "website": "www.freshscents.com",
            "note": "",
            "commissionPercent": 15,
            "orderTagLine": "",
            "productTags": [],
            "settings": [
                {
                    "vendorId": "144",
                    "key": "CustomizationCode",
                    "value": "GD043"
                },
                {
                    "vendorId": "144",
                    "key": "EmailReviewAlert",
                    "value": "False"
                },
                {
                    "vendorId": "144",
                    "key": "FTPDestinationDirectory",
                    "value": ""
                },
                {
                    "vendorId": "144",
                    "key": "FTPPassword",
                    "value": ""
                },
                {
                    "vendorId": "144",
                    "key": "FTPServer",
                    "value": ""
                },
                {
                    "vendorId": "144",
                    "key": "FTPType",
                    "value": ""
                },
                {
                    "vendorId": "144",
                    "key": "FTPUsername",
                    "value": ""
                },
                {
                    "vendorId": "144",
                    "key": "PromotionCheck",
                    "value": "True"
                },
                {
                    "vendorId": "144",
                    "key": "SplitOrdersIntoPDFs",
                    "value": "False"
                },
                {
                    "vendorId": "144",
                    "key": "UseDirectEmailAttachment",
                    "value": "False"
                },
                {
                    "vendorId": "144",
                    "key": "UseFTP",
                    "value": "False"
                },
                {
                    "vendorId": "144",
                    "key": "VendorExportDestinationType",
                    "value": "OCAWS"
                }
            ],
            "lastLoginAttempt": "0001-01-01T00:00:00.0000000Z",
            "lastOrderedOn": "0001-01-01T00:00:00.0000000Z",
            "meta": {},
            "tags": {
                "EditForm": [
                    "23294aa0-9c46-492b-a61d-32c462018461"
                ]
            }
        },
        {
            "id": "142",
            "label": "Greenleaf",
            "vendorName": "Greenleaf",
            "abbreviation": "",
            "orderMinimum": 300,
            "reOrderMinimum": 150,
            "minimumBalance": 0,
            "active": true,
            "isInvoiceOnly": false,
            "allowPriceOverride": false,
            "defaultShipDatePrevious": true,
            "enforceMinimums": true,
            "enforcePurchaseIncrement": false,
            "allowDiscounts": false,
            "emailOrders": false,
            "allowBackorders": true,
            "useVendorCustId": true,
            "useVendorShipId": true,
            "useVendorTerms": true,
            "exportReviewOrders": false,
            "emailUrlToExport": false,
            "includeInBatch": false,
            "decryptCCOnExport": true,
            "customerNumber": "",
            "exportOrders": true,
            "splitByProductLine": false,
            "isShowroomVendor": true,
            "allowManualItemEntry": false,
            "requireCreditSheet": true,
            "address": "951 S. PINE ST, SUITE 100",
            "city": "SPARTANBURG",
            "state": "SC",
            "zip": "29302",
            "phone": "8774733653",
            "fax": "8649489155",
            "email": "",
            "website": "www.greenleafgifts.com",
            "note": "",
            "commissionPercent": 15,
            "orderTagLine": "",
            "productTags": [],
            "settings": [
                {
                    "vendorId": "142",
                    "key": "CustomizationCode",
                    "value": "GD043"
                },
                {
                    "vendorId": "142",
                    "key": "EmailReviewAlert",
                    "value": "False"
                },
                {
                    "vendorId": "142",
                    "key": "FTPDestinationDirectory",
                    "value": ""
                },
                {
                    "vendorId": "142",
                    "key": "FTPPassword",
                    "value": ""
                },
                {
                    "vendorId": "142",
                    "key": "FTPServer",
                    "value": ""
                },
                {
                    "vendorId": "142",
                    "key": "FTPType",
                    "value": ""
                },
                {
                    "vendorId": "142",
                    "key": "FTPUsername",
                    "value": ""
                },
                {
                    "vendorId": "142",
                    "key": "PromotionCheck",
                    "value": "False"
                },
                {
                    "vendorId": "142",
                    "key": "SplitOrdersIntoPDFs",
                    "value": "False"
                },
                {
                    "vendorId": "142",
                    "key": "UseDirectEmailAttachment",
                    "value": "False"
                },
                {
                    "vendorId": "142",
                    "key": "UseFTP",
                    "value": "False"
                },
                {
                    "vendorId": "142",
                    "key": "VendorExportDestinationType",
                    "value": "TOAGENCY"
                }
            ],
            "lastLoginAttempt": "0001-01-01T00:00:00.0000000Z",
            "lastOrderedOn": "0001-01-01T00:00:00.0000000Z",
            "meta": {},
            "tags": {
                "EditForm": [
                    "7e9476c9-6cb7-4db4-b28a-456c15134a29"
                ]
            }
        },
        {
            "id": "118",
            "label": "Jane Marie",
            "vendorName": "Jane Marie",
            "abbreviation": "",
            "orderMinimum": 300,
            "reOrderMinimum": 0,
            "minimumBalance": 0,
            "active": true,
            "isInvoiceOnly": false,
            "allowPriceOverride": true,
            "defaultShipDatePrevious": true,
            "enforceMinimums": true,
            "enforcePurchaseIncrement": true,
            "allowDiscounts": false,
            "emailOrders": true,
            "allowBackorders": true,
            "useVendorCustId": false,
            "useVendorShipId": false,
            "useVendorTerms": false,
            "exportReviewOrders": true,
            "emailUrlToExport": false,
            "includeInBatch": false,
            "decryptCCOnExport": true,
            "customerNumber": "",
            "exportOrders": true,
            "splitByProductLine": false,
            "isShowroomVendor": true,
            "allowManualItemEntry": false,
            "requireCreditSheet": true,
            "address": "700 Factory Outlet Drive Suite 102",
            "city": "Arcadia",
            "state": "LA",
            "zip": "71001",
            "phone": "3187771310",
            "fax": "8662752136",
            "email": "jeff@runningww.com;dwaina@janemarie.com;Ben@janemarie.com; Heidi@janemarie.com; emily@janemarie.com; Patricia@janemarie.com",
            "website": "www.janemarie.com",
            "note": "",
            "commissionPercent": 15,
            "orderTagLine": "",
            "productTags": [],
            "settings": [
                {
                    "vendorId": "118",
                    "key": "FTPDestinationDirectory",
                    "value": ""
                },
                {
                    "vendorId": "118",
                    "key": "FTPPassword",
                    "value": ""
                },
                {
                    "vendorId": "118",
                    "key": "FTPServer",
                    "value": ""
                },
                {
                    "vendorId": "118",
                    "key": "FTPType",
                    "value": ""
                },
                {
                    "vendorId": "118",
                    "key": "FTPUsername",
                    "value": ""
                },
                {
                    "vendorId": "118",
                    "key": "PromotionCheck",
                    "value": "True"
                },
                {
                    "vendorId": "118",
                    "key": "SplitOrdersIntoPDFs",
                    "value": "False"
                },
                {
                    "vendorId": "118",
                    "key": "UseDirectEmailAttachment",
                    "value": "False"
                },
                {
                    "vendorId": "118",
                    "key": "UseFTP",
                    "value": "False"
                },
                {
                    "vendorId": "118",
                    "key": "VendorExportDestinationType",
                    "value": "OCAWS"
                }
            ],
            "lastLoginAttempt": "0001-01-01T00:00:00.0000000Z",
            "lastOrderedOn": "0001-01-01T00:00:00.0000000Z",
            "meta": {},
            "tags": {
                "EditForm": [
                    "49e989e8-2ea5-446a-8086-b37bcda95d6d"
                ]
            }
        },
        {
            "id": "109",
            "label": "Magnolia Lane",
            "vendorName": "Magnolia Lane",
            "abbreviation": "",
            "orderMinimum": 250,
            "reOrderMinimum": 150,
            "minimumBalance": 100,
            "active": true,
            "isInvoiceOnly": false,
            "allowPriceOverride": true,
            "defaultShipDatePrevious": false,
            "enforceMinimums": false,
            "enforcePurchaseIncrement": false,
            "allowDiscounts": false,
            "emailOrders": true,
            "allowBackorders": true,
            "useVendorCustId": false,
            "useVendorShipId": false,
            "useVendorTerms": false,
            "exportReviewOrders": true,
            "emailUrlToExport": false,
            "includeInBatch": false,
            "decryptCCOnExport": true,
            "customerNumber": "",
            "exportOrders": false,
            "splitByProductLine": false,
            "isShowroomVendor": false,
            "allowManualItemEntry": true,
            "requireCreditSheet": true,
            "address": "1920 WOODLANDS INDUSTRIAL DR",
            "city": "TRUSSVILLE",
            "state": "AL",
            "zip": "35173",
            "phone": "2052515007",
            "fax": "2053224366",
            "email": "pmann2957@aol.com",
            "website": "www.magnolialanecollection.com",
            "note": "",
            "commissionPercent": 15,
            "orderTagLine": "",
            "productTags": [],
            "settings": [
                {
                    "vendorId": "109",
                    "key": "FTPDestinationDirectory",
                    "value": ""
                },
                {
                    "vendorId": "109",
                    "key": "FTPPassword",
                    "value": ""
                },
                {
                    "vendorId": "109",
                    "key": "FTPServer",
                    "value": ""
                },
                {
                    "vendorId": "109",
                    "key": "FTPType",
                    "value": ""
                },
                {
                    "vendorId": "109",
                    "key": "FTPUsername",
                    "value": ""
                },
                {
                    "vendorId": "109",
                    "key": "PromotionCheck",
                    "value": "True"
                },
                {
                    "vendorId": "109",
                    "key": "SplitOrdersIntoPDFs",
                    "value": "False"
                },
                {
                    "vendorId": "109",
                    "key": "UseDirectEmailAttachment",
                    "value": "False"
                },
                {
                    "vendorId": "109",
                    "key": "UseFTP",
                    "value": "False"
                },
                {
                    "vendorId": "109",
                    "key": "VendorExportDestinationType",
                    "value": "OCAWS"
                }
            ],
            "lastLoginAttempt": "0001-01-01T00:00:00.0000000Z",
            "lastOrderedOn": "0001-01-01T00:00:00.0000000Z",
            "meta": {},
            "tags": {}
        },
        {
            "id": "148",
            "label": "Mary Square",
            "vendorName": "Mary Square",
            "abbreviation": "",
            "orderMinimum": 500,
            "reOrderMinimum": 200,
            "minimumBalance": 0,
            "active": true,
            "isInvoiceOnly": false,
            "allowPriceOverride": false,
            "defaultShipDatePrevious": false,
            "enforceMinimums": false,
            "enforcePurchaseIncrement": false,
            "allowDiscounts": false,
            "emailOrders": false,
            "allowBackorders": true,
            "useVendorCustId": true,
            "useVendorShipId": true,
            "useVendorTerms": true,
            "exportReviewOrders": true,
            "emailUrlToExport": false,
            "includeInBatch": true,
            "decryptCCOnExport": false,
            "customerNumber": "",
            "exportOrders": true,
            "splitByProductLine": false,
            "isShowroomVendor": true,
            "allowManualItemEntry": true,
            "requireCreditSheet": true,
            "address": "2514 RELIANCE AVENUE",
            "city": "APEX",
            "state": "NC",
            "zip": "27539",
            "phone": "9406262064",
            "fax": "",
            "email": "sales@marysquare.com",
            "website": "www.marysquare.com",
            "note": "",
            "commissionPercent": 15,
            "orderTagLine": "",
            "productTags": [],
            "settings": [
                {
                    "vendorId": "148",
                    "key": "FTPDestinationDirectory",
                    "value": ""
                },
                {
                    "vendorId": "148",
                    "key": "FTPPassword",
                    "value": ""
                },
                {
                    "vendorId": "148",
                    "key": "FTPServer",
                    "value": ""
                },
                {
                    "vendorId": "148",
                    "key": "FTPType",
                    "value": ""
                },
                {
                    "vendorId": "148",
                    "key": "FTPUsername",
                    "value": ""
                },
                {
                    "vendorId": "148",
                    "key": "PromotionCheck",
                    "value": "False"
                },
                {
                    "vendorId": "148",
                    "key": "SplitByShipDate",
                    "value": "True"
                },
                {
                    "vendorId": "148",
                    "key": "SplitOrdersIntoPDFs",
                    "value": "False"
                },
                {
                    "vendorId": "148",
                    "key": "UseDirectEmailAttachment",
                    "value": "False"
                },
                {
                    "vendorId": "148",
                    "key": "UseFTP",
                    "value": "False"
                },
                {
                    "vendorId": "148",
                    "key": "VendorExportDestinationType",
                    "value": "TOAGENCY"
                }
            ],
            "lastLoginAttempt": "0001-01-01T00:00:00.0000000Z",
            "lastOrderedOn": "0001-01-01T00:00:00.0000000Z",
            "meta": {},
            "tags": {
                "EditForm": [
                    "2b2c8da0-40d1-4935-973c-94edd9af355f"
                ]
            }
        },
        {
            "id": "149",
            "label": "Michelle McDowell",
            "vendorName": "Michelle McDowell",
            "abbreviation": "",
            "orderMinimum": 500,
            "reOrderMinimum": 200,
            "minimumBalance": 0,
            "active": true,
            "isInvoiceOnly": false,
            "allowPriceOverride": false,
            "defaultShipDatePrevious": false,
            "enforceMinimums": false,
            "enforcePurchaseIncrement": false,
            "allowDiscounts": false,
            "emailOrders": false,
            "allowBackorders": true,
            "useVendorCustId": true,
            "useVendorShipId": true,
            "useVendorTerms": true,
            "exportReviewOrders": true,
            "emailUrlToExport": false,
            "includeInBatch": true,
            "decryptCCOnExport": false,
            "customerNumber": "",
            "exportOrders": true,
            "splitByProductLine": false,
            "isShowroomVendor": true,
            "allowManualItemEntry": true,
            "requireCreditSheet": true,
            "address": "2514 RELIANCE AVENUE",
            "city": "APEX",
            "state": "NC",
            "zip": "27539",
            "phone": "9406262064",
            "fax": "",
            "email": "sales@michellemcdowelldesigns.com",
            "website": "www.michellemcdowelldesigns.com",
            "note": "",
            "commissionPercent": 15,
            "orderTagLine": "",
            "productTags": [],
            "settings": [
                {
                    "vendorId": "149",
                    "key": "FTPDestinationDirectory",
                    "value": ""
                },
                {
                    "vendorId": "149",
                    "key": "FTPPassword",
                    "value": ""
                },
                {
                    "vendorId": "149",
                    "key": "FTPServer",
                    "value": ""
                },
                {
                    "vendorId": "149",
                    "key": "FTPType",
                    "value": ""
                },
                {
                    "vendorId": "149",
                    "key": "FTPUsername",
                    "value": ""
                },
                {
                    "vendorId": "149",
                    "key": "PromotionCheck",
                    "value": "False"
                },
                {
                    "vendorId": "149",
                    "key": "SplitByShipDate",
                    "value": "True"
                },
                {
                    "vendorId": "149",
                    "key": "SplitOrdersIntoPDFs",
                    "value": "False"
                },
                {
                    "vendorId": "149",
                    "key": "UseDirectEmailAttachment",
                    "value": "False"
                },
                {
                    "vendorId": "149",
                    "key": "UseFTP",
                    "value": "False"
                },
                {
                    "vendorId": "149",
                    "key": "VendorExportDestinationType",
                    "value": "OCAWS"
                }
            ],
            "lastLoginAttempt": "0001-01-01T00:00:00.0000000Z",
            "lastOrderedOn": "0001-01-01T00:00:00.0000000Z",
            "meta": {},
            "tags": {
                "EditForm": [
                    "f929152d-b00e-46e3-b586-08f6eca5ac0f"
                ]
            }
        },
        {
            "id": "2",
            "label": "Mud Pie",
            "vendorName": "Mud Pie",
            "abbreviation": "",
            "orderMinimum": 750,
            "reOrderMinimum": 250,
            "minimumBalance": 100,
            "active": true,
            "isInvoiceOnly": false,
            "allowPriceOverride": false,
            "defaultShipDatePrevious": true,
            "enforceMinimums": true,
            "enforcePurchaseIncrement": true,
            "allowDiscounts": false,
            "emailOrders": true,
            "allowBackorders": true,
            "useVendorCustId": true,
            "useVendorShipId": true,
            "useVendorTerms": false,
            "exportReviewOrders": false,
            "emailUrlToExport": false,
            "includeInBatch": false,
            "decryptCCOnExport": true,
            "customerNumber": "1011870",
            "exportOrders": true,
            "splitByProductLine": false,
            "isShowroomVendor": false,
            "allowManualItemEntry": false,
            "requireCreditSheet": true,
            "address": "4893 LEWIS RD, SUITE A",
            "city": "STONE MOUNTAIN",
            "state": "GA",
            "zip": "30083",
            "phone": "8009981633",
            "fax": "6789379697",
            "email": "kchapman@mudpie.com",
            "website": "www.mud-pie.com",
            "note": "",
            "commissionPercent": 15,
            "orderTagLine": "",
            "productTags": [],
            "settings": [
                {
                    "vendorId": "2",
                    "key": "CartMessage",
                    "value": "<h4>Looking to carry Mud Pie in your store?</h4><span>All prospective retailers must apply and be approved to become a Mud Pie retailer. You can begin your application process on the order confirmation page.</span>"
                },
                {
                    "vendorId": "2",
                    "key": "CartMessageType",
                    "value": "Notification"
                },
                {
                    "vendorId": "2",
                    "key": "FTPDestinationDirectory",
                    "value": ""
                },
                {
                    "vendorId": "2",
                    "key": "FTPPassword",
                    "value": ""
                },
                {
                    "vendorId": "2",
                    "key": "FTPServer",
                    "value": ""
                },
                {
                    "vendorId": "2",
                    "key": "FTPType",
                    "value": ""
                },
                {
                    "vendorId": "2",
                    "key": "FTPUsername",
                    "value": ""
                },
                {
                    "vendorId": "2",
                    "key": "PromotionCheck",
                    "value": "True"
                },
                {
                    "vendorId": "2",
                    "key": "SplitByShipDate",
                    "value": "false"
                },
                {
                    "vendorId": "2",
                    "key": "SplitOrdersIntoPDFs",
                    "value": "False"
                },
                {
                    "vendorId": "2",
                    "key": "UseDirectEmailAttachment",
                    "value": "False"
                },
                {
                    "vendorId": "2",
                    "key": "UseFTP",
                    "value": "False"
                },
                {
                    "vendorId": "2",
                    "key": "VendorExportDestinationType",
                    "value": "TOAGENCY"
                }
            ],
            "lastLoginAttempt": "0001-01-01T00:00:00.0000000Z",
            "lastOrderedOn": "0001-01-01T00:00:00.0000000Z",
            "meta": {},
            "tags": {
                "EditForm": [
                    "0a4923a7-3012-46ee-b405-fa052d4e3de4"
                ]
            }
        },
        {
            "id": "158",
            "label": "Notes",
            "vendorName": "Notes",
            "abbreviation": "",
            "orderMinimum": 200,
            "reOrderMinimum": 100,
            "minimumBalance": 0,
            "active": true,
            "isInvoiceOnly": false,
            "allowPriceOverride": false,
            "defaultShipDatePrevious": true,
            "enforceMinimums": true,
            "enforcePurchaseIncrement": false,
            "allowDiscounts": false,
            "emailOrders": false,
            "allowBackorders": true,
            "useVendorCustId": true,
            "useVendorShipId": true,
            "useVendorTerms": true,
            "exportReviewOrders": false,
            "emailUrlToExport": false,
            "includeInBatch": false,
            "decryptCCOnExport": true,
            "customerNumber": "",
            "exportOrders": true,
            "splitByProductLine": false,
            "isShowroomVendor": true,
            "allowManualItemEntry": false,
            "requireCreditSheet": true,
            "address": "951 SOUTH PINE STREET",
            "city": "Spartanburg",
            "state": "SC",
            "zip": "29302",
            "phone": "8666036165",
            "fax": "8645737373",
            "email": "",
            "website": "",
            "note": "",
            "commissionPercent": 15,
            "orderTagLine": "",
            "productTags": [],
            "settings": [
                {
                    "vendorId": "158",
                    "key": "CartMessage",
                    "value": ""
                },
                {
                    "vendorId": "158",
                    "key": "CartMessageType",
                    "value": "Alert"
                },
                {
                    "vendorId": "158",
                    "key": "EmailReviewAlert",
                    "value": "False"
                },
                {
                    "vendorId": "158",
                    "key": "FTPDestinationDirectory",
                    "value": ""
                },
                {
                    "vendorId": "158",
                    "key": "FTPPassword",
                    "value": ""
                },
                {
                    "vendorId": "158",
                    "key": "FTPServer",
                    "value": ""
                },
                {
                    "vendorId": "158",
                    "key": "FTPType",
                    "value": ""
                },
                {
                    "vendorId": "158",
                    "key": "FTPUsername",
                    "value": ""
                },
                {
                    "vendorId": "158",
                    "key": "PromotionCheck",
                    "value": "True"
                },
                {
                    "vendorId": "158",
                    "key": "SplitByShipDate",
                    "value": "false"
                },
                {
                    "vendorId": "158",
                    "key": "SplitOrdersIntoPDFs",
                    "value": "False"
                },
                {
                    "vendorId": "158",
                    "key": "UseDirectEmailAttachment",
                    "value": "False"
                },
                {
                    "vendorId": "158",
                    "key": "UseFTP",
                    "value": "False"
                },
                {
                    "vendorId": "158",
                    "key": "VendorExportDestinationType",
                    "value": "OCAWS"
                }
            ],
            "lastLoginAttempt": "0001-01-01T00:00:00.0000000Z",
            "lastOrderedOn": "0001-01-01T00:00:00.0000000Z",
            "meta": {},
            "tags": {
                "EditForm": [
                    "8885aa8c-1e48-46fe-8a9e-88a2a849430c"
                ]
            }
        },
        {
            "id": "167",
            "label": "Primitives by Kathy",
            "vendorName": "Primitives by Kathy",
            "abbreviation": "",
            "orderMinimum": 300,
            "reOrderMinimum": 150,
            "minimumBalance": 0,
            "active": true,
            "isInvoiceOnly": false,
            "allowPriceOverride": false,
            "defaultShipDatePrevious": true,
            "enforceMinimums": true,
            "enforcePurchaseIncrement": true,
            "allowDiscounts": false,
            "emailOrders": false,
            "allowBackorders": true,
            "useVendorCustId": true,
            "useVendorShipId": false,
            "useVendorTerms": true,
            "exportReviewOrders": true,
            "emailUrlToExport": false,
            "includeInBatch": false,
            "decryptCCOnExport": true,
            "customerNumber": "",
            "exportOrders": true,
            "splitByProductLine": false,
            "isShowroomVendor": true,
            "allowManualItemEntry": true,
            "requireCreditSheet": true,
            "address": "1817 WILLIAM PENN WAY",
            "city": "Lancaster",
            "state": "PA",
            "zip": "17601",
            "phone": "8662952849",
            "fax": "7173944327",
            "email": "custserv@primitivesbykathy.com",
            "website": "primitivesbykathy.com",
            "note": "",
            "commissionPercent": 15,
            "orderTagLine": "",
            "productTags": [],
            "settings": [
                {
                    "vendorId": "167",
                    "key": "CartMessage",
                    "value": ""
                },
                {
                    "vendorId": "167",
                    "key": "CartMessageType",
                    "value": "Notification"
                },
                {
                    "vendorId": "167",
                    "key": "FTPDestinationDirectory",
                    "value": ""
                },
                {
                    "vendorId": "167",
                    "key": "FTPPassword",
                    "value": ""
                },
                {
                    "vendorId": "167",
                    "key": "FTPServer",
                    "value": ""
                },
                {
                    "vendorId": "167",
                    "key": "FTPType",
                    "value": ""
                },
                {
                    "vendorId": "167",
                    "key": "FTPUsername",
                    "value": ""
                },
                {
                    "vendorId": "167",
                    "key": "PromotionCheck",
                    "value": "True"
                },
                {
                    "vendorId": "167",
                    "key": "SplitOrdersIntoPDFs",
                    "value": "False"
                },
                {
                    "vendorId": "167",
                    "key": "UseDirectEmailAttachment",
                    "value": "False"
                },
                {
                    "vendorId": "167",
                    "key": "UseFTP",
                    "value": "False"
                },
                {
                    "vendorId": "167",
                    "key": "UseLineLevelShipDates",
                    "value": "True"
                },
                {
                    "vendorId": "167",
                    "key": "VendorExportDestinationType",
                    "value": "OCAWS"
                }
            ],
            "lastLoginAttempt": "0001-01-01T00:00:00.0000000Z",
            "lastOrderedOn": "0001-01-01T00:00:00.0000000Z",
            "meta": {},
            "tags": {
                "EditForm": [
                    "755f1b18-62ee-40ab-8a4f-1597ceb1f052"
                ]
            }
        }
    ]
}