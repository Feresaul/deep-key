/* eslint-disable @typescript-eslint/no-explicit-any */
import type { KeyOf, TObject } from '../types';

/**
 * This function gets the value of a key from an object
 * @param object the object to get the key value from
 * @param key a composed key to get the nested value
 * @returns the value of the key for the object
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
