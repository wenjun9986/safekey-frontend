export class Randomizer {
    /**
     * Shuffles an array of strings.
     * @param array - The array to shuffle.
     * @returns A promise that resolves to the shuffled array.
     */
    async shuffle(array: string[]): Promise<string[]> {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    /**
     * Generates a random integer between min and max (inclusive).
     * @param min - The minimum value.
     * @param max - The maximum value.
     * @returns A promise that resolves to the random integer.
     */
    async uniform(min: number, max: number): Promise<number> {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Picks a word from the given word list, optionally formatting it.
     * @param wordList - The list of words to pick from.
     * @param options - Options to format the picked word.
     * @returns A promise that resolves to the picked word.
     */
    async pickWord(
        wordList: string[],
        options: { titleCase: boolean; number: boolean }
    ): Promise<string> {
        let word = wordList[Math.floor(Math.random() * wordList.length)];
        if (options.titleCase) {
            word = word.charAt(0).toUpperCase() + word.slice(1);
        }
        if (options.number) {
            const randomNumber = await this.uniform(0, 9);
            word += randomNumber;
        }
        return word;
    }
}

