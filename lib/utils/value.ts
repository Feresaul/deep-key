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
    const subKeys = (key as string).split('.');
    // Initialize the value with the object
    let value: any = object;

    // Iterate over the subKeys to get the nested value
    subKeys.forEach((key) => {
        value = Array.isArray(value)
            ? value.map((item) => item?.[key])
            : value?.[key];
    });

    // Return the deepest value for the desired key
    return value;
};
