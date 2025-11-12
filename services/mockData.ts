
import { Game } from '../types';

// Let's create more data to support pagination and filtering
const gamesData: Omit<Game, 'appId'>[] = [
    // Roguelikes & Roguelites
    { title: 'Hades', releaseDate: '2020-09-17T00:00:00Z', price: { final: 24.99, currency: 'USD', discountPercent: 0, isFree: false }, tags: ['Action Roguelike', 'Indie', 'Action', 'Mythology'], genres: [{ id: '1', description: 'Action'}, {id: '23', description: 'Indie'}, {id: '3', description: 'RPG'}]},
    { title: 'Slay the Spire', releaseDate: '2019-01-23T00:00:00Z', price: { final: 24.99, currency: 'USD', discountPercent: 0, isFree: false }, tags: ['Card Battler', 'Roguelike', 'Deckbuilder', 'Strategy'], genres: [{ id: '23', description: 'Indie'}, {id: '2', description: 'Strategy'}]},
    { title: 'Dead Cells', releaseDate: '2018-08-06T00:00:00Z', price: { final: 14.99, currency: 'USD', discountPercent: 40, isFree: false }, tags: ['Roguelite', 'Metroidvania', 'Pixel Graphics', 'Difficult'], genres: [{ id: '1', description: 'Action'}, {id: '23', description: 'Indie'}, {id: '25', description: 'Adventure'}]},
    { title: 'The Binding of Isaac: Rebirth', releaseDate: '2014-11-04T00:00:00Z', price: { final: 14.99, currency: 'USD', discountPercent: 0, isFree: false }, tags: ['Roguelike', 'Indie', 'Dungeon Crawler', 'Difficult'], genres: [{ id: '1', description: 'Action'}]},
    { title: 'Risk of Rain 2', releaseDate: '2020-08-11T00:00:00Z', price: { final: 24.99, currency: 'USD', discountPercent: 0, isFree: false }, tags: ['Roguelike', 'Action', 'Multiplayer', 'Third-Person Shooter'], genres: [{ id: '1', description: 'Action'}, {id: '23', description: 'Indie'}]},
    { title: 'Enter the Gungeon', releaseDate: '2016-04-05T00:00:00Z', price: { final: 14.99, currency: 'USD', discountPercent: 0, isFree: false }, tags: ['Bullet Hell', 'Roguelite', 'Action', 'Pixel Graphics'], genres: [{ id: '1', description: 'Action'}, {id: '23', description: 'Indie'}, {id: '25', description: 'Adventure'}]},

    // Co-op games
    { title: 'Terraria', releaseDate: '2011-05-16T00:00:00Z', price: { final: 4.99, currency: 'USD', discountPercent: 50, isFree: false }, tags: ['Sandbox', 'Survival', '2D', 'Multiplayer', 'Adventure'], genres: [{ id: '1', description: 'Action' }, { id: '25', description: 'Adventure' }]},
    { title: 'Stardew Valley', releaseDate: '2016-02-26T00:00:00Z', price: { final: 14.99, currency: 'USD', discountPercent: 0, isFree: false }, tags: ['Farming Sim', 'Life Sim', 'RPG', 'Pixel Graphics', 'Multiplayer'], genres: [{ id: '23', description: 'Indie' }, { id: '3', description: 'RPG' }, {id: '28', description: 'Simulation'}]},
    { title: 'Portal 2', releaseDate: '2011-04-18T00:00:00Z', price: { final: 9.99, currency: 'USD', discountPercent: 0, isFree: false }, tags: ['Puzzle', 'Co-op', 'Sci-fi', 'First-Person', 'Comedy'], genres: [{ id: '25', description: 'Adventure' }, { id: '2', description: 'Strategy' }]},
    { title: 'Left 4 Dead 2', releaseDate: '2009-11-17T00:00:00Z', price: { final: 9.99, currency: 'USD', discountPercent: 0, isFree: false }, tags: ['Zombies', 'Co-op', 'FPS', 'Action', 'Multiplayer'], genres: [{ id: '1', description: 'Action' }]},
    { title: 'Overcooked! 2', releaseDate: '2018-08-07T00:00:00Z', price: { final: 6.25, currency: 'USD', discountPercent: 75, isFree: false }, tags: ['Co-op', 'Local Co-Op', 'Casual', 'Family Friendly', 'Funny'], genres: [{id: '4', description: 'Casual'}, {id: '23', description: 'Indie'}, {id: '28', description: 'Simulation'}]},
    { title: 'Deep Rock Galactic', releaseDate: '2020-05-13T00:00:00Z', price: { final: 29.99, currency: 'USD', discountPercent: 0, isFree: false }, tags: ['Co-op', 'FPS', 'Dwarves', 'Space', 'Procedural Generation'], genres: [{ id: '1', description: 'Action' }]},

    // Other popular games
    { title: 'Rocket League', releaseDate: '2015-07-07T00:00:00Z', price: { final: 0, currency: 'USD', discountPercent: 0, isFree: true }, tags: ['Multiplayer', 'Racing', 'Sports', 'Competitive', 'Action'], genres: [{ id: '1', description: 'Action' }, { id: '18', description: 'Sports' }]},
    { title: 'The Forest', releaseDate: '2018-04-30T00:00:00Z', price: { final: 19.99, currency: 'USD', discountPercent: 0, isFree: false }, tags: ['Survival', 'Horror', 'Open World', 'Crafting', 'Co-op'], genres: [{ id: '1', description: 'Action' }, { id: '25', description: 'Adventure' }]},
    { title: 'Team Fortress 2', releaseDate: '2007-10-10T00:00:00Z', price: { final: 0, currency: 'USD', discountPercent: 0, isFree: true }, tags: ['Free to Play', 'Hero Shooter', 'Multiplayer', 'FPS', 'Shooter'], genres: [{ id: '1', description: 'Action' }]},
    { title: 'Vampire Survivors', releaseDate: '2022-10-20T00:00:00Z', price: { final: 4.99, currency: 'USD', discountPercent: 0, isFree: false }, tags: ['Bullet Hell', 'Roguelite', 'Action', 'Pixel Graphics', 'Casual'], genres: [{id: '1', description: 'Action'}, {id: '4', description: 'Casual'}, {id: '23', description: 'Indie'}, {id: '3', description: 'RPG'}]},
    { title: 'Hollow Knight', releaseDate: '2017-02-24T00:00:00Z', price: { final: 14.99, currency: 'USD', discountPercent: 0, isFree: false }, tags: ['Metroidvania', 'Souls-like', 'Platformer', 'Indie', '2D'], genres: [{id: '1', description: 'Action'}, {id: '25', description: 'Adventure'}, {id: '23', description: 'Indie'}]},
    { title: 'Cuphead', releaseDate: '2017-09-29T00:00:00Z', price: { final: 19.99, currency: 'USD', discountPercent: 0, isFree: false }, tags: ['Difficult', '1930s', 'Cartoon', 'Action', 'Co-op'], genres: [{id: '1', description: 'Action'}, {id: '23', description: 'Indie'}]},
    { title: 'Among Us', releaseDate: '2018-11-16T00:00:00Z', price: { final: 4.99, currency: 'USD', discountPercent: 0, isFree: false }, tags: ['Multiplayer', 'Social Deduction', 'Co-op', 'Space', 'Party Game'], genres: [{id: '4', description: 'Casual'}]},
    { title: 'Valheim', releaseDate: '2021-02-02T00:00:00Z', price: { final: 19.99, currency: 'USD', discountPercent: 0, isFree: false }, tags: ['Survival', 'Open World', 'Co-op', 'Building', 'Vikings'], genres: [{id: '1', description: 'Action'}, {id: '25', description: 'Adventure'}, {id: '23', description: 'Indie'}, {id: '3', description: 'RPG'}]},
    { title: 'Phasmophobia', releaseDate: '2020-09-18T00:00:00Z', price: { final: 13.99, currency: 'USD', discountPercent: 0, isFree: false }, tags: ['Horror', 'Online Co-Op', 'Psychological Horror', 'VR', 'Supernatural'], genres: [{id: '1', description: 'Action'}, {id: '23', description: 'Indie'}]},
    { title: 'It Takes Two', releaseDate: '2021-03-26T00:00:00Z', price: { final: 39.99, currency: 'USD', discountPercent: 0, isFree: false }, tags: ['Co-op', 'Platformer', 'Adventure', 'Family Friendly', 'Split Screen'], genres: [{id: '1', description: 'Action'}, {id: '25', description: 'Adventure'}]},
    { title: 'Celeste', releaseDate: '2018-01-25T00:00:00Z', price: { final: 19.99, currency: 'USD', discountPercent: 0, isFree: false }, tags: ['Platformer', 'Difficult', 'Pixel Graphics', 'Indie', 'Story Rich'], genres: [{id: '1', description: 'Action'}, {id: '25', description: 'Adventure'}, {id: '23', description: 'Indie'}]},
    { title: 'Undertale', releaseDate: '2015-09-15T00:00:00Z', price: { final: 9.99, currency: 'USD', discountPercent: 0, isFree: false }, tags: ['RPG', 'Story Rich', 'Great Soundtrack', 'Pixel Graphics', 'Indie'], genres: [{id: '23', description: 'Indie'}, {id: '3', description: 'RPG'}]},
    { title: 'The Witcher 3: Wild Hunt', releaseDate: '2015-05-18T00:00:00Z', price: { final: 8.00, currency: 'USD', discountPercent: 80, isFree: false }, tags: ['Open World', 'RPG', 'Story Rich', 'Fantasy', 'Atmospheric'], genres: [{id: '3', description: 'RPG'}]},
    { title: 'Subnautica', releaseDate: '2018-01-23T00:00:00Z', price: { final: 29.99, currency: 'USD', discountPercent: 0, isFree: false }, tags: ['Survival', 'Open World', 'Underwater', 'Exploration', 'Crafting'], genres: [{id: '25', description: 'Adventure'}, {id: '23', description: 'Indie'}]},
    { title: 'Don\'t Starve Together', releaseDate: '2016-04-21T00:00:00Z', price: { final: 14.99, currency: 'USD', discountPercent: 0, isFree: false }, tags: ['Survival', 'Co-op', 'Crafting', 'Multiplayer', 'Open World'], genres: [{id: '25', description: 'Adventure'}, {id: '23', description: 'Indie'}, {id: '28', description: 'Simulation'}]},
    { title: 'A Way Out', releaseDate: '2018-03-23T00:00:00Z', price: { final: 29.99, currency: 'USD', discountPercent: 0, isFree: false }, tags: ['Co-op', 'Story Rich', 'Split Screen', 'Action', 'Adventure'], genres: [{id: '1', description: 'Action'}, {id: '25', description: 'Adventure'}, {id: '23', description: 'Indie'}]},
    { title: 'Spelunky 2', releaseDate: '2020-09-15T00:00:00Z', price: { final: 19.99, currency: 'USD', discountPercent: 0, isFree: false }, tags: ['Roguelike', 'Platformer', 'Difficult', '2D', 'Indie'], genres: [{id: '1', description: 'Action'}, {id: '23', description: 'Indie'}]},
    { title: 'Outer Wilds', releaseDate: '2020-06-18T00:00:00Z', price: { final: 24.99, currency: 'USD', discountPercent: 0, isFree: false }, tags: ['Exploration', 'Mystery', 'Space', 'Adventure', 'Puzzle'], genres: [{id: '1', description: 'Action'}, {id: '25', description: 'Adventure'}, {id: '23', description: 'Indie'}]},
];


