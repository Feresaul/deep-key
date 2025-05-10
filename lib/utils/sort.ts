import { getKeyValue } from './value';

import type { DeepKeyOf, TObject } from '../types';

/**
 * Sorts an array of objects by a specified key value.
 * @param array The array to sort.
 * @param key The key to sort by.
 * @param order The order to sort by. Can be 'ASC' or 'DESC'. Default is 'ASC'.
 * @returns The sorted array.
 */
export const sortByKeyValue = <T extends TObject>(
    array: T[],
    key: DeepKeyOf<T>,
    order: 'ASC' | 'DESC' = 'ASC'
) => {
    const sortedArray = array.slice().sort((a, b) => {
        return String(getKeyValue(a, key)).toLowerCase() >=
            String(getKeyValue(b, key)).toLowerCase()
            ? 1
            : -1;
    });

    return order === 'ASC' ? sortedArray : sortedArray.reverse();
};
