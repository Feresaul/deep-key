import { getKeyValue } from './value';

import type { DeepKeyOf, TObject } from '../types';

type SortParams<T extends TObject> = {
    array: T[];
    key: DeepKeyOf<T>;
    order?: 'ASC' | 'DESC';
};

/**
 * Sorts an array of objects by a specified key value.
 * @param params - The parameters for sorting, including the array of objects, the key to sort by, and the order (ascending or descending).
 * @returns The sorted array.
 */
export const sortByKeyValue = <T extends TObject>({
    array,
    key,
    order = 'ASC'
}: SortParams<T>): T[] => {
    const sortedArray = array.toSorted((a, b) => {
        const aValue = getKeyValue({ object: a, key });
        const bValue = getKeyValue({ object: b, key });

        if (typeof aValue === 'number' && typeof bValue === 'number') {
            return aValue - bValue;
        }
        if (aValue instanceof Date && bValue instanceof Date) {
            return aValue.getTime() - bValue.getTime();
        }
        if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
            return Number(aValue) - Number(bValue);
        }
        return String(aValue).toLowerCase() >= String(bValue).toLowerCase()
            ? 1
            : -1;
    });

    return order === 'ASC' ? sortedArray : sortedArray.reverse();
};
