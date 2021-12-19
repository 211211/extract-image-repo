export const isNullOrWhiteSpace = (input: string) =>
    !input || input === null || input.match(/^ *$/) !== null
