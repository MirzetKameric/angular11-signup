import { TestBed } from '@angular/core/testing';

import { RegisterService } from './register.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('RegisterService', () => {
  let service: RegisterService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(RegisterService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should make a post request to register user', () => {
    const userData = {firstName: 'test', lastName: 'surname', email: 'email@email.com', password: 'Test1234' };

    service.register(userData).subscribe(
      data => expect(data).toEqual(null, 'expected null'),
    );
  });
});
