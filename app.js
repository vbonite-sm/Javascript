    // Global Constructor
    function Entity (
        species,
        weight,
        height,
        diet) {
            this.species = species;
            this.weight = weight;
            this.height = height;
            this.diet = diet;
            this.imagePath = `./images/${species.toLowerCase()}.png`;
        }
    
    // Create Dino Constructor
    function Dino (
        species,
        weight,
        height,
        diet,
        where,
        when,
        fact
    ) {
        Entity.call(this, species, weight, height, diet)
        this.where = where;
        this.when = when;
        this.fact = fact;
    }

    // Set Dino Prototype
    Dino.prototype = Object.create(Entity.prototype);
    Dino.prototype.constructor = Dino;

    const fetchDinoJson = async () => {
        const dino_json = await fetch("./dino.json");
        const data = await dino_json.json();
        return data;
    }

    // Create Dino Objects
    // const dino = new Dino();
    // Create Human Constructor
    function Human (
        name,
        weight,
        height, 
        diet
    ) {
        Entity.call(this, "human", weight, height, diet);
        this.name = name;
        this.diet = diet;
    }

    // Set Human Prototype
    Human.prototype = Object.create(Entity.prototype);
    Human.prototype.constructor = Human;

    // Use IIFE to get human data from form
    const humanObject = () => {
        return (function() {
          // Get data pulled from the form
          const name = document.querySelector('[name="name"]').value || "Your name here!";
          const heightFeet = parseInt(document.querySelector('[name="feet"]').value) || 0;
          const heightInches = parseInt(document.querySelector('[name="inches"]').value) || 0;
          const height = heightFeet * 12 + heightInches;
          const weight = document.querySelector('[name="weight"]').value;
          const diet = document.querySelector('[name="diet"]').value.toLowerCase();
          
          // Create human object
          const myHuman = new Human(name, height, weight, diet);
          return myHuman;
        })();
    };

    // Create Dino Compare Method 1 - HEIGHT
    // NOTE: Weight in JSON file is in lbs, height in inches. 
    const heightCompare = function(heightHuman, dino) {
        heightDino = dino.height;
        let heightDiff = heightDino - heightHuman;

        let diffText = (heightDino > heightHuman) ? `The ${dino.species} is taller than you by ${heightDiff} inches.`
        : (heightDino < heightHuman) ? `You are taller than the ${dino.species} by ${Math.abs(heightDiff)} inches.`
        : `You and the ${dino.species} have the same height.`;

        return diffText;
    };
    
    // Create Dino Compare Method 2 - WEIGHT
    // NOTE: Weight in JSON file is in lbs, height in inches.
    const weightCompare = function(weightHuman, dino) {
        weightDino = dino.weight;
        let weightDiff = weightDino - weightHuman;

        let diffText = (weightDino > weightHuman) ? `The ${dino.species} is heavier than you by ${weightDiff} lbs.`
        : (weightDino < weightHuman) ? `You are heavier than the ${dino.species} by ${Math.abs(weightDiff)} lbs.`
        : `You and the ${dino.species} have the same weight.`;
 
        return diffText;
    };

    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.
    const dietCompare = function(dietHuman, dino) {
        dietDino = dino.diet;
        
        let diffText = (dietDino.toLowerCase() === dietHuman.toLowerCase()) ? `You and the ${dino.species} have the same diet`
        : `You and the ${dino.species} have different diets. They are a ${dietDino}`;
    };

    // Dino Facts - Time Period
    const dinoFactWhen = function(dino) {
        let factText = `The ${dino.species} lived during the ${dino.when} period.`;
        return factText;
    };

    // Dino Facts - Habitat
    const dinoFactWhere = function(dino) {
        let factText = `The ${dino.species} lived in the region(s) of ${dino.where}.`;
        return factText;
    };

    // Get random facts
    const getRandomFacts = function(human, dino) {
        const dinoFact = dino.fact;
        const heightFact = heightCompare(human.height, dino);
        const weightFact = weightCompare(human.weight, dino);
        const dietFact = dietCompare(human.diet, dino);
        const periodFact = dinoFactWhen(dino);
        const habitatFact = dinoFactWhere(dino);
        const facts = [dinoFact, heightFact, weightFact, dietFact, periodFact, habitatFact];

        return facts;
    };

    function errorHandling(err) {
        console.log(err);
    }

    async function buttonClick() {
        // Create Human Object
        const humanObject = () => {
            return(function() {
                const name = document.querySelector('[name="name"]').value || "Your name here!";
                const heightFeet = parseInt(document.querySelector('[name="feet"]').value) || 0;
                const heightInches = parseInt(document.querySelector('[name="inches"]').value) || 0;
                const height = heightFeet * 12 + heightInches;
                const weight = document.querySelector('[name="weight"]').value;
                const diet = document.querySelector('[name="diet"]').value.toLowerCase();
                
                const newHuman = new Human(name, height, weight, diet);
                return newHuman;
            })();
        };

        // fetch dino data from dino.json
        const allDinoData = await fetchDinoJson().catch(errorHandling);

        function randomItemArray(arr) {
            return arr[Math.floor(Math.random() * arr.length)];
        }

        const dinoArray = allDinoData.Dinos.map(dino => {
            const fact = dino.species == "Pigeon" ? dino.fact : randomItemArray(getRandomFacts(humanObject(), dino));
            return new Dino(
                dino.species,
                dino.height,
                dino.weight,
                dino.diet,
                dino.when,
                dino.where,
                fact
            );
        });

        const generateTile = function(human, dino) {
            console.log(human);
            console.log(dino);
            let updatedArrays = [];
            console.log(updatedArrays);
            updatedArrays = dino;
            updatedArrays.splice(4,0, human);
            console.log(updatedArrays);

            let tilesArray = [];
            const dinoGrid = document.querySelector('#grid');

            updatedArrays.map(updatedArray => {
                switch(updatedArray.species.toLowerCase()) {
                    case "human":
                        tilesArray = `
                        <div class="grid-item">
                            <h3>${updatedArray.name}</h3>
                            <img src="${updatedArray.imagePath}" alt="image of ${updatedArray.species}">
                        </div>
                        `;
                        break;
                    case "pigeon":
                        tilesArray = `
                        <div class="grid-item">
                            <h3>${updatedArray.species}</h3>
                            <img src="${updatedArray.imagePath}" alt="image of ${updatedArray.species}">
                            <p>${updatedArray.fact}</p>
                        </div>
                        `;
                        break;
                    default:
                        tilesArray = `
                        <div class="grid-item">
                            <h3>${updatedArray.species}</h3>
                            <img src="${updatedArray.imagePath}" alt="image of ${updatedArray.species}">
                            <p>${updatedArray.fact}</p>
                        </div>
                        `;
                }
                const infographic = document.createRange().createContextualFragment(tilesArray)
                dinoGrid.insertAdjacentHTML('beforeend', tilesArray);
            });
        };

        // Add tiles to DOM
        generateTile(humanObject(), dinoArray);

        // Remove form from screen
        document.querySelector('#dino-compare').classList.add("hidden");
    }

    // On button click, prepare and display infographic
    document.querySelector('#btn').addEventListener('click', buttonClick);