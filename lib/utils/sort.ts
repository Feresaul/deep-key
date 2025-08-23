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
}: SortParams<T>) => {
    const sortedArray = array.slice().sort((a, b) => {
        return String(getKeyValue({ object: a, key })).toLowerCase() >=
            String(getKeyValue({ object: b, key })).toLowerCase()
            ? 1
            : -1;
    });

    return order === 'ASC' ? sortedArray : sortedArray.reverse();
};
