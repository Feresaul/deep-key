import { describe, it, expect } from 'vitest';

import { getKeyValue } from '../lib/utils/value';

const guy = {
    id: 2,
    personalInfo: { name: 'John Doe', age: 12, city: 'New York' },
    contacts: [
        { name: 'Jane Doe', email: 'afk@example.com' },
        { name: 'Alice Smith', email: 'alice@example.com' },
        { name: 'Bob Johnson', email: 'bob@example.com' },
        { name: 'Charlie Brown', email: 'charlie@example.com' }
    ],
    associatedIds: [23, 43, 67, 89]
};

describe('getKeyValue', () => {
    it('should return the value of a key in an object', () => {
        expect(getKeyValue({ object: guy, key: 'id' })).toBe(guy.id);

        expect(getKeyValue({ object: guy, key: 'personalInfo' })).toBe(
            guy.personalInfo
        );
        expect(getKeyValue({ object: guy, key: 'personalInfo.name' })).toBe(
            guy.personalInfo.name
        );
        expect(getKeyValue({ object: guy, key: 'personalInfo.age' })).toBe(
            guy.personalInfo.age
        );
        expect(getKeyValue({ object: guy, key: 'personalInfo.city' })).toBe(
            guy.personalInfo.city
        );

        guy.contacts.forEach((contact, index) => {
            expect(
                getKeyValue({ object: guy, key: `contacts.${index}.name` })
            ).toBe(contact.name);
            expect(
                getKeyValue({ object: guy, key: `contacts.${index}.email` })
            ).toBe(contact.email);
        });

        expect(getKeyValue({ object: guy, key: 'associatedIds.2' })).toEqual(
            guy.associatedIds.at(2)
        );
    });

    it('should return the value of a key in an object - mapped keys', () => {
        expect(getKeyValue({ object: guy, key: '[contacts].name' })).toEqual([
            'Jane Doe',
            'Alice Smith',
            'Bob Johnson',
            'Charlie Brown'
        ]);
        expect(getKeyValue({ object: guy, key: '[contacts].email' })).toEqual([
            'afk@example.com',
            'alice@example.com',
            'bob@example.com',
            'charlie@example.com'
        ]);
    });
});
