const ruKeys: Record<string, string> = {
    а: 'a',
    б: 'b',
    в: 'v',
    г: 'g',
    д: 'd',
    е: 'e',
    ё: 'e',
    ж: 'j',
    з: 'z',
    и: 'i',
    к: 'k',
    л: 'l',
    м: 'm',
    н: 'n',
    о: 'o',
    п: 'p',
    р: 'r',
    с: 's',
    т: 't',
    у: 'u',
    ф: 'f',
    х: 'h',
    ц: 'c',
    ч: 'ch',
    ш: 'sh',
    щ: 'shch',
    ы: 'y',
    э: 'e',
    ю: 'u',
    я: 'ya',
    й: 'i',
    ъ: '',
    ь: '',
    і: 'i',
    ї: 'yi',
    є: 'ye',
};

export function transliterate(word: string) {
    return word
        .split('')
        .map((letter) => {
            const lowLetter = letter.toLowerCase();
            const en = ruKeys[lowLetter] ?? letter;
            return lowLetter === letter ? en : en.slice(0, 1).toUpperCase() + en.slice(1);
        })
        .join('');
}

export const slugify = (str: string) =>
    str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
