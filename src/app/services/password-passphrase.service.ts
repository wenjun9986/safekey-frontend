import {Injectable} from '@angular/core';
import {EFFLongWordList} from "../../assets/misc/wordlist"
import {Randomizer} from '../abstractions/randomizer'; // Ensure this path is correct

// Define the necessary interfaces and enums here
export interface PasswordGenerationOptions {
  length: number;
  lowercase: boolean;
  minLowercase: number;
  uppercase: boolean;
  minUppercase: number;
  number: boolean;
  minNumber: number;
  special: boolean;
  minSpecial: number;
  ambiguous: boolean;
}

export interface PassphraseGenerationOptions {
  numWords: number;
  capitalize: boolean;
  includeNumber: boolean;
  wordSeparator: string;
}

export const DefaultPasswordGenerationOptions: Partial<PasswordGenerationOptions> = {
    length: 12,
    lowercase: true,
    minLowercase: 1,
    uppercase: true,
    minUppercase: 1,
    number: true,
    minNumber: 1,
    special: true,
    minSpecial: 1,
    ambiguous: false
}

export const DefaultPassphraseGenerationOptions: Partial<PassphraseGenerationOptions> = {
    numWords: 3,
    capitalize: false,
    includeNumber: false,
    wordSeparator: "-"

}

@Injectable({
  providedIn: 'root'
})
export class PasswordPassphraseService {
  constructor(private randomizer: Randomizer) {}

  /** Generate a password based on the provided options */
  async generatePassword(options: PasswordGenerationOptions): Promise<string> {
    const o = { ...DefaultPasswordGenerationOptions, ...options };
    let positions: string[] = [];
    if (o.lowercase && o.minLowercase > 0) {
      for (let i = 0; i < o.minLowercase; i++) {
        positions.push("l");
      }
    }
    if (o.uppercase && o.minUppercase > 0) {
      for (let i = 0; i < o.minUppercase; i++) {
        positions.push("u");
      }
    }
    if (o.number && o.minNumber > 0) {
      for (let i = 0; i < o.minNumber; i++) {
        positions.push("n");
      }
    }
    if (o.special && o.minSpecial > 0) {
      for (let i = 0; i < o.minSpecial; i++) {
        positions.push("s");
      }
    }
    while (positions.length < o.length) {
      positions.push("a");
    }

    positions = await this.randomizer.shuffle(positions);

    let allCharSet = "";
    let lowercaseCharSet = "abcdefghijkmnopqrstuvwxyz";
    if (o.ambiguous) {
      lowercaseCharSet += "l";
    }
    if (o.lowercase) {
      allCharSet += lowercaseCharSet;
    }

    let uppercaseCharSet = "ABCDEFGHJKLMNPQRSTUVWXYZ";
    if (o.ambiguous) {
      uppercaseCharSet += "IO";
    }
    if (o.uppercase) {
      allCharSet += uppercaseCharSet;
    }

    let numberCharSet = "23456789";
    if (o.ambiguous) {
      numberCharSet += "01";
    }
    if (o.number) {
      allCharSet += numberCharSet;
    }

    const specialCharSet = "!@#$%^&*";
    if (o.special) {
      allCharSet += specialCharSet;
    }

    let password = "";
    for (let i = 0; i < o.length; i++) {
      let positionChars: string;
      switch (positions[i]) {
        case "l":
          positionChars = lowercaseCharSet;
          break;
        case "u":
          positionChars = uppercaseCharSet;
          break;
        case "n":
          positionChars = numberCharSet;
          break;
        case "s":
          positionChars = specialCharSet;
          break;
        case "a":
          positionChars = allCharSet;
          break;
        default:
          break;
      }

      // @ts-ignore
      const randomCharIndex = await this.randomizer.uniform(0, positionChars.length - 1);
      // @ts-ignore
      password += positionChars.charAt(randomCharIndex);
    }

    return password;
  }

  /** Generate a passphrase based on the provided options */
  async generatePassphrase(options: PassphraseGenerationOptions): Promise<string> {
    const o = { ...DefaultPassphraseGenerationOptions, ...options };
    if (o.numWords == null || o.numWords <= 2) {
      o.numWords = <number>DefaultPassphraseGenerationOptions.numWords;
    }
    if (o.capitalize == null) {
      o.capitalize = false;
    }
    if (o.includeNumber == null) {
      o.includeNumber = false;
    }

    let luckyNumber = -1;
    if (o.includeNumber) {
      luckyNumber = await this.randomizer.uniform(0, o.numWords - 1);
    }

    const wordList = new Array(o.numWords);
    for (let i = 0; i < o.numWords; i++) {
      wordList[i] = await this.randomizer.pickWord(EFFLongWordList, {
        titleCase: o.capitalize,
        number: i === luckyNumber,
      });
    }

    return wordList.join(o.wordSeparator);
  }
}
