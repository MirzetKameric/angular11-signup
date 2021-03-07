import { AbstractControl } from '@angular/forms';

export function isFieldValid(field: AbstractControl): boolean {
  return (!field.valid && (field.dirty || field.touched));
}
