# Filter utilities

`filterByKeyValue` walks an array and applies a filter function to the value resolved from a nested path.
The callback receives the resolved value and decides whether the item should be kept.

Parameters:

- `array` (`T[]`, where `T extends TObject`): Collection to filter.
- `key` (`K extends KeyOf<T>`): Path used to resolve the value from each item.
- `filter` (`(value: DeepTypeOfKey<T, K> | undefined) => boolean`): Callback that returns `true` to keep the item or `false` to discard it.

Type signature:

```typescript
filterByKeyValue<T extends TObject, K extends KeyOf<T>>({
    array,
    key,
    filter
}): T[]
```

## Shared setup

```javascript
import { filterByKeyValue } from '@nuc-lib/deep-key';

const people = [
    {
        id: 1,
        name: 'John Doe',
        age: 25,
        parentIds: [1, 2],
        address: { city: 'Houston', zip: '10001' }
    },
    {
        id: 2,
        name: 'Jane Doe',
        age: 30,
        parentIds: [3, 4],
        address: { city: 'Los Angeles', zip: '90001' }
    },
    {
        id: 3,
        name: 'Alice Smith',
        age: 22,
        parentIds: [5, 6],
        address: { city: 'Chicago', zip: '60601' }
    },
    {
        id: 4,
        name: 'Bob Johnson',
        age: 28,
        parentIds: [7, 8],
        address: { city: 'Houston', zip: '77001' }
    }
];
```

## Filter by key

Use this when the property is a simple value like a number, string, or boolean and the callback only needs that field.

```javascript
filterByKeyValue({
    array: people,
    key: 'age',
    filter: (value) => (value ? value >= 30 : false)
});
```

Expected result:

```javascript
[
    {
        id: 2,
        name: 'Jane Doe',
        age: 30,
        parentIds: [3, 4],
        address: { city: 'Los Angeles', zip: '90001' }
    }
];
```

## Filter by nested key

Use this when the condition depends on a value inside a nested object, such as a city inside an address.

```javascript
filterByKeyValue({
    array: people,
    key: 'address.city',
    filter: (value) => value === 'Los Angeles'
});
```

Expected result:

```javascript
[
    {
        id: 2,
        name: 'Jane Doe',
        age: 30,
        parentIds: [3, 4],
        address: { city: 'Los Angeles', zip: '90001' }
    }
];
```

## Filter by object values

Use this when the callback needs access to multiple properties from the same nested object.

```javascript
filterByKeyValue({
    array: people,
    key: 'address',
    filter: (value) => value?.city === 'Houston' && value?.zip === '10001'
});
```

Expected result:

```javascript
[
    {
        id: 1,
        name: 'John Doe',
        age: 25,
        parentIds: [1, 2],
        address: { city: 'Houston', zip: '10001' }
    }
];
```

## Filter by array values

Use this when the property itself is an array and the callback needs to inspect its contents.

```javascript
filterByKeyValue({
    array: people,
    key: 'parentIds',
    filter: (value) => (value ? value.includes(3) : false)
});
```

Expected result:

```javascript
[
    {
        id: 2,
        name: 'Jane Doe',
        age: 30,
        parentIds: [3, 4],
        address: { city: 'Los Angeles', zip: '90001' }
    }
];
```
