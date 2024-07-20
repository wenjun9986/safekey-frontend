import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss']
})
export class NoteFormComponent implements OnInit{

    @Output() formDataSubmit: EventEmitter<any> = new EventEmitter<any>();
    @Output() formValid: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() formChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Input() formData: any;

    noteForm: FormGroup;
    initialState: any;

    constructor(
        private fb: FormBuilder,
    ){
        this.noteForm = this.fb.group({
        title: ['', [Validators.required]],
        content: [''],
        });
    }

    ngOnInit() {
        if (this.formData) {
            this.noteForm.patchValue(this.formData);
            this.initialState = this.noteForm.value; // Capture initial state
        }

        this.noteForm.valueChanges.subscribe(() => {
            const isFormDirty = JSON.stringify(this.initialState) !== JSON.stringify(this.noteForm.value);
            this.formValid.emit(this.noteForm.valid);
            this.formChanged.emit(isFormDirty);
            if (this.noteForm.valid) {
                this.formDataSubmit.emit(this.noteForm.value);
            }
        });
    }

    hasError(controlName: string, errorName: string) {
        const control = this.noteForm.controls[controlName];
        return control.hasError(errorName);
    }
}
