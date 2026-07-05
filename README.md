# deep-key

`deep-key` is a utility for working with deeply nested objects in TypeScript.
It helps you read, filter, sort, and update properties without writing manual guards at every level.

## Features

- Safe access to nested properties.
- Reading and mapping arrays with dynamic paths.
- Filtering arrays by nested properties.
- Sorting arrays by nested properties.
- Immutable updates for nested values.

## Documentation

- [General guide](docs/README.md)
- [Value utilities](docs/value.md)
- [Filter utilities](docs/filter.md)
- [Sort utilities](docs/sort.md)
- [Exported types](docs/types.md)

## Installation

```bash
npm install @nuc-lib/deep-key
```

## Usage

```typescript
import {
    filterByKeyValue,
    getKeyValue,
    sortByKeyValue,
    updateKeyValue
} from '@nuc-lib/deep-key';
```

If you want to see every scenario covered by each utility, check the separate documentation files in `docs/`.

### Reading and updating values

See [docs/value.md](docs/value.md) for `getKeyValue` and `updateKeyValue` examples.

### Filtering and sorting

See [docs/filter.md](docs/filter.md) for `filterByKeyValue` and [docs/sort.md](docs/sort.md) for `sortByKeyValue`.

## Quick examples

```javascript
const guy = {
    personalInfo: { name: 'John Doe' },
    contacts: [{ name: 'Jane Doe' }, { name: 'Alice Smith' }]
};

getKeyValue({ object: guy, key: 'personalInfo.name' });
// 'John Doe'

getKeyValue({ object: guy, key: '[contacts].name' });
// ['Jane Doe', 'Alice Smith']

updateKeyValue({
    object: guy,
    key: 'personalInfo.name',
    value: 'Jane Smith'
});
// { personalInfo: { name: 'Jane Smith' }, contacts: [{ name: 'Jane Doe' }, { name: 'Alice Smith' }] }

filterByKeyValue({
    array: [{ age: 25 }, { age: 30 }],
    key: 'age',
    filter: (value) => value === 30
});
// [{ age: 30 }]

sortByKeyValue({
    array: [{ name: 'Bob' }, { name: 'Alice' }],
    key: 'name'
});
// [{ name: 'Alice' }, { name: 'Bob' }]
```
