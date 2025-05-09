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
        expect(getKeyValue(guy, 'id')).toBe(guy.id);

        expect(getKeyValue(guy, 'personalInfo')).toBe(guy.personalInfo);
        expect(getKeyValue(guy, 'personalInfo.name')).toBe(
            guy.personalInfo.name
        );
        expect(getKeyValue(guy, 'personalInfo.age')).toBe(guy.personalInfo.age);
        expect(getKeyValue(guy, 'personalInfo.city')).toBe(
            guy.personalInfo.city
        );

        guy.contacts.forEach((contact, index) => {
            expect(getKeyValue(guy, `contacts.${index}.name`)).toBe(
                contact.name
            );
            expect(getKeyValue(guy, `contacts.${index}.email`)).toBe(
                contact.email
            );
        });

        expect(getKeyValue(guy, 'associatedIds.2')).toBe(
            guy.associatedIds.at(2)
        );
    });

    it('should return the value of a key in an object - mapped keys', () => {
        expect(getKeyValue(guy, '[contacts].name')).toEqual([
            'Jane Doe',
            'Alice Smith',
            'Bob Johnson',
            'Charlie Brown'
        ]);
        expect(getKeyValue(guy, '[contacts].email')).toEqual([
            'afk@example.com',
            'alice@example.com',
            'bob@example.com',
            'charlie@example.com'
        ]);
    });
});
