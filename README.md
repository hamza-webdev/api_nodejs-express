# api_nodejs-express

### $> npm install

## Tuto

"scripts": {
"start": "node app.js"
// "start": "NODE_ENV=production node app.js",
// "dev": "NODE_ENV=development nodemon app.js"
},

**app.js**

<div class="wp-block-syntaxhighlighter-code ">

<pre class="brush: jscript; title: ; notranslate" title="">const express = require('express')

const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello, Express!'))

app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))
</pre>

</div>

**mock-pokemon.js**

<div class="wp-block-syntaxhighlighter-code ">

<pre class="brush: jscript; title: ; notranslate" title="">const pokemons = [
 {
  id: 1,
  name: "Bulbizarre",
  hp: 25,
  cp: 5,
  picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png",
  types: ["Plante", "Poison"],
  created: new Date()
 },
 {
  id: 2,
  name: "Salamèche",
  hp: 28,
  cp: 6,
  picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/004.png",
  types: ["Feu"],
  created: new Date()
 },
 {
  id: 3,
  name: "Carapuce",
  hp: 21,
  cp: 4,
  picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/007.png",
  types: ["Eau"],
  created: new Date()
 },
 {
  id: 4,
  name: "Aspicot",
  hp: 16,
  cp: 2,
  picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/013.png",
  types: ["Insecte", "Poison"],
  created: new Date()
 },
 {
  id: 5,
  name: "Roucool",
  hp: 30,
  cp: 7,
  picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/016.png",
  types: ["Normal", "Vol"],
  created: new Date()
 },
 {
  id: 6,
  name: "Rattata",
  hp: 18,
  cp: 6,
  picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/019.png",
  types: ["Normal"],
  created: new Date()
 },
 {
  id: 7,
  name: "Piafabec",
  hp: 14,
  cp: 5,
  picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/021.png",
  types: ["Normal", "Vol"],
  created: new Date()
 },
 {
  id: 8,
  name: "Abo",
  hp: 16,
  cp: 4,
  picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/023.png",
  types: ["Poison"],
  created: new Date()
 },
 {
  id: 9,
  name: "Pikachu",
  hp: 21,
  cp: 7,
  picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/025.png",
  types: ["Electrik"],
  created: new Date()
 },
 {
  id: 10,
  name: "Sabelette",
  hp: 19,
  cp: 3,
  picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/027.png",
  types: ["Normal"],
  created: new Date()
 },
 {
  id: 11,
  name: "Mélofée",
  hp: 25,
  cp: 5,
  picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/035.png",
  types: ["Fée"],
  created: new Date()
 },
 {
  id: 12,
  name: "Groupix",
  hp: 17,
  cp: 8,
  picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/037.png",
  types: ["Feu"],
  created: new Date()
 }
];

module.exports = pokemons
</pre>

</div>

**helper.js**

<div class="wp-block-syntaxhighlighter-code ">

<pre class="brush: jscript; title: ; notranslate" title="">const success = (message, data) => {
  return {
    message: message,
    data: data
  }
}

exports.success
</pre>

</div>

**Les réponses JSON (Correction) : Retourner une liste de données au format JSON**

<div class="wp-block-syntaxhighlighter-code ">

<pre class="brush: jscript; title: ; notranslate" title="">const express = require('express')
const { success } = require('./helper.js')
let pokemons = require('./mock-pokemon')

const app = express()
const port = 3000

app.get('/', (req,res) => res.send('Hello again, Express !'))

// On retourne la liste des pokémons au format JSON, avec un message :
app.get('/api/pokemons', (req, res) => {
  const message = 'La liste des pokémons a bien été récupérée.'
  res.json(success(message, pokemons))
})

app.get('/api/pokemons/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const pokemon = pokemons.find(pokemon => pokemon.id === id)
  const message = 'Un pokémon a bien été trouvé.'
  res.json(success(message, pokemon))
})

app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))
</pre>

</div>

**Une API Rest Complète : Ajouter un nouveau Pokémon**

**app.js**

<div class="wp-block-syntaxhighlighter-code ">

<pre class="brush: jscript; title: ; notranslate" title="">//...

