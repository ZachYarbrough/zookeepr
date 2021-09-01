const { filterByQuery, findById, createNewAnimal, validateAnimal } = require('../lib/animals');
const { animals } = require('../data/animals.json');
jest.mock('fs');

it('creates an animal object', () => {
    const animal = createNewAnimal({
        "name": "Bilbo",
        "id": "jhgdja3ng2"
    }, animals);
    expect(animal.name).toBe('Bilbo');
    expect(animal.id).toBe('jhgdja3ng2');
});

it('filters by query', () => {
    const startingAnimals = [
        {
            id: "3",
            name: "Erica",
            species: "gorilla",
            diet: "omnivore",
            personalityTraits: ["quirky", "rash"],
        },
        {
            id: "4",
            name: "Noel",
            species: "bear",
            diet: "carnivore",
            personalityTraits: ["impish", "sassy", "brave"],
        },
    ];
    const updatedAnimals = filterByQuery({species: "gorilla"}, startingAnimals);

    expect(updatedAnimals.length).toEqual(1);
});

it('finds by id', () => {
    const startingAnimals = [
        {
          id: "3",
          name: "Erica",
          species: "gorilla",
          diet: "omnivore",
          personalityTraits: ["quirky", "rash"],
        },
        {
          id: "4",
          name: "Noel",
          species: "bear",
          diet: "carnivore",
          personalityTraits: ["impish", "sassy", "brave"],
        },
    ];
    const filteredAnimal = findById("3", startingAnimals);

    expect(filteredAnimal.name).toEqual("Erica");
});

it('validates personaility traits', ()=> {
    const animal = {
        id: "3",
        name: "Erica",
        species: "gorilla",
        diet: "omnivore",
        personalityTraits: ["quirky", "rash"],
      };
    
      const invalidAnimal = {
        id: "3",
        name: "Erica",
        species: "gorilla",
        diet: "omnivore",
      };

      const result = validateAnimal(animal);
      const result2 = validateAnimal(invalidAnimal);

      expect(result).toBe(true);
      expect(result2).toBe(false);
});