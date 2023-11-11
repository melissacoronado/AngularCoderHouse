import { TestBed } from '@angular/core/testing';
import { MockProvider } from 'ng-mocks';
import { StudentsService } from './students.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { IStudent } from './models/students';
import { environment } from 'src/app/environments/environment.local';
import { RouterTestingModule } from '@angular/router/testing';



describe('UnitTesting StudentsService', () => {

  let studentService: StudentsService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [MockProvider(Router)],
    });

    studentService = TestBed.inject(StudentsService);
    httpController = TestBed.inject(HttpTestingController);
  });

    it('should create the StudentService', () => {
        expect(studentService).toBeTruthy();
    });

    it('should get the list of Students', () => {
        const studentsMock: IStudent[] = [{id: 1, nombre: 'Maria', apellido: 'Perez', email: 'correo@gmail.com', cursando: true },     
        {id: 2, nombre: 'Luis', apellido: 'Gómez', email: 'correo1@gmail.com', cursando: true},
        {id: 3, nombre: 'Laura', apellido: 'Pinho', email: 'correo2@gmail.com', cursando: false},
        {id: 4, nombre: 'Ricardo', apellido: 'Valenzuela', email: 'correo3@gmail.com', cursando: true}];

        studentService.getStudents$().subscribe(students => {
            expect(students).toEqual(studentsMock);
        });

        const req = httpController.expectOne(`${environment.baseUrl}/students`);
        expect(req.request.method).toEqual('GET');
        req.flush(studentsMock);
    });

    it('should get student by Id', () => {
        const studentMock: IStudent = {id: 1, nombre: 'Maria', apellido: 'Perez', email: 'correo@gmail.com', cursando: true };
        const studentId = 1;

        studentService.getStudentById$(1).subscribe(student => {
            expect(student).toEqual(studentMock);
        });

        const req = httpController.expectOne(`${environment.baseUrl}/students/${studentId}`);
        expect(req.request.method).toEqual('GET');
        req.flush(studentMock);
    });

    it('should create a student', () => {
        const studentMock: IStudent = {id: 10, nombre: 'Melissa', apellido: 'Coronado', email: 'correo@gmail.com', cursando: true };

        studentService.addStudent$(studentMock).subscribe(res => {
            expect(res).toBeTruthy();
        });

        const req = httpController.expectOne(`${environment.baseUrl}/students`);
        expect(req.request.method).toEqual('POST');
        req.flush({});
    });

});