app.post('/api/pokemons', (req, res) => {
  const id = 123
  const pokemonCreated = { ...req.body, ...{id: id, created: new Date()}}
  pokemons.push(pokemonCreated)
  const message = `Le pokémon ${pokemonCreated.name} a bien été crée.`
  res.json(success(message, pokemonCreated))
})

// ...
</pre>

</div>

**helper.js**

<div class="wp-block-syntaxhighlighter-code ">

<pre class="brush: jscript; highlight: [5,6,7,8,9,10,11]; title: ; notranslate" title="">exports.success = (message, data) => {
  return { message, data }
}

exports.getUniqueId = (pokemons) => {
  const pokemonsIds = pokemons.map(pokemon => pokemon.id)
  const maxId = pokemonsIds.reduce((a,b) => Math.max(a, b))
  const uniqueId = maxId + 1

  return uniqueId
}
</pre>

</div>

**Une API Rest Complète : Effectuer une requête POST avec Insomnia**

_Le corps de la requête POST à copier-coller dans Insomnia pour ajouter le pokémon « Chenipan » sur votre API Rest._

<div class="wp-block-syntaxhighlighter-code ">

<pre class="brush: jscript; title: ; notranslate" title="">{
  "name": "Chenipan",
  "hp": 29,
  "cp":4,
  "picture": "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/010.png",
  "types": ["Insecte", "Poison"]
 }
</pre>

</div>

**Une API Rest Complète : Modifier un Pokémon**

**app.js**

<div class="wp-block-syntaxhighlighter-code ">

<pre class="brush: jscript; title: ; notranslate" title="">// ...

app.put('/api/pokemons/:id', (req, res) => {
 const id = parseInt(req.params.id);
 const pokemonUpdated = { ...req.body, id: id }
 pokemons = pokemons.map(pokemon => {
  return pokemon.id === id ? pokemonUpdated : pokemon
 })

 const message = `Le pokémon ${pokemonUpdated.name} a bien été modifié.`
 res.json(success(message, pokemonUpdated))
});

// ...
</pre>

</div>

** Une API Rest Complète : Supprimer un Pokémon **

** app.js **

<div class="wp-block-syntaxhighlighter-code ">

<pre class="brush: jscript; title: ; notranslate" title="">// ...

app.delete('/api/pokemons/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id)
  pokemons = pokemons.filter(pokemon => pokemon.id !== id)
  const message = `Le pokémon ${pokemonDeleted.name} a bien été supprimé.`
  res.json(success(message, pokemonDeleted))
});

// ...
</pre>

</div>

** L’API Rest et la Base de données : Créer un modèle Sequelize **

** src/models/pokemon.js **

<div class="wp-block-syntaxhighlighter-code ">

<pre class="brush: jscript; title: ; notranslate" title="">module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Pokemon', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cp: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false
    },
    types: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
  })
}
</pre>

</div>

** L’API Rest et la Base de données : Créer un modèle Sequelize **

** sequelize.js **

<div class="wp-block-syntaxhighlighter-code ">

<pre class="brush: jscript; title: ; notranslate" title="">const { Sequelize, DataTypes } = require('sequelize')
const PokemonModel = require('../models/pokemon')
const pokemons = require('./mock-pokemon')

const sequelize = new Sequelize('pokedex', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb',
  dialectOptions: {
    timezone: 'Etc/GMT-2',
  },
  logging: false
})

const Pokemon = PokemonModel(sequelize, DataTypes)

const initDb = () => {
  return sequelize.sync({force: true}).then(_ => {
    pokemons.map(pokemon => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types.join()
      }).then(pokemon => console.log(pokemon.toJSON()))
    })
    console.log('La base de donnée a bien été initialisée !')
  })
}

module.exports = {
  initDb, Pokemon
}
</pre>

</div>

** _findAllPokemons.js_ **

<div class="wp-block-syntaxhighlighter-code ">

<pre class="brush: jscript; title: ; notranslate" title="">const { Pokemon } = require('../db/sequelize')

module.exports = (app) => {
  app.get('/api/pokemons', (req, res) => {
    Pokemon.findAll()
      .then(pokemons => {
        const message = 'La liste des pokémons a bien été récupérée.'
        res.json({ message, data: pokemons })
      })
  })
}
</pre>

