import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { RegisterService } from '../../services/register/register.service';
import {Observable} from 'rxjs';

let registerServiceStub: Partial<RegisterService>;
describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  registerServiceStub = {
    register: () => new Observable(null),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupComponent ],
      providers: [ { provide: RegisterService, useValue: registerServiceStub } ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    registerServiceStub = TestBed.inject(RegisterService);
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the form', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('form')).toBeDefined();
    expect(compiled.querySelector('label[for="firstName"]')).toBeDefined();
    expect(compiled.querySelector('label[for="firstName"]').textContent).toEqual('First Name');
    expect(compiled.querySelector('label[for="lastName"]')).toBeDefined();
    expect(compiled.querySelector('label[for="lastName"]').textContent).toEqual('Last Name');
    expect(compiled.querySelector('label[for="email"]')).toBeDefined();
    expect(compiled.querySelector('label[for="email"]').textContent).toEqual('Email');
    expect(compiled.querySelector('label[for="password"]')).toBeDefined();
    expect(compiled.querySelector('label[for="password"]').textContent).toEqual('Password');

    expect(compiled.querySelector('input#firstName')).toBeDefined();
    expect(compiled.querySelector('input#lastName')).toBeDefined();
    expect(compiled.querySelector('input#email')).toBeDefined();
    expect(compiled.querySelector('input#password')).toBeDefined();

    expect(compiled.querySelector('form button')).toBeDefined();
  });

  it ('should display error message on form submit', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('form .form-error')).toBeNull();
    component.onSubmit();
    expect(compiled.querySelector('form .form-error')).toBeDefined();
  });
});
