export interface IEvotorStore {
    uuid: string;
    address: string;
    name: string;
    code: null | string;
}

export interface IEvotorProduct {
    uuid: string;
    group: boolean;
    hasVariants: boolean;
    type: string;
    name: string;
    code: string;
    barCodes: string[];
    price: number;
    costPrice: number;
    quantity: number;
    measureName: string;
    tax: string;
    allowToSell: boolean;
    description: string;
    articleNumber: string;
    parentUuid: null | string;
    alcoCodes: null;
    alcoholByVolume: null;
    alcoholProductKindCode: null;
    tareVolume: null | string;
    classificationCode: string;
    allowPartialSell: null;
    quantityInPackage: null;
    isExcisable: null;
}
