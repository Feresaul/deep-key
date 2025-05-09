import { describe, it, expect } from 'vitest';

import { sortByKeyValue } from '../lib/utils/sort';

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

describe('sortByKeyValue', () => {
    it('should sort by key value', () => {
        expect(sortByKeyValue(people, 'name')).toEqual([
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
        ]);

        expect(sortByKeyValue(people, 'age')).toEqual([
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
        ]);

        expect(sortByKeyValue(people, 'address.city')).toEqual([
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
        ]);

        expect(sortByKeyValue(people, 'address.zip')).toEqual([
            {
                id: 1,
                name: 'John Doe',
                age: 25,
                parentIds: [1, 2],
                address: { city: 'Houston', zip: '10001' }
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
            },
            {
                id: 2,
                name: 'Jane Doe',
                age: 30,
                parentIds: [3, 4],
                address: { city: 'Los Angeles', zip: '90001' }
            }
        ]);

        expect(sortByKeyValue(people, 'parentIds')).toEqual([
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
        ]);
    });
});
