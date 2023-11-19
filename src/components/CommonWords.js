import wordlist from "./wordlist.txt?raw";
export const commonWords = wordlist.split("\n");
export const easyWords = commonWords.splice(0, 200);
