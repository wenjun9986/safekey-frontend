import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss']
})
export class NoteFormComponent implements OnInit{

    @Output() formDataSubmit: EventEmitter<any> = new EventEmitter<any>();
    @Output() formValid: EventEmitter<boolean> = new EventEmitter<boolean>();

    noteForm: FormGroup;

    constructor(
        private fb: FormBuilder,
    ){
        this.noteForm = this.fb.group({
        title: ['', [Validators.required]],
        content: [''],
        });
    }

    ngOnInit(): void {
        this.noteForm.statusChanges.subscribe(status => {
            this.formValid.emit(status === 'VALID');
        });
    }

    hasError(controlName: string, errorName: string) {
        const control = this.noteForm.controls[controlName];
        return control.hasError(errorName);
    }

    submitFormData(){
        this.formDataSubmit.emit(this.noteForm.value);
    }

}
