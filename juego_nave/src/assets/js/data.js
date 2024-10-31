import { getSettingsFromLocalStorage } from './utils.js';

const wordArray = [
    "espresso", "café", "barista", "capuchino", "latte", "tostado", "mocha",
    "americano", "cortado", "caramelo", "sabor", "amargo", "crema",
    "artesanal", "grano", "molido", "té", "infusión", "dulce", 
    "helado", "cobertura", "mezcla", "filtro", "especialidad", "caliente", 
    "macchiato", "chocolate", "descafeinado", "sosneado", "pizza", "carta", "waffles", 
    "empanadas", "bebidas"
];

export const getWordsArrayBySettingsOrPlatform = () => {
    const gameSettings = getSettingsFromLocalStorage();
    // check if it's Windows or macOS
    if (navigator.userAgent.includes('Win') && gameSettings?.['enable-accents']) {
        return wordArray;
    }
    return removeAccentsFromWordsArray();
}

const removeAccentsFromWordsArray = () => {
    return wordArray.filter(word => !hasAccent(word));
}

const hasAccent = (word) => {
    const specialChars = /[áéíóúÁÉÍÓÚ]/;
    return specialChars.test(word);
}
