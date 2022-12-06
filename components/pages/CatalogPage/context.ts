import { createContext } from 'react';

export interface ICatalogContext {
    storeSelectedCategoryIdTrans: (id: number | null) => void;
    selectedCategoryId: number | null;
}

export const CatalogContext = createContext<null | ICatalogContext>(null);
