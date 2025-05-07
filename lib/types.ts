type Primitive = number | string | boolean | null | undefined;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
                        :
                              | `${K}.${number}`
                              | `[${K}].${KeyOf<T[K][number]>}`
                              | `${K}.${number}.${KeyOf<T[K][number]>}`
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
                :
                      | `[${K}].${DeepKeyOf<T[K][number]>}`
                      | `${K}.${number}.${DeepKeyOf<T[K][number]>}`
            : `${K}.${DeepKeyOf<T[K]>}`
        : never]: unknown;
};
