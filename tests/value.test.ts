import { describe, it, expect } from 'vitest';

import { getKeyValue, updateKeyValue } from '../lib/utils/value';

const guy = {
    id: 1,
    personalInfo: { name: 'John Doe', age: 12, city: 'New York' },
    contacts: [
        {
            name: 'Jane Doe',
            email: 'afk@example.com',
            associatedIds: [23, 43, 67, 89],
            referrals: [{ name: 'Valentina', email: 'valentina@example.com' }]
        },
        {
            name: 'Alice Smith',
            email: 'alice@example.com',
            associatedIds: [23, 43, 67, 89]
        },
        {
            name: 'Bob Johnson',
            email: 'bob@example.com',
            associatedIds: [23, 43, 67, 89],
            referrals: [
                { name: 'Charlie', email: 'charlie@example.com' },
                { name: 'Gustav', email: 'gustav@example.com' }
            ]
        },
        {
            name: 'Charlie Brown',
            email: 'charlie@example.com',
            associatedIds: [23, 43, 67, 89],
            referrals: []
        }
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

    it('should return the mapped values of a key in an object', () => {
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

    it('should return the mapped values of a key of nested arrays', () => {
        expect(
            getKeyValue({ object: guy, key: '[contacts].[referrals].name' })
        ).toEqual([['Valentina'], undefined, ['Charlie', 'Gustav'], []]);

        expect(
            getKeyValue({ object: guy, key: 'contacts.0.[referrals].name' })
        ).toEqual(['Valentina']);
    });
});

describe('updateKeyValue', () => {
    it('should update the value of a key in an object', () => {
        expect(
            updateKeyValue({
                object: guy,
                key: 'id',
                value: 10
            }).id
        ).toBe(10);
    });

    it('should update the value of a nested key in an object', () => {
        expect(
            updateKeyValue({
                object: guy,
                key: 'personalInfo.city',
                value: 'New York City'
            }).personalInfo.city
        ).toBe('New York City');
    });

    it('should update the value of a key in an array of objects', () => {
        expect(
            updateKeyValue({
                object: guy,
                key: 'associatedIds',
                value: [2, 3, 4]
            }).associatedIds
        ).toEqual([2, 3, 4]);

        expect(
            updateKeyValue({
                object: guy,
                key: 'contacts',
                value: [
                    {
                        name: 'Jane Doe',
                        email: 'jane@example.com',
                        associatedIds: [1, 2, 3]
                    }
                ]
            }).contacts
        ).toEqual([
            {
                name: 'Jane Doe',
                email: 'jane@example.com',
                associatedIds: [1, 2, 3]
            }
        ]);

        expect(
            updateKeyValue({
                object: guy,
                key: 'contacts.0.email',
                value: 'jane@example.com'
            }).contacts[0].email
        ).toBe('jane@example.com');

        expect(
            getKeyValue({
                object: updateKeyValue({
                    object: guy,
                    key: 'contacts.0.referrals.0',
                    value: {
                        name: 'Test Referral',
                        email: 'test@example.com'
                    }
                }),
                key: 'contacts.0.referrals.0'
            })
        ).toEqual({
            name: 'Test Referral',
            email: 'test@example.com'
        });
    });

    it('should update the mapped values of a key', () => {
        expect(
            updateKeyValue({
                object: guy,
                key: '[contacts].email',
                value: 'newemail@example.com'
            }).contacts.map((contact) => contact.email)
        ).toEqual(
            Array.from(
                { length: guy.contacts.length },
                () => 'newemail@example.com'
            )
        );
    });

    it('should update the mapped values of a key of nested arrays', () => {
        const newGuy = updateKeyValue({
            object: guy,
            key: '[contacts].[referrals].name',
            value: 'Test Referral'
        });
        newGuy.contacts.forEach((contact) => {
            if (contact.referrals) {
                contact.referrals.forEach((referral) => {
                    expect(referral.name).toBe('Test Referral');
                });
            } else {
                expect(contact.referrals).toBeUndefined();
            }
        });
    });

    it('does not mutate the original object', () => {
        const guyCopy = { ...guy };
        const newGuy = updateKeyValue({
            object: guy,
            key: 'personalInfo.name',
            value: 'Jane Smith'
        });
        expect(guyCopy).toEqual(guy);
        expect(newGuy).not.toEqual(guy);
    });

    it('should replace the type and value of the key when replace is true', () => {
        const newGuy = updateKeyValue({
            object: guy,
            key: '[contacts].referrals',
            value: {
                names: ['Julian', 'Penelope', 'Kate'],
                date: 'January 1, 2024'
            },
            replace: true
        });

        expect(
            newGuy.contacts.map(({ referrals }) => ({ names: referrals.names }))
        ).toEqual(
            Array.from({ length: guy.contacts.length }, () => ({
                names: ['Julian', 'Penelope', 'Kate']
            }))
        );

        expect(
            newGuy.contacts.map(({ referrals }) => ({ date: referrals.date }))
        ).toEqual(
            Array.from({ length: guy.contacts.length }, () => ({
                date: 'January 1, 2024'
            }))
        );
    });
});
