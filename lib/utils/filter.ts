import { getKeyValue } from './value';

import type { DeepKeyOf, TObject } from '../types';

/**
 * This function filters an array of objects based on a specific key and value.
 * It returns a new array containing only the objects that match the given key-value pair.
 * @param list The array of objects to filter.
 * @param key The key to filter by.
 * @param value The value to match against the specified key.
 * @returns A new array of objects that match the specified key-value pair.
 */
export const filterArrayByKeyValue = <T extends TObject>(
    list: T[],
    key: DeepKeyOf<T>,
    value: string | number | boolean | string[] | number[]
) => {
    return list.filter((item) => {
        if (Array.isArray(value)) {
            if (value.length === 0) {
                return false;
            }
            return value.some((val) => val === getKeyValue(item, key));
        }
        if (value) {
            return true;
        }
        return getKeyValue(item, key) === value;
    });
};
