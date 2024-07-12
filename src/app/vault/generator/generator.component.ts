import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {PasswordPassphraseService} from "../../services/password-passphrase.service";
import {DefaultPasswordGenerationOptions, DefaultPassphraseGenerationOptions, PassphraseGenerationOptions, PasswordGenerationOptions} from "../../services/password-passphrase.service";
@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss']
})
export class GeneratorComponent implements OnInit{
  generatorForm :FormGroup;
  generatedPassword = "";
  passwordOptions: PasswordGenerationOptions = { ...DefaultPasswordGenerationOptions } as PasswordGenerationOptions;
  passphraseOptions: PassphraseGenerationOptions = { ...DefaultPassphraseGenerationOptions } as PassphraseGenerationOptions;

  constructor(
      private fb: FormBuilder,
      private passwordPassphraseService: PasswordPassphraseService,
  ) {
    this.generatorForm = this.fb.group({
      type: ['password'],
      length: [this.passwordOptions.length, [Validators.min(12), Validators.max(128)]],
      includeUppercase: [this.passwordOptions.uppercase],
      includeLowercase: [this.passwordOptions.lowercase],
      includeNumbers: [this.passwordOptions.number],
      includeSpecial: [this.passwordOptions.special],
      minNumbers: [this.passwordOptions.minNumber, [Validators.min(0), Validators.max(9)]],
      minSpecial: [this.passwordOptions.minSpecial, [Validators.min(0), Validators.max(9)]],
      avoidAmbiguous: [this.passwordOptions.ambiguous],
      numWords: [this.passphraseOptions.numWords , [Validators.min(3), Validators.max(10)]],
      wordSeparator: [this.passphraseOptions.wordSeparator],
      capitalize: [this.passphraseOptions.capitalize],
      includeNumber: [this.passphraseOptions.includeNumber],
    },{
      validators: this.atLeastOneCharacterTypeValidator()
    });
  }

  ngOnInit(): void {
    this.generatorForm.valueChanges.subscribe(() => {
      this.updateOptions();
      this.generatePasswordOrPassphrase();
    });

    this.generatorForm.get('includeNumbers')?.valueChanges.subscribe(value => {
      this.toggleControlState('minNumbers', value);
    });

    this.generatorForm.get('includeSpecial')?.valueChanges.subscribe(value => {
      this.toggleControlState('minSpecial', value);
    });

    this.generatePasswordOrPassphrase();
  }

  toggleControlState(controlName: string, enable: boolean): void {
    const control = this.generatorForm.get(controlName);
    if (enable) {
      control?.enable();
    } else {
      control?.disable();
    }
  }

  updateOptions(): void {
    if (this.generatorForm.get('type')?.value === 'password') {
      this.passwordOptions = {
        length: this.generatorForm.get('length')?.value,
        lowercase: this.generatorForm.get('includeLowercase')?.value,
        minLowercase: this.generatorForm.get('includeLowercase')?.value ? 1 : 0,
        uppercase: this.generatorForm.get('includeUppercase')?.value,
        minUppercase: this.generatorForm.get('includeUppercase')?.value ? 1 : 0,
        number: this.generatorForm.get('includeNumbers')?.value,
        minNumber: this.generatorForm.get('minNumbers')?.value,
        special: this.generatorForm.get('includeSpecial')?.value,
        minSpecial: this.generatorForm.get('minSpecial')?.value,
        ambiguous: !this.generatorForm.get('avoidAmbiguous')?.value,
      };
    } else {
      this.passphraseOptions = {
        numWords: this.generatorForm.get('numWords')?.value,
        capitalize: this.generatorForm.get('capitalize')?.value,
        includeNumber: this.generatorForm.get('includeNumber')?.value,
        wordSeparator: this.generatorForm.get('wordSeparator')?.value,
      };
    }
  }

  async generatePasswordOrPassphrase(): Promise<void> {
    if (this.generatorForm.get('type')?.value === 'password') {
      this.generatedPassword = await this.passwordPassphraseService.generatePassword(this.passwordOptions);
    } else {
      this.generatedPassword = await this.passwordPassphraseService.generatePassphrase(this.passphraseOptions);
    }
  }

  atLeastOneCharacterTypeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control as FormGroup;
      const includeUppercase = formGroup.get('includeUppercase')?.value;
      const includeLowercase = formGroup.get('includeLowercase')?.value;
      const includeNumbers = formGroup.get('includeNumbers')?.value;
      const includeSpecial = formGroup.get('includeSpecial')?.value;

      if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSpecial) {
        formGroup.get('includeUppercase')?.setValue(true);
      }

      return null;
    };
  }

  copyToClipboard(): void {
    navigator.clipboard.writeText(this.generatedPassword);
  }
}


