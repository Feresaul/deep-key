import { getKeyValue } from './value';

import type { DeepKeyOf, TObject } from '../types';

/**
 * This function sorts an array of objects by a given key and order.
 * @param array the array to sort.
 * @param key the key to sort by.
 * @param order the order to sort by. Available values are 'ASC' and 'DESC'.
 * @returns an array sorted by the given key and order.
 */
export const sortByProp = <T extends TObject>(
    array: T[],
    key: DeepKeyOf<T>,
    order: 'ASC' | 'DESC' = 'ASC'
) => {
    const sortedArray = array.sort((a, b) => {
        return String(getKeyValue(a, key)).toLowerCase() >
            String(getKeyValue(b, key)).toLowerCase()
            ? 1
            : -1;
    });

    return order === 'ASC' ? sortedArray : sortedArray.reverse();
};
