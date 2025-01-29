export const ship = (length, name) => {
    let hits = 0;
    let hit = () => {
        if (hits < length) hits++;
    }
    let isSunk = () => {
        if (hits == length) return true;
        return false
    }
    return { length, name, hit, isSunk, get hits() { return hits; } };
};