</div>

**\__findPokemonByPk_.js\_**

<div class="wp-block-syntaxhighlighter-code ">

<pre class="brush: jscript; title: ; notranslate" title="">const { Pokemon } = require('../db/sequelize')

module.exports = (app) => {
  app.get('/api/pokemons/:id', (req, res) => {
    Pokemon.findByPk(req.params.id)
      .then(pokemon => {
        const message = 'Un pokémon a bien été trouvé.'
        res.json({ message, data: pokemon })
      })
  })
}
</pre>

</div>

\***\*\_createPokemon**.js\_\*\*

<div class="wp-block-syntaxhighlighter-code ">

<pre class="brush: jscript; title: ; notranslate" title="">const { Pokemon } = require('../db/sequelize')

module.exports = (app) => {
  app.post('/api/pokemons', (req, res) => {
    Pokemon.create(req.body)
      .then(pokemon => {
        const message = `Le pokémon ${req.body.name} a bien été crée.`
        res.json({ message, data: pokemon })
      })
  })
}
</pre>

</div>

**\_**_updatePokemon_**.js\_**

<div class="wp-block-syntaxhighlighter-code ">

<pre class="brush: jscript; title: ; notranslate" title="">const { Pokemon } = require('../db/sequelize')

module.exports = (app) => {
  app.put('/api/pokemons/:id', (req, res) => {
    const id = req.params.id
    Pokemon.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      Pokemon.findByPk(id).then(pokemon => {
        const message = `Le pokémon ${pokemon.name} a bien été modifié.`
        res.json({message, data: pokemon })
      })
    })
  })
}
</pre>

</div>

\***\*\_**deletePokemon\__\_\_.js_\*\*

<div class="wp-block-syntaxhighlighter-code ">

<pre class="brush: jscript; title: ; notranslate" title="">const { Pokemon } = require('../db/sequelize')

module.exports = (app) => {
  app.delete('/api/pokemons/:id', (req, res) => {
    Pokemon.findByPk(req.params.id).then(pokemon => {
      const pokemonDeleted = pokemon;
      Pokemon.destroy({
        where: { id: pokemon.id }
      })
      .then(_ => {
        const message = `Le pokémon avec l'identifiant n°${pokemonDeleted.id} a bien été supprimé.`
        res.json({message, data: pokemonDeleted })
      })
    })
  })
}
</pre>

</div>

** Authentification : Créer un modèle User avec Sequelize **

** models/user.js **

<div class="wp-block-syntaxhighlighter-code ">

<pre class="brush: jscript; title: ; notranslate" title="">module.exports = (sequelize, DataTypes) => {
  return sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    }
  })
}
</pre>

</div>

** _ routes/login.js _ **

<div class="wp-block-syntaxhighlighter-code ">

<pre class="brush: jscript; title: ; notranslate" title="">const { User } = require('../db/sequelize')
const bcrypt = require('bcrypt')

module.exports = (app) => {
  app.post('/api/login', (req, res) => {

    User.findOne({ where: { username: req.body.username } }).then(user => {
      bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
        if(isPasswordValid) {
          const message = `L'utilisateur a été connecté avec succès`;
          return res.json({ message, data: user })
        }
      })
    })
  })
}
</pre>

</div>

**_ auth/auth.js _**

<div class="wp-block-syntaxhighlighter-code ">

<pre class="brush: jscript; title: ; notranslate" title="">const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')

module.exports = (req, res, next) => {
  const authorizationHeader = req.headers.authorization

  if(!authorizationHeader) {
    const message = `Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.`
    return res.status(401).json({ message })
  }

    const token = authorizationHeader.split(' ')[1]
    const decodedToken = jwt.verify(token, privateKey, (error, decodedToken) => {
    if(error) {
      const message = `L'utilisateur n'est pas autorisé à accèder à cette ressource.`
      return res.status(401).json({ message, data: error })
    }

    const userId = decodedToken.userId
    if (req.body.userId && req.body.userId !== userId) {
      const message = `L'identifiant de l'utilisateur est invalide.`
      res.status(401).json({ message })
    } else {
      next()
    }
  })
}
</pre>

</div>
