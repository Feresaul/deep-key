import { getKeyValue } from './value';

import type { DeepKeyOf, TObject } from '../types';

type FilterValue = string | number | boolean | string[] | number[];

/**
 * This function filters an array of objects based on a specific key and value.
 * It returns a new array containing only the objects that match the given key-value pair.
 * @param list The array of objects to filter.
 * @param key The key to filter by.
 * @param filter The value to filter by. Supports custom filter functions.
 * @param strict Checks for exact matches between arrays if applicable.
 * @returns A new array of objects that match the specified key-value pair.
 */
export const filterByKeyValue = <T extends TObject>(
    list: T[],
    key: DeepKeyOf<T>,
    filter: ((value: FilterValue) => boolean) | FilterValue,
    strict = true
) => {
    return list.filter((item) => {
        const itemKeyValue = getKeyValue(item, key);
        // Early return if itemKeyValue is undefined or an object
        if (!itemKeyValue) {
            return false;
        }
        // Verify if filter is a function and call it with itemKeyValue
        if (typeof filter === 'function') {
            try {
                return filter(itemKeyValue);
            } catch {
                return false;
            }
        }
        // If filter is an array, check if itemKeyValue is in the array
        if (Array.isArray(filter)) {
            if (filter.length === 0) {
                return false;
            }

            if (Array.isArray(itemKeyValue)) {
                if (strict) {
                    return filter.every((val) => itemKeyValue.includes(val));
                }
                return filter.some((val) => itemKeyValue.includes(val));
            }

            if (strict) {
                return filter.every((val) => val === itemKeyValue);
            }
            // If strict is false, check if any of the filter values are in the itemKeyValue
            return filter.some((val) => val === itemKeyValue);
        }
        // If key value is an array check if filter is in the array
        if (Array.isArray(itemKeyValue)) {
            return itemKeyValue.some((val) => val === filter);
        }

        return itemKeyValue === filter;
    });
};
