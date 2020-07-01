import uniqid from 'uniqid';

export default class List {
    constructor () {
        this.items = [];
    }

    addItem (amount, unit, ingredient) {
        const item = {
            id: uniqid(),
            amount,
            unit,
            ingredient
        }
    }
} 