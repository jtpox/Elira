function validateJSON(unvalidatedText: string): boolean {
    try {
        const parsedText = JSON.parse(unvalidatedText);
        if (parsedText && typeof parsedText === 'object') {
            return true;
        }

        throw new Error('Parse error.');
    } catch (err) {
        return false;
    }
}

export { validateJSON }