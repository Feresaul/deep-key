/* eslint-disable @typescript-eslint/no-explicit-any */
import type { KeyOf, TObject } from '../types';

/**
 * Gets the value of a key in an object, including nested keys.
 * @param object The object to get the value from.
 * @param key The key to get the value for. Can be a nested key (e.g. 'key1.key2.key3').
 * @returns The value of the key in the object.
 */
export const getKeyValue = <T extends TObject>(
    object: T,
    key: KeyOf<T>
): any => {
    const subKeys = (key as string)
        .split('.')
        .map((key) => key.replace(/[[\]]/g, ''));
    // Initialize the value with the object
    let value: any = object;

    // If the object is an array, return undefined
    // This is to prevent the function from returning an array empty objects
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
        value = value.map((item) => item?.[key]);
    });

    // Return the value for the desired key
    return value;
};
