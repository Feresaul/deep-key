# Sort utilities

`sortByKeyValue` sorts an array by the value resolved from a nested path.
It sorts in ascending order by default.

Parameters:

- `array` (`T[]`, where `T extends TObject`): Collection to sort.
- `key` (`DeepKeyOf<T>`): Path used to resolve the sort value from each item.
- `order` (`'ASC' | 'DESC'`, optional, default `'ASC'`): Sort direction.

Type signature:

```typescript
sortByKeyValue<T extends TObject>({
    array,
    key,
    order
}): T[]
```

## Shared setup

```javascript
import { sortByKeyValue } from '@nuc-lib/deep-key';

const people = [
    {
        id: 3,
        name: 'Alice Smith',
        age: 22,
        parentIds: [5, 6],
        address: { city: 'Chicago', zip: '60601' }
    },
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
        id: 4,
        name: 'Bob Johnson',
        age: 28,
        parentIds: [7, 8],
        address: { city: 'Houston', zip: '77001' }
    }
];
```

## Sort by key

Use this when the values are simple top-level properties and you want the array sorted alphabetically or numerically.

```javascript
sortByKeyValue({ array: people, key: 'name' });
```

Expected result:

```javascript
[
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
    },
    {
        id: 2,
        name: 'Jane Doe',
        age: 30,
        parentIds: [3, 4],
        address: { city: 'Los Angeles', zip: '90001' }
    },
    {
        id: 1,
        name: 'John Doe',
        age: 25,
        parentIds: [1, 2],
        address: { city: 'Houston', zip: '10001' }
    }
];
```

## Sort by nested key

Use this when the sort value lives inside a nested object, such as a city name inside an address.

```javascript
sortByKeyValue({ array: people, key: 'address.city' });
```

Expected result:

```javascript
[
    {
        id: 3,
        name: 'Alice Smith',
        age: 22,
        parentIds: [5, 6],
        address: { city: 'Chicago', zip: '60601' }
    },
    {
        id: 1,
        name: 'John Doe',
        age: 25,
        parentIds: [1, 2],
        address: { city: 'Houston', zip: '10001' }
    },
    {
        id: 4,
        name: 'Bob Johnson',
        age: 28,
        parentIds: [7, 8],
        address: { city: 'Houston', zip: '77001' }
    },
    {
        id: 2,
        name: 'Jane Doe',
        age: 30,
        parentIds: [3, 4],
        address: { city: 'Los Angeles', zip: '90001' }
    }
];
```

## Sort by array key

Use this when the property is an array and the sort order should be based on that array value.

```javascript
sortByKeyValue({ array: people, key: 'parentIds' });
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
