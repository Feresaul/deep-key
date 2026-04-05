A utility library designed to simplify working with deeply nested objects in TypeScript.
This is intended to be used when you work with dynamic keys or when you are not sure if the property exists.
It provides a set of functions so you don't have to deal with the complexity of checking for the existence of properties at each level of the object.

## Features

- Safely access deeply nested properties.
- Filter arrays based on nested properties.
- Sort arrays based on nested properties.
- Lightweight and easy to integrate.

## Installation

```bash
npm install @nuc-lib/deep-key
```

## Usage

### Accessing Nested Properties

The `getKeyValue` utility lets you access nested properties using a dot notation string.
If the property does not exist, it returns `undefined` instead of throwing an error.

The key is a string that represents the path to the property you want to access.
The path is defined using dot notation, where each level of the object is separated by a dot.

```javascript
import { getKeyValue } from '@nuc-lib/deep-key';

const guy = {
    id: 2,
    personalInfo: {
        name: 'John Doe',
        age: 12,
        city: 'New York'
    },
    contacts: [
        { name: 'Jane Doe', email: 'afk@example.com' },
        { name: 'Alice Smith', email: 'alice@example.com' },
        { name: 'Bob Johnson', email: 'bob@example.com' },
        { name: 'Charlie Brown', email: 'charlie@example.com' }
    ],
    associatedIds: [23, 43, 67, 89]
};

getKeyValue({ object: guy, key: 'personalInfo.name' }); // 'John Doe'
getKeyValue({ object: guy, key: 'personalInfo.age' }); // 12
getKeyValue({ object: guy, key: 'personalInfo.city' }); // 'New York'
```

For arrays there are two ways to access the values:

- **Getting an element in a specific index.**

```javascript
getKeyValue({ object: guy, key: 'contacts.0' }); // { name: 'Jane Doe', email: 'afk@example.com' }
getKeyValue({ object: guy, key: 'contacts.0.name' }); // 'Jane Doe'
getKeyValue({ object: guy, key: 'contacts.0.email' }); // 'afk@example.com'
```

- **Getting all the values in the array.**
  A key wrapped in `[]` represents an actual mapping over the array, this means it will return an array of values from the parent array.

```javascript
getKeyValue({ object: guy, key: '[contacts].name' });
// ['Jane Doe', 'Alice Smith', 'Bob Johnson', 'Charlie Brown']
```

### Filtering By Nested Properties

The `filterByKeyValue` utility allows you to filter an array of objects based on a nested property.
It returns a new array containing only the objects that satisfy the filter condition.

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

filterByKeyValue({
    array: people,
    key: 'age',
    filter: (value) => (value ? value === 25 : false)
});
// [ { id: 1, name: 'John Doe', age: 25, parentIds: [ 1, 2 ], address: { city: 'Houston', zip: '10001' } } ]
filterByKeyValue({
    array: people,
    key: 'address.city',
    filter: (value) => value === 'Houston'
});
// [
//   { id: 1, name: 'John Doe', age: 25, parentIds: [ 1, 2 ], address: { city: 'Houston', zip: '10001' } },
//   { id: 4, name: 'Bob Johnson', age: 28, parentIds: [7, 8], address: { city: 'Houston', zip: '77001' } }
// ]
filterByKeyValue({
    array: people,
    key: 'age',
    filter: (value) => (value ? value > 25 : false)
});
// [
//   { id: 2, name: 'Jane Doe', age: 30, parentIds: [3, 4], address: { city: 'Los Angeles', zip: '90001' } },
//   { id: 4, name: 'Bob Johnson', age: 28, parentIds: [7, 8], address: { city: 'Houston', zip: '77001' } }
// ]
filterByKeyValue({
    array: people,
    key: 'age',
    filter: (value) => [22, 25].includes(value)
});
// [
//   { id: 1, name: 'John Doe', age: 25, parentIds: [ 1, 2 ], address: { city: 'Houston', zip: '10001' } },
//   { id: 3, name: 'Alice Smith', age: 22, parentIds: [5, 6], address: { city: 'Chicago', zip: '60601' } },
// ]
```

### Sorting By Nested Properties

The `sortByKeyValue` utility allows you to sort an array of objects based on a nested property.
It returns a new array sorted in ascending order by default.

```javascript
import { sortByKeyValue } from '@nuc-lib/deep-key';

sortByKeyValue({ array: people, key: 'name' });
// [
//     { id: 3, name: 'Alice Smith', age: 22, parentIds: [5, 6], address: { city: 'Chicago', zip: '60601' } },
//     { id: 4, name: 'Bob Johnson', age: 28, parentIds: [7, 8], address: { city: 'Houston', zip: '77001' } },
//     { id: 2, name: 'Jane Doe', age: 30, parentIds: [3, 4], address: { city: 'Los Angeles', zip: '90001' } },
//     { id: 1, name: 'John Doe', age: 25, parentIds: [ 1, 2 ], address: { city: 'Houston', zip: '10001' } }
// ]
sortByKeyValue({ array: people, key: 'address.city' });
// [
//     { id: 3, name: 'Alice Smith', age: 22, parentIds: [5, 6], address: { city: 'Chicago', zip: '60601' } },
//     { id: 1, name: 'John Doe', age: 25, parentIds: [ 1, 2 ], address: { city: 'Houston', zip: '10001' } },
//     { id: 4, name: 'Bob Johnson', age: 28, parentIds: [7, 8], address: { city: 'Houston', zip: '77001' } },
//     { id: 2, name: 'Jane Doe', age: 30, parentIds: [3, 4], address: { city: 'Los Angeles', zip: '90001' } }
// ]
sortByKeyValue({ array: people, key: 'address.zip' });
// [
//     { id: 1, name: 'John Doe', age: 25, parentIds: [ 1, 2 ], address: { city: 'Houston', zip: '10001' } },
//     { id: 3, name: 'Alice Smith', age: 22, parentIds: [5, 6], address: { city: 'Chicago', zip: '60601' } },
//     { id: 4, name: 'Bob Johnson', age: 28, parentIds: [7, 8], address: { city: 'Houston', zip: '77001' } },
//     { id: 2, name: 'Jane Doe', age: 30, parentIds: [3, 4], address: { city: 'Los Angeles', zip: '90001' } }
// ]
```
