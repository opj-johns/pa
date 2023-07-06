import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  standalone:true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports:[ ReactiveFormsModule,  ]
})
export class LoginComponent implements OnInit {

  loginFormGroup!: FormGroup; 

  constructor(private formBuilder: FormBuilder, 
    private authService: AuthService, private router:Router) { }

  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(2)]]
    });
  } 

  onSubmit(){
    this.authService.authenticateUser(this.loginFormGroup.value).subscribe({
      next: (user)=>{
         this.authService.rememberUser(user);
         this.router.navigateByUrl('/admin');
      },
      error: (err)=>{
        alert(err.error.message);
      }
    })
  }
  
}
