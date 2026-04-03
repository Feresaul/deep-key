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

/**
 * Represents the type of a value at a specific key in an object, including nested keys.
 * This type is useful for creating dynamic forms or validating object structures.
 */
export type DeepTypeOfKey<T extends TObject, K extends string> =
    // array.0.x
    K extends `${infer Key}.${number}.${infer Rest}`
        ? Key extends keyof T
            ? T[Key] extends Array<infer U>
                ? U extends TObject
                    ? DeepTypeOfKey<U, Rest>
                    : never
                : never
            : never
        : // array.0
          K extends `${infer Key}.${number}`
          ? Key extends keyof T
              ? T[Key] extends Array<infer U>
                  ? U
                  : never
              : never
          : // [array].x
            K extends `[${infer Key}].${infer Rest}`
            ? Key extends keyof T
                ? T[Key] extends Array<infer U>
                    ? U extends TObject
                        ? DeepTypeOfKey<U, Rest>
                        : never
                    : never
                : never
            : // [array]
              K extends `[${infer Key}]`
              ? Key extends keyof T
                  ? T[Key] extends Array<infer U>
                      ? U
                      : never
                  : never
              : // object.key
                K extends `${infer Key}.${infer Rest}`
                ? Key extends keyof T
                    ? T[Key] extends TObject
                        ? DeepTypeOfKey<T[Key], Rest>
                        : never
                    : never
                : // direct key
                  K extends keyof T
                  ? T[K]
                  : never;