export const mockGames: Game[] = gamesData.map((game, index) => ({
    ...game,
    appId: 1000 + index, // Assign a unique appId
    coverUrl: `https://placehold.co/460x215/1a202c/7dd3fc?text=${encodeURIComponent(game.title)}`,
    shortDescription: `A short description for ${game.title}. This game has tags like ${game.tags.slice(0, 2).join(', ')}.`,
    longDescription: `A much longer and more detailed description for the game called ${game.title}. It falls under genres such as ${game.genres.map(g => g.description).join(', ')} and was released on ${new Date(game.releaseDate).toLocaleDateString()}. Explore its world and enjoy the gameplay!`,
    screenshots: [
        `https://placehold.co/600x338/1a202c/7dd3fc?text=${encodeURIComponent(game.title)}+SS1`,
        `https://placehold.co/600x338/1a202c/7dd3fc?text=${encodeURIComponent(game.title)}+SS2`,
    ],
    movies: game.title === 'Hades' ? [{ 
        name: `${game.title} Trailer`, 
        thumbnail: `https://placehold.co/600x338/1a202c/7dd3fc?text=${encodeURIComponent(game.title)}+Trailer`, 
        webm: { "480": "", max: "" } 
    }] : [],
}));

// Sort by a mock relevance (reverse chronological) to have a default order
mockGames.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
