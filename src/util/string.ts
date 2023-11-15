export function convertSnakeToCamel(originString: string): string {
  const words = originString.split("_");

  const convertedString = words
    .map((word, index) => {
      if (index === 0) {
        return word;
      }
      const firstLetterCap = word.charAt(0).toUpperCase();
      const remainingLetters = word.slice(1);
      return firstLetterCap + remainingLetters;
    })
    .join("");

  return convertedString;
}
