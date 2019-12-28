export default class GotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`);
        }
        return await res.json();
    }

    getAllBooks() { // всего 12 книг
        return this.getResource('/books?page=1');
    }
    getBook(id) {
        return this.getResource(`/books/${id}`);
    }

    getAllCharacters() { // всего 214 страниц (2134 персонажа)
        return this.getResource('/characters?page=214&pageSize=10');
    }
    getCharacter(id) {
        return this.getResource(`/characters/${id}`);
    }

    getAllHouses() { // всего 45 страниц (444 дома)
        return this.getResource('/houses?page=45');
    }
    getHouse(id) {
        return this.getResource(`/houses/${id}`);
    }
}

