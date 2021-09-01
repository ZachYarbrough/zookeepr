const { filterByQuery, findById, createNewZookeeper, validateZookeeper} = require('../lib/zookeepers');
const { zookeepers } = require('../data/zookeepers.json');
jest.mock('fs');

it('creates a zookeeper object', () => {
    const zookeeper = createNewZookeeper({
        "name": "Zach",
        "id": "asjbhr5sld8"
    }, zookeepers);
    expect(zookeeper.name).toBe('Zach');
    expect(zookeeper.id).toBe('asjbhr5sld8');
});

it('filters by query', () => {
    let Zookeepers = [
        {
            name: "Zach",
            age: 22,
            favoriteAnimal: "Bilbo"
        }, {
            name: "Jennifer",
            age: 51,
            favoriteAnimal: "Erica"
        }
    ]
    const filteredZookeepers = filterByQuery({ name: "Zach" }, Zookeepers);
    expect(filteredZookeepers.length).toEqual(1);
});

it('finds by id', () => {
    const Zookeepers = [
        {
            id: "1",
            name: "Zach",
            age: 22,
            favoriteAnimal: "Bilbo"
        }, {
            id: "2",
            name: "Jennifer",
            age: 51,
            favoriteAnimal: "Erica"
        }
    ]
    const zookeeper = findById("2", Zookeepers);
    expect(zookeeper.name).toEqual("Jennifer");
});

it('validates age', ()=> {
    const zookeeper = {
        id: "1",
        name: "Zach",
        age: 22,
        favoriteAnimal: "penguin"
    }
    const invalidZookeeper = {
        id: "1",
        name: "Jennifer",
        age: "51",
        favoriteAnimal: "bear"
    }

    const result = validateZookeeper(zookeeper);
    const result2 = validateZookeeper(invalidZookeeper);

    expect(result).toBe(true);
    expect(result2).toBe(false);
})