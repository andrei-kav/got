import React from 'react';

export default class GotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);
        if (!res.ok) {
            throw {
                status: res.status,
                // status: 345,
                text: new Error(`Could not fetch ${url}, received ${res.status}`)
            };
        }
        return await res.json();
    };

    getAllBooks = async () => { // всего 12 книг
        const res = await this.getResource('/books?page=1');
        return res.map(this._transformBook);
    };
    getBook = async (id) => {
        const book = await this.getResource(`/books/${id}`);
        return this._transformBook(book);
    };

    getAllCharacters = async () => { // всего 214 страниц (2134 персонажа)
        const res = await this.getResource('/characters?page=5&pageSize=10');
        return res.map(this._transformCharacter);
    };
    getCharacter = async (id) => {
        const char = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(char);
    };

    getAllHouses = async () => { // всего 45 страниц (444 дома)
        const res = await this.getResource('/houses?page=1');
        return res.map(this._transformHouse);
    };
    getHouse = async (id) => {
        const house = await this.getResource(`/houses/${id}`);
        return this._transformHouse(house);
    };

    isSet(data) {
        const dataStr = data.toString();
        if (dataStr.length > 1) {
            if (typeof data == 'number') {
                return data;
            }
            return dataStr;
        } else {
            return (
                <span className="no-item-data">no data</span>
            );
        }
    }

    // функции для оптимизации работы со стейтом компонентов
    // используем стрелочные функции чтоьы не потерять контекст
    _transformCharacter = (char) => {
        return {
            id: char.url.split('/')[char.url.split('/').length - 1],
            name: this.isSet(char.name),
            gender: this.isSet(char.gender),
            born: this.isSet(char.born),
            died: this.isSet(char.died),
            culture: this.isSet(char.culture)
        }
    };
    _transformHouse = (house) => {
        return {
            id: house.url.split('/')[house.url.split('/').length - 1],
            name: this.isSet(house.name),
            region: this.isSet(house.region),
            words: this.isSet(house.words),
            titles: this.isSet(house.titles),
            overlord: this.isSet(house.overlord),
            ancestralWeapons: this.isSet(house.ancestralWeapons)
        }
    };
    _transformBook = (book) => {
        return {
            id: book.url.split('/')[book.url.split('/').length - 1],
            name: this.isSet(book.name),
            numberOfPages: this.isSet(book.numberOfPages),
            publisher: this.isSet(book.publisher),
            released: this.isSet(book.released)
        }
    };
}

