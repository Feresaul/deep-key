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
    it('should filter array', () => {
        expect(
            filterByKeyValue({
                array: people,
                key: 'age',
                filter: (value) => (value ? value >= 30 : false)
            })
        ).toEqual([
            {
                id: 2,
                name: 'Jane Doe',
                age: 30,
                parentIds: [3, 4],
                address: { city: 'Los Angeles', zip: '90001' }
            }
        ]);

        expect(
            filterByKeyValue({
                array: people,
                key: 'age',
                filter: (value) => (value ? [21, 43].includes(value) : false)
            })
        ).toEqual([]);

        expect(
            filterByKeyValue({
                array: people,
                key: 'age',
                filter: (value) => (value ? value > 25 : false)
            })
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

    it('should filter array - nested key', () => {
        expect(
            filterByKeyValue({
                array: people,
                key: 'address.city',
                filter: (value) => value === 'Los Angeles'
            })
        ).toEqual([
            {
                id: 2,
                name: 'Jane Doe',
                age: 30,
                parentIds: [3, 4],
                address: { city: 'Los Angeles', zip: '90001' }
            }
        ]);

        expect(
            filterByKeyValue({
                array: people,
                key: 'address.city',
                filter: (value) => value === 'Houston'
            })
        ).toEqual([
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

    it('should filter array - object value', () => {
        expect(
            filterByKeyValue({
                array: people,
                key: 'address',
                filter: (value) =>
                    value?.city === 'Houston' && value?.zip === '10001'
            })
        ).toEqual([
            {
                id: 1,
                name: 'John Doe',
                age: 25,
                parentIds: [1, 2],
                address: { city: 'Houston', zip: '10001' }
            }
        ]);
    });

    it('should filter array - array value', () => {
        expect(
            filterByKeyValue({
                array: people,
                key: 'parentIds',
                filter: (value) => (value ? value.includes(3) : false)
            })
        ).toEqual([
            {
                id: 2,
                name: 'Jane Doe',
                age: 30,
                parentIds: [3, 4],
                address: { city: 'Los Angeles', zip: '90001' }
            }
        ]);
    });
});
