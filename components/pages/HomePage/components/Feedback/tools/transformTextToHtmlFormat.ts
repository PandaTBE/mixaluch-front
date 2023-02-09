const capitalize = (word: string) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`;

const capitalizeKey = (input: string) =>
    input
        .split(/(?=[A-Z])/)
        .map((word) => capitalize(word))
        .join(' ');

const newLineToken = '\n';

const lineBreak = newLineToken.repeat(2);

const formatTitle = (title: string) => `<b><i>${title}</i></b>`;

const formatEntry = ([key, value]: [string, string]) => {
    const formattedTitle = formatTitle(capitalizeKey(key));
    const formattedBody = value;

    return `${formattedTitle}${newLineToken}${formattedBody}`;
};

const transformTextToHtmlFormat = (title: string, body: { [x: string]: string }) => {
    const formattedTitle = formatTitle(title);
    const formattedBody = Object.entries(body).map(formatEntry).join(lineBreak);

    return `${formattedTitle}${lineBreak}${formattedBody}`;
};

export default transformTextToHtmlFormat;
