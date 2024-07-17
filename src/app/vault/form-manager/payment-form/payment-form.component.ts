import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent implements OnInit{

  @Output() formDataSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() formValid: EventEmitter<boolean> = new EventEmitter<boolean>();

  paymentForm: FormGroup;
  showCardNumber = false;
  showSecurityCode = false;

  constructor(private fb:FormBuilder){
    this.paymentForm = this.fb.group({
      title: ['', [Validators.required]],
      cardHolderName: [''],
      rawCardNumber: [''],
      cardNumber: ['', [Validators.required, Validators.pattern('(?:\\d{4}-){3}\\d{4}')]],
      cardType: ['', [Validators.required]],
      expirationDate: ['', [Validators.pattern('^(0[1-9]|1[0-2])\/([0-9]{2})$'), this.dateNotPastValidator]],
      securityCode: ['', [Validators.pattern('\\d{3}')]],
    });
  }

  ngOnInit(): void {
    this.paymentForm.statusChanges.subscribe(status => {
      this.formValid.emit(status === 'VALID');
    });
  }

  toggleSecurityCode(): void {
    this.showSecurityCode = !this.showSecurityCode;
  }

  toggleCardNumber(): void {
    this.showCardNumber = !this.showCardNumber;
  }
  hasError(controlName: string, errorName: string) {
    const control = this.paymentForm.controls[controlName];
    return control.hasError(errorName);
  }

  formatCardNumber(event: any): void {
    let input = event.target.value.replace(/\D/g, '');
    const cardNumberChunks = input.match(/.{1,4}/g) || [];
    this.paymentForm.get('cardNumber')?.setValue(cardNumberChunks.join('-'));
    this.paymentForm.get('rawCardNumber')?.setValue(input);
  }

  formatExpirationDate(event: any): void {
    const input = event.target.value.replace(/\D/g, ''); // Remove all non-digit characters
    if (input.length <= 2) {
      this.paymentForm.get('expirationDate')?.setValue(input);
    } else if (input.length > 2) {
      this.paymentForm.get('expirationDate')?.setValue(`${input.slice(0, 2)}/${input.slice(2, 4)}`);
    }
  }

  dateNotPastValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value && value.includes('/')) {
      const parts = value.split('/');
      if (parts.length === 2) {
        const month = parseInt(parts[0], 10);
        const year = parseInt(parts[1], 10);
        const currentYear = new Date().getFullYear() % 100; // Get last two digits of the year
        const currentMonth = new Date().getMonth() + 1;

        if (year < currentYear || (year === currentYear && month < currentMonth)) {
          return { dateInPast: true }; // Return an error if the date is in the past
        }
      }
    }
    return null;
  }

  submitFormData(){
    this.formDataSubmit.emit(this.paymentForm.value);
  }

  /*chosenYearHandler(normalizedYear: Date) {
    const ctrlValue = this.paymentForm.value.expirationDate || new Date();
    ctrlValue.setFullYear(normalizedYear.getFullYear());
    this.paymentForm.value.expirationDate.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Date, datepicker: MatDatepicker<Date>) {
    const ctrlValue = this.paymentForm.value.expirationDate || new Date();
    ctrlValue.setMonth(normalizedMonth.getMonth());
    this.paymentForm.value.expirationDate.setValue(ctrlValue);
    datepicker.close();
  }*/
}
