import { ship } from "../src/ship";
import { describe, expect, test } from "vitest"
describe('ship factory', () => {
    test('initializes correctly', () => {
        let result = ship(3, 'cruiser');
        expect(result.length).toBe(3);
        expect(result.name).toBe('cruiser');
    })
    test('hit working correctly', () => {
        let result = ship(3, 'cruiser');
        result.hit()
        result.hit()
        expect(result.hits).toBe(2);
    })
    test('isSunk() returns false when not sunk', () => {
        const testShip = ship(3, 'destroyer');
        testShip.hit();
        expect(testShip.isSunk()).toBe(false);
        testShip.hit();
        expect(testShip.isSunk()).toBe(false);
    });
    test('isSunk() returns true when working sunk', () => {
        const testShip = ship(2, 'destroyer');
        testShip.hit();
        testShip.hit();
        expect(testShip.isSunk()).toBe(true);
    });
})