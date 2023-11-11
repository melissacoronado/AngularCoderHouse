import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { SharedModule } from 'src/app/shared/shared.module';


describe('UnitTesting LoginComponent', () => {
    let loginComponent: LoginComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
          declarations: [LoginComponent],
          imports: [HttpClientTestingModule, SharedModule],
        });
        const fixture = TestBed.createComponent(LoginComponent);
        loginComponent = fixture.componentInstance;
      });


    it('should create the LoginComponent', () => {
        expect(loginComponent).toBeTruthy();
    });

    it('should mark all form fields as touched if it is invalid', () => {
        loginComponent.loginForm.patchValue({
          email: 'asndfgndskgnjdsk43534',
          password: '',
        });
        loginComponent.login();
        expect(loginComponent.loginForm.controls["email"].touched).toBeTrue();
        expect(loginComponent.loginForm.controls["password"].touched).toBeTrue();
      });

      it('should call login method of the authService if the form is valid.', () => {
        loginComponent.loginForm.patchValue({
          email: 'fakeemail@mail.com',
          password: '123456',
        });
    
        const spyOnAuthServiceLogin = spyOn(
          (loginComponent as any).authService,
          'login'
        );
    
        loginComponent.login();
    
        expect(spyOnAuthServiceLogin).toHaveBeenCalled();
      });


});
  