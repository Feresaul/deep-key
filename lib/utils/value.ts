/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
    DeepReplaceTypeOfObject,
    DeepTypeOfKey,
    KeyOf,
    TObject
} from '../types';

/**
 * Gets the value of a key in an object, including nested keys.
 * @param params - The parameters for getting the key value, including the object and the key
 * The key is represented as a string, with nested keys separated by dots (e.g. `key1.key2.key3`).
 * @returns The value of the key in the object.
 */
export const getKeyValue = <
    T extends TObject = TObject,
    K extends KeyOf<T> = KeyOf<T>
>({
    object,
    key
}: {
    object: T;
    key: K;
}): DeepTypeOfKey<T, K> | undefined => {
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

/**
 * Sets the value of a key in an object, including nested keys.
 * It does not mutate the original object, but returns a new object with the updated value.
 * @param params - The parameters for setting the key value, including the object, the key, and the value
 * The key is represented as a string, with nested keys separated by dots (e.g. `key1.key2.key3`).
 * @returns The updated object with the new value set at the specified key.
 */
export const updateKeyValue = <
    NV,
    R extends boolean | undefined = false,
    T extends TObject = TObject,
    K extends KeyOf<T> = KeyOf<T>,
    V extends DeepTypeOfKey<T, K> = DeepTypeOfKey<T, K>,
    ReturnType extends DeepReplaceTypeOfObject<T, K, NV> | T = R extends true
        ? DeepReplaceTypeOfObject<T, K, NV>
        : T
>({
    object,
    key,
    value,
    replace = false
}: {
    object: T;
    key: K;
    value: R extends true ? NV : V;
    replace?: R;
}): ReturnType => {
    // Split the key into an array of strings, representing the path to the nested value
    const path = key
        .toString()
        .trim()
        .split('.')
        .map((part) => part.trim())
        .filter(Boolean);

    if (path.length === 0) {
        return object as ReturnType;
    }

    // Recursive function to set the value at the specified path in the object
    const getDeepObjectValueForPath = (
        currentValue: any,
        path: string[]
    ): any => {
        const nextKey = path[0];
        const isArrayMapping = nextKey.startsWith('[') && nextKey.endsWith(']');
        const adjustedKey = nextKey.replace(/^\[|\]$/g, '');

        if (path.length === 1) {
            return { ...currentValue, [adjustedKey]: value };
        }
        if (isArrayMapping) {
            if (
                !replace &&
                (currentValue[adjustedKey] === undefined ||
                    currentValue[adjustedKey] === null)
            ) {
                return currentValue;
            }
            if (Array.isArray(currentValue[adjustedKey])) {
                return {
                    [adjustedKey]: currentValue[adjustedKey].map((item: any) =>
                        getDeepObjectValueForPath(item, path.slice(1))
                    )
                };
            }
        }
        return {
            [adjustedKey]: {
                ...getDeepObjectValueForPath(
                    currentValue[adjustedKey],
                    path.slice(1)
                )
            }
        };
    };
    // Merge the original object with the new value at the specified path
    return { ...object, ...getDeepObjectValueForPath(object, path) };
};
