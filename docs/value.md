# Value utilities

The value utilities group `getKeyValue` and `updateKeyValue`.
With these functions you can read nested paths, map arrays, and update values without mutating the original object.

## `getKeyValue`

It receives an object and a dot-notation path. If the path does not exist, it returns `undefined`.

Parameters:

- `object` (`T extends TObject`): Source object where the value will be read.
- `key` (`K extends KeyOf<T>`): Path to resolve. Supports direct keys (`id`), nested keys (`personalInfo.name`), index access (`contacts.0`), and array mapping (`[contacts].name`).

### Shared setup

```javascript
import { getKeyValue } from '@nuc-lib/deep-key';

const guy = {
    id: 1,
    personalInfo: { name: 'John Doe', age: 12, city: 'New York' },
    contacts: [
        {
            name: 'Jane Doe',
            email: 'afk@example.com',
            referrals: [{ name: 'Valentina' }]
        },
        {
            name: 'Alice Smith',
            email: 'alice@example.com'
        },
        {
            name: 'Bob Johnson',
            email: 'bob@example.com',
            referrals: [{ name: 'Charlie' }, { name: 'Gustav' }]
        },
        {
            name: 'Charlie Brown',
            email: 'charlie@example.com',
            referrals: []
        }
    ],
    associatedIds: [23, 43, 67, 89]
};
```

### Direct key

Use this when you want the value of a top-level property with no nesting or array traversal.

```javascript
getKeyValue({ object: guy, key: 'id' });
```

Expected result:

```javascript
1;
```

### Nested key

Use this when you need to read a property from an object nested inside another object.

```javascript
getKeyValue({ object: guy, key: 'personalInfo.name' });
```

Expected result:

```javascript
'John Doe';
```

### Array index key

Use this when you want a single element from an array by position.

```javascript
getKeyValue({ object: guy, key: 'contacts.0' });
```

Expected result:

```javascript
{ name: 'Jane Doe', email: 'afk@example.com', referrals: [{ name: 'Valentina' }] }
```

### Array index key in an object

Use this when you need a nested property from a specific array item.

```javascript
getKeyValue({ object: guy, key: 'contacts.0.name' });
```

Expected result:

```javascript
'Jane Doe';
```

### Array mapping

Use `[]` when the same property exists in every element of an array and you want to map all of them at once.

```javascript
getKeyValue({ object: guy, key: '[contacts].name' });
```

Expected result:

```javascript
['Jane Doe', 'Alice Smith', 'Bob Johnson', 'Charlie Brown'];
```

### Nested array mapping

Use nested `[]` segments when each item can contain its own array and you want to map across both levels.

```javascript
getKeyValue({ object: guy, key: '[contacts].[referrals].name' });
```

Expected result:

```javascript
[['Valentina'], undefined, ['Charlie', 'Gustav'], []];
```

## `updateKeyValue`

Updates a nested path without mutating the original object.
It supports direct property replacement, updates inside arrays, and mapping with `[]`.

Parameters:

- `object` (`T extends TObject`): Source object to update.
- `key` (`K extends KeyOf<T>`): Target path to update. Supports direct keys, nested keys, index access, and `[]` array mapping.
- `value` (`DeepTypeOfKey<T, K>` by default): New value assigned at the target path. With `replace: true`, this can be a replacement type.
- `replace` (`boolean`, optional, default `false`): When `true`, fully replaces the target value instead of preserving the previous structure.

### Shared setup

```javascript
import { updateKeyValue } from '@nuc-lib/deep-key';

const guy = {
    id: 1,
    personalInfo: { name: 'John Doe', age: 12, city: 'New York' },
    associatedIds: [23, 43, 67, 89],
    contacts: [
        {
            name: 'Jane Doe',
            email: 'afk@example.com',
            referrals: [{ name: 'Valentina', email: 'valentina@example.com' }]
        },
        {
            name: 'Alice Smith',
            email: 'alice@example.com'
        },
        {
            name: 'Bob Johnson',
            email: 'bob@example.com',
            referrals: [
                { name: 'Charlie', email: 'charlie@example.com' },
                { name: 'Gustav', email: 'gustav@example.com' }
            ]
        },
        {
            name: 'Charlie Brown',
            email: 'charlie@example.com',
            referrals: []
        }
    ]
};
```

### Direct key

Use this when you want to replace a top-level property with a new value.

```javascript
updateKeyValue({ object: guy, key: 'id', value: 10 });
```

Expected result:

```javascript
'newGuy.id' = 10;
```

### Nested key

Use this when the target lives inside an object and you want to update one nested property.

```javascript
updateKeyValue({
    object: guy,
    key: 'personalInfo.city',
    value: 'New York City'
});
```

Expected result:

```javascript
'newGuy.personalInfo.city' = 'New York City';
```

### Array value key

Use this when the property itself is an array and you want to replace the whole array value.

```javascript
updateKeyValue({
    object: guy,
    key: 'associatedIds',
    value: [2, 3, 4]
});
```

Expected result:

```javascript
'newGuy.associatedIds' = [2, 3, 4];
```

### Nested key in an array item

Use this when you want to update one property inside a specific array item.

```javascript
updateKeyValue({
    object: guy,
    key: 'contacts.0.email',
    value: 'jane@example.com'
});
```

Expected result:

```javascript
'newGuy.contacts.0.email' = 'jane@example.com';
```

### Nested array key

Use this when you want to update a deeply nested item that itself sits inside an array.

```javascript
import { getKeyValue } from '@nuc-lib/deep-key';

const updatedGuy = updateKeyValue({
    object: guy,
    key: 'contacts.0.referrals.0',
    value: { name: 'Test Referral', email: 'test@example.com' }
});

getKeyValue({
    object: updatedGuy,
    key: 'contacts.0.referrals.0'
});
```

Expected result:

```javascript
'newGuy.contacts.0.referrals.0' = { name: 'Test Referral', email: 'test@example.com' };
```

### Array mapping updates

Use nested `[]` segments when the same update should be applied to every matching item at every array level.

```javascript
const newGuy = updateKeyValue({
    object: guy,
    key: '[contacts].[referrals].name',
    value: 'Test Referral'
});
```

Expected result:

```javascript
'newGuy.[contacts].[referrals].name' =
[
    [{ name: 'Test Referral', email: 'valentina@example.com' }],
    undefined,
    [
        { name: 'Test Referral', email: 'charlie@example.com' },
        { name: 'Test Referral', email: 'gustav@example.com' }
    ],
    []
];
```

### Replace mode

Use `replace: true` when the new value has a different shape and should fully replace the existing property.

```javascript
updateKeyValue({
    object: guy,
    key: '[contacts].referrals',
    value: {
        names: ['Julian', 'Penelope', 'Kate'],
        date: 'January 1, 2024'
    },
    replace: true
});
```

Expected result:

```javascript
'newGuy.[contacts].referrals' =
[
    { names: ['Julian', 'Penelope', 'Kate'], date: 'January 1, 2024' },
    { names: ['Julian', 'Penelope', 'Kate'], date: 'January 1, 2024' },
    { names: ['Julian', 'Penelope', 'Kate'], date: 'January 1, 2024' },
    { names: ['Julian', 'Penelope', 'Kate'], date: 'January 1, 2024' }
];
```
