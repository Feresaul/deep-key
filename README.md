A utility library designed to simplify working with deeply nested objects in JavaScript. This is intended to be used when you work with dynamic keys or when you are not sure if the property exists. It provides a set of functions so you don't have to deal with the complexity of checking for the existence of properties at each level of the object.

## Features

-   Safely access deeply nested properties.
-   Filter arrays based on nested properties.
-   Sort arrays based on nested properties.
-   Lightweight and easy to integrate.

## Usage

### Accessing Nested Properties

The `getKeyValue` utility lets you access nested properties using a dot notation string. If the property does not exist, it returns `undefined` instead of throwing an error.

The key is a string that represents the path to the property you want to access. The path is defined using dot notation, where each level of the object is separated by a dot.

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

getKeyValue(guy, 'personalInfo.name'); // 'John Doe'
getKeyValue(guy, 'personalInfo.age'); // 12
getKeyValue(guy, 'personalInfo.city'); // 'New York'
getKeyValue(guy, 'personalInfo.active'); // undefined -> no error thrown
```

For arrays there are two ways to access the values:

-   **Getting an element in a specific index.**

```javascript
getKeyValue(guy, 'contacts.0');
// { name: 'Jane Doe', email: 'afk@example.com' }
getKeyValue(guy, 'contacts.0.name'); // 'Jane Doe'
getKeyValue(guy, 'contacts.0.email'); // 'afk@example.com'
```

-   **Getting all the values in the array.**
    A key wrapped in `[]` represents an actual mapping over the array, this means it will return an array of values from the parent array.

> **Note:** There is no need to use the `[]` notation if you are not using TypeScript. The utility will still map over the array and return the values. This is just a visual aid to show that the key is an array to be mapped.

```javascript
getKeyValue(guy, '[contacts].name');
// ['Jane Doe', 'Alice Smith', 'Bob Johnson', 'Charlie Brown']
getKeyValue(guy, 'contacts.name');
// ['Jane Doe', 'Alice Smith', 'Bob Johnson', 'Charlie Brown'] -> Works the same as above
getKeyValue(guy, '[contacts].invalidKey');
// [undefined, undefined, undefined, undefined] -> no error thrown
```

### Filtering By Nested Properties

The `filterByKeyValue` utility allows you to filter an array of objects based on a nested property. It returns a new array containing only the objects that match the specified key and value.

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

filterByKeyValue(people, 'age', 25);
// [ { id: 1, name: 'John Doe', age: 25, parentIds: [ 1, 2 ], address: { city: 'Houston', zip: '10001' } } ]

filterByKeyValue(people, 'address.city', 'Houston');
// [
//   { id: 1, name: 'John Doe', age: 25, parentIds: [ 1, 2 ], address: { city: 'Houston', zip: '10001' } },
//   { id: 4, name: 'Bob Johnson', age: 28, parentIds: [7, 8], address: { city: 'Houston', zip: '77001' } }
// ]
filterByKeyValue(people, 'address', 'Houston');
// [] -> no error thrown
```

Strict mode for filter arrays is also supported. This means that the filter will only return the objects that match the exact value of the key.

```javascript
filterByKeyValue(people, 'age', [22, 25]);
// []
```

You can do a **loose filter** by passing `false` as the fourth argument.
This means that the filter will return the objects that match any of the values in the array.

```javascript
filterByKeyValue(people, 'age', [22, 25], false);
// [
//   { id: 1, name: 'John Doe', age: 25, parentIds: [ 1, 2 ], address: { city: 'Houston', zip: '10001' } },
//   { id: 3, name: 'Alice Smith', age: 22, parentIds: [5, 6], address: { city: 'Chicago', zip: '60601' } },
// ]
```

Use a custom filter function by passing a function as the third argument.

```javascript
filterByKeyValue(people, 'age', (value) => value > 25);
// [
//   { id: 2, name: 'Jane Doe', age: 30, parentIds: [3, 4], address: { city: 'Los Angeles', zip: '90001' } },
//   { id: 4, name: 'Bob Johnson', age: 28, parentIds: [7, 8], address: { city: 'Houston', zip: '77001' } }
// ]
```
