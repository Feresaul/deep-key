import { describe, it, expect } from 'vitest';

import { filterByKeyValue } from '../lib/utils/filter';

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

describe('filterByKeyValue', () => {
    it('should filter array by filter value', () => {
        expect(filterByKeyValue(people, 'age', 30)).toEqual([
            {
                id: 2,
                name: 'Jane Doe',
                age: 30,
                parentIds: [3, 4],
                address: { city: 'Los Angeles', zip: '90001' }
            }
        ]);
    });

    it('should filter array by filter value - array strict', () => {
        expect(filterByKeyValue(people, 'age', [22, 25])).toEqual([]);
    });

    it('should filter array by filter value - array loose', () => {
        expect(filterByKeyValue(people, 'age', [22, 25], false)).toEqual([
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
            }
        ]);
    });

    it('should filter array by filter value - array value strict', () => {
        expect(filterByKeyValue(people, 'parentIds', [1, 8])).toEqual([]);
    });

    it('should filter array by filter value - array value loose', () => {
        expect(filterByKeyValue(people, 'parentIds', [1, 8], false)).toEqual([
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
            }
        ]);
    });

    it('should filter array by filter value - custom filter', () => {
        expect(
            filterByKeyValue(people, 'age', (value) => Number(value) > 25)
        ).toEqual([
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
        ]);
    });

    it('should filter array by filter value - nested key', () => {
        expect(filterByKeyValue(people, 'address.city', 'Los Angeles')).toEqual(
            [
                {
                    id: 2,
                    name: 'Jane Doe',
                    age: 30,
                    parentIds: [3, 4],
                    address: { city: 'Los Angeles', zip: '90001' }
                }
            ]
        );
        expect(filterByKeyValue(people, 'address.city', 'Houston')).toEqual([
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
            }
        ]);
    });
});
