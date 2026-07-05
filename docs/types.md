# Exported types

These types are exported by the library and can be imported from `@nuc-lib/deep-key`.

## `TObject`

Represents the base object shape used by utility generics.

```typescript
type TObject = Record<string, any>;
```

Use it when defining helper functions or wrappers that should accept any supported object.

## `KeyOf<T>`

Builds valid key paths for an object, including nested properties and array index patterns.

```typescript
type ValidKey = KeyOf<User>;
```

Use it when a function should accept any readable/updatable key path for `T`.

## `DeepKeyOf<T>`

Builds deep key paths intended for deep-value operations.

```typescript
type SortableKey = DeepKeyOf<User>;
```

Use it when requiring deep keys for operations like sorting.

## `DeepTypeOfKey<T, K>`

Resolves the value type found at path `K` in object `T`.

```typescript
type CityType = DeepTypeOfKey<User, 'address.city'>;
```

Use it to type values derived from dynamic key paths.

## `DeepReplaceTypeOfObject<T, K, V>`

Builds the resulting object type when key `K` in object `T` is replaced with `V`.

```typescript
type UpdatedUser = DeepReplaceTypeOfObject<User, 'address.city', number>;
```

Use it when authoring wrappers around `updateKeyValue` that depend on replaced value types.
