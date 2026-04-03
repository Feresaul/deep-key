/* eslint-disable @typescript-eslint/no-explicit-any */
import type { DeepTypeOfKey, KeyOf, TObject } from '../types';

type Params<T extends TObject, K extends KeyOf<T>> = {
    object: T;
    key: K;
};

/**
 * Gets the value of a key in an object, including nested keys.
 * @param params - The parameters for getting the key value, including the object and the key
 * The key is represented as a string, with nested keys separated by dots (e.g. `key1.key2.key3`).
 * @returns The value of the key in the object.
 */
export const getKeyValue = <T extends TObject, K extends KeyOf<T>>({
    object,
    key
}: Params<T, K>): DeepTypeOfKey<T, K> | undefined => {
    const subKeys = String(key)
        .split('.')
        .map((key) => key.replace(/[[\]]/g, ''));
    // Initialize the value with the object
    let value: any = object;

    // If the object is an array, return undefined
    // This is to prevent the function from returning an array of empty objects
    if (Array.isArray(object)) {
        return undefined;
    }

    // Iterate over the subKeys to get the nested value
    subKeys.forEach((key) => {
        if (!Array.isArray(value)) {
            value = value?.[key];
            return;
        }
        // If the key is a number, get the value at that index
        if (Number.isSafeInteger(Number(key))) {
            value = value?.[Number(key)];
            return;
        }

        value = value.map((item) => {
            const mapValue = (vItem: any): unknown => {
                if (!Array.isArray(vItem)) {
                    return vItem?.[key];
                }
                return vItem.map((subItem) => mapValue(subItem));
            };
            return mapValue(item);
        });
    });

    // Return the value for the desired key
    return value;
};
