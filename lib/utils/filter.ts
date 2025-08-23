import { getKeyValue } from './value';

import type { DeepKeyOf, TObject } from '../types';

type FilterParams<T extends TObject> = {
    array: T[];
    key: DeepKeyOf<T>;
    filter: (value: unknown) => boolean;
};

/**
 * This function filters an array of objects based on a specific key and value.
 * It returns a new array containing only the objects that match the given key-value pair based on the specified filter criteria and options.
 * @param params - The parameters for filtering, including the array of objects, the key to filter by, and the filter function.
 * @returns A new array with the filtered objects.
 */
export const filterByKeyValue = <T extends TObject>({
    array,
    filter,
    key
}: FilterParams<T>) => {
    return array.filter((item) => {
        const itemKeyValue = getKeyValue({ object: item, key });

        // Early return if itemKeyValue is undefined
        if (!itemKeyValue) {
            return false;
        }
        return filter(itemKeyValue);
    });
};
