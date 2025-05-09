import { getKeyValue } from './value';

import type { DeepKeyOf, TObject } from '../types';

type FilterValue = string | number | boolean | string[] | number[];

/**
 * This function filters an array of objects based on a specific key and value.
 * It returns a new array containing only the objects that match the given key-value pair.
 * @param list The array of objects to filter.
 * @param key The key to filter by.
 * @param filter The value to filter by. This can be a single value or an array of values.
 * It also supports a function that takes the value of the key and returns a boolean.
 * @param mode The mode of filtering. 'strict' checks for exact matches, while 'loose' allows for partial matches.
 * Only applies to array filter values.
 * This is ignored if custom filter function is provided.
 * @returns A new array of objects that match the specified key-value pair.
 */
export const filterByKeyValue = <T extends TObject>(
    list: T[],
    key: DeepKeyOf<T>,
    filter: ((value: FilterValue) => boolean) | FilterValue,
    strict = true
) => {
    if (!Array.isArray(list)) {
        console.error('The first argument must be an array.');
        return [];
    }
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
