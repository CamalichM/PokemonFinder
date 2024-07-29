document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    const container = document.querySelector('.container');

    container.classList.add('fade-in-slide');

    searchButton.addEventListener('click', function () {
        const query = searchInput.value.trim().toLowerCase();
        fetchPokemonData(query);
    });

    async function fetchPokemonData(nameOrId) {
        try {
            const response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${nameOrId}`);
            if (!response.ok) throw new Error('Pokémon not found');
            const data = await response.json();
            displayPokemonData(data);
        } catch (error) {
            alert(error.message);
        }
    }

    function displayPokemonData(data) {
        const pokemonName = document.getElementById('pokemon-name');
        const pokemonId = document.getElementById('pokemon-id');
        const weight = document.getElementById('weight');
        const height = document.getElementById('height');
        const sprite = document.getElementById('sprite');
        const types = document.getElementById('types');
        const hp = document.getElementById('hp');
        const attack = document.getElementById('attack');
        const defense = document.getElementById('defense');
        const specialAttack = document.getElementById('special-attack');
        const specialDefense = document.getElementById('special-defense');
        const speed = document.getElementById('speed');

        sprite.src = data.sprites.front_default;
        sprite.style.display = 'block';
        pokemonName.textContent = data.name.toUpperCase();
        pokemonId.textContent = `#${data.id}`;
        weight.textContent = `Weight: ${data.weight}`;
        height.textContent = `Height: ${data.height}`;
        hp.textContent = data.stats[0].base_stat;
        attack.textContent = data.stats[1].base_stat;
        defense.textContent = data.stats[2].base_stat;
        specialAttack.textContent = data.stats[3].base_stat;
        specialDefense.textContent = data.stats[4].base_stat;
        speed.textContent = data.stats[5].base_stat;

        types.innerHTML = '';
        data.types.forEach(typeInfo => {
            const typeElement = document.createElement('div');
            typeElement.textContent = typeInfo.type.name.toUpperCase();
            types.appendChild(typeElement);
        });

        setTimeout(() => {
            document.querySelectorAll('#pokemon-name, #pokemon-id, #weight, #height, #types div, .stats-table td')
                .forEach(el => el.classList.add('fade-in-slide'));
        }, 0);
    }
});
