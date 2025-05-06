/* eslint-disable @typescript-eslint/no-explicit-any */
type Primitive = number | string | boolean | null | undefined;
export type TObject = Record<string, any>;

/**
 * Represents the keys of an object, including nested objects and arrays.
 * This type is useful for creating dynamic forms or validating object structures.
 */
export type KeyOf<T extends TObject> = keyof {
    [K in keyof T as T[K] extends Primitive
        ? K
        : K extends string
        ?
              | K
              | (T[K] extends Array<infer U>
                    ? U extends Primitive
                        ? `${K}.${number}`
                        : `${K}.${number}.${KeyOf<T[K][number]>}`
                    : `${K}.${KeyOf<T[K]>}`)
        : never]: unknown;
};

/**
 * Represents the keys of an object, including nested objects and arrays,
 * but ignores the positions of arrays.
 * This type is useful for creating dynamic forms or validating object structures.
 */
export type SimpleKeyOf<T extends TObject> = keyof {
    [K in keyof T as T[K] extends Primitive
        ? K
        : K extends string
        ?
              | K
              | (T[K] extends Array<infer U>
                    ? U extends Primitive
                        ? never
                        : `[${K}].${KeyOf<T[K][number]>}`
                    : `${K}.${KeyOf<T[K]>}`)
        : never]: unknown;
};

/**
 * Represents the deepest keys of an object, including nested objects and arrays.
 * This type is useful for creating dynamic forms or validating object structures.
 */
export type DeepKeyOf<T extends TObject> = keyof {
    [K in keyof T as T[K] extends Primitive
        ? K
        : K extends string
        ? T[K] extends Array<infer U>
            ? U extends Primitive
                ? K
                : `${K}.${number}.${DeepKeyOf<T[K][number]>}`
            : `${K}.${DeepKeyOf<T[K]>}`
        : never]: unknown;
};

/**
 * Represents the deepest keys of an object, including nested objects and arrays,
 * but ignores the positions of arrays.
 * This type is useful for creating dynamic forms or validating object structures.
 */
export type SimpleDeepKeyOf<T extends TObject> = keyof {
    [K in keyof T as T[K] extends Primitive
        ? K
        : K extends string
        ? T[K] extends Array<infer U>
            ? U extends Primitive
                ? K
                : `[${K}].${DeepKeyOf<T[K][number]>}`
            : `${K}.${DeepKeyOf<T[K]>}`
        : never]: unknown;
};
