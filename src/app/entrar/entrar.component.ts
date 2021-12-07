import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UserLogin } from '../model/UserLogin';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  userLogin: UserLogin = new UserLogin()


  constructor(
    private auth: AuthService,
    private router: Router,
    private alertas : AlertasService
  ) {

  }

  ngOnInit() {
    window.scroll(0, 0)

    document.body.classList.add("bg-entrar-mobile")
  }

  logar(){
    this.auth.entrar(this.userLogin).subscribe((resp: UserLogin)=>{
      this.userLogin = resp
      //alert(this.userLogin.idUsuario)
      environment.token = this.userLogin.token
      environment.nomeCompleto = this.userLogin.nomeCompleto
      environment.foto = this.userLogin.foto
      environment.idUsuario = this.userLogin.idUsuario
      environment.tipo = this.userLogin.tipo

     // console.table(environment);
     // console.log("fixing bugs: " + this.userLogin.idUsuario)

      this.router.navigate(['/inicio'])
    }, erro => {
      if(erro.status == 500)
        this.alertas.showAlertDanger("Usuário ou senha estão incorretos!")
    })
  }

}
