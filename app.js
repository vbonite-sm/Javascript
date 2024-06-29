    // Global Constructor
    function Entity (species,
        weight,
        height,
        diet) {
            this.species = species;
            this.weight = weight;
            this.height = height;
            this.diet = diet;
            this.imagePath = `./images/${species}.png`.toLowerCase();
        }
    
    
    // Create Dino Constructor

    function Dino (
        where,
        when,
        fact,
        human
    ) {
        Entity.call(this, species, height, weight, diet)
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
        const dino_array = data.Dino.map(dino => {
            let {species, weight, height, diet, where, when, fact} = dino;
            return new Dino(species, weight, height, diet, where, when, fact)
        });
        generateTile(dino_array);
    }


    // Create Dino Objects
    const dino = new Dino();

    // Create Human Constructor
    function Human (
        name,
        height,
        weight, 
        diet
    ) {
        Entity.call(this, "human", height, weight, diet);
        this.name = name;
    }

    // Set Human Prototype
    Human.prototype = Object.create(Entity.prototype);
    Human.prototype.constructor = Human;
    


    // Create Human Object

    // Use IIFE to get human data from form


    // Create Dino Compare Method 1 - HEIGHT
    // NOTE: Weight in JSON file is in lbs, height in inches. 
    const heightCompare = function(heightHuman, dino) {
        heightDino = dino.height;
        let heightDiff = heightDino - heightHuman;

        return (heightDino > heightHuman) ? `The ${dino.species} is taller than you by ${heightDiff} inches.`
            : (heightDino < heightHuman) ? `You are taller than the ${dino.species} by ${Math.abs(heightDiff)} inches.`
            : `You and the ${dino.species} have the same height`;
    }

    
    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.

    
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.


    // Generate Tiles for each Dino in Array
    const generateTile = (dino_array) => {
        let update_dino_array = [];
    }
  
        // Add tiles to DOM

    // Remove form from screen


// On button click, prepare and display infographic
