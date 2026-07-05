type Primitive = number | string | boolean | null | undefined;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TObject = Record<string, any>;

/**
 * Represents the keys of an object, including nested objects and arrays.
 * This type is useful for creating dynamic forms or validating object structures.
 * @template T - The object type.
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
 * @template T - The object type.
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
 * @template T - The object type.
 * @template K - The key path.
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

/**
 * Represents the type of an object with a specific key replaced by a new value, including nested keys.
 * Target key type is replaced with the new value type, while other keys retain their original types.
 * This means undefined, null get replaced with the new value type, while other keys retain their original types.
 * This type is useful for creating dynamic forms or validating object structures.
 * @template T - The object type.
 * @template K - The key path.
 * @template V - The new value type.
 */

export type DeepReplaceTypeOfObject<T extends TObject, K extends string, V> =
    // array.0.x
    K extends `${infer Key}.${number}.${infer Rest}`
        ? Key extends keyof T
            ? NonNullable<T[Key]> extends Array<infer U>
                ? U extends TObject
                    ? {
                          [P in keyof T]: P extends Key
                              ?
                                    | Array<DeepReplaceTypeOfObject<U, Rest, V>>
                                    | Extract<T[P], null | undefined>
                              : T[P];
                      }
                    : never
                : never
            : never
        : // array.0
          K extends `${infer Key}.${number}`
          ? Key extends keyof T
              ? NonNullable<T[Key]> extends Array<unknown>
                  ? {
                        [P in keyof T]: P extends Key
                            ? Array<V> | Extract<T[P], null | undefined>
                            : T[P];
                    }
                  : never
              : never
          : // [array].x
            K extends `[${infer Key}].${infer Rest}`
            ? Key extends keyof T
                ? NonNullable<T[Key]> extends Array<infer U>
                    ? U extends TObject
                        ? {
                              [P in keyof T]: P extends Key
                                  ?
                                        | Array<
                                              DeepReplaceTypeOfObject<
                                                  U,
                                                  Rest,
                                                  V
                                              >
                                          >
                                        | Extract<T[P], null | undefined>
                                  : T[P];
                          }
                        : never
                    : never
                : never
            : // [array]
              K extends `[${infer Key}]`
              ? Key extends keyof T
                  ? NonNullable<T[Key]> extends Array<unknown>
                      ? {
                            [P in keyof T]: P extends Key
                                ? Array<V> | Extract<T[P], null | undefined>
                                : T[P];
                        }
                      : never
                  : never
              : // object.key
                K extends `${infer Key}.${infer Rest}`
                ? Key extends keyof T
                    ? NonNullable<T[Key]> extends TObject
                        ? {
                              [P in keyof T]: P extends Key
                                  ?
                                        | DeepReplaceTypeOfObject<
                                              NonNullable<T[Key]>,
                                              Rest,
                                              V
                                          >
                                        | Extract<T[P], null | undefined>
                                  : T[P];
                          }
                        : never
                    : never
                : // direct key
                  K extends keyof T
                  ? Omit<T, K> & { [P in K]-?: V }
                  : never;
