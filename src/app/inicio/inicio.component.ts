import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { User } from '../model/User';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  postagem: Postagem = new Postagem()
  listaTemas: Tema[]
  listaPostagens: Postagem[]
  codTema: number
  tema: Tema
  user: User = new User()

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private authService: AuthService,
    private alertas: AlertasService
  ) { }

  ngOnInit(){
    window.scroll(0, 0)

    if(environment.token == '')
    {
      this.alertas.showAlertInfo("Sua sessão expirou, faça o login novamente.")
      this.router.navigate(['/entrar'])
    }

    this.getAllTemas()
    this.getAllPostagens()
  }

  getAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[]) =>{
      this.listaTemas = resp
    })
  }

  findByCodTema() {
    this.temaService.getByCodTema(this.codTema).subscribe((resp: Tema) =>{
      this.tema = resp
    })
  }

  getAllPostagens(){
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[])=>{
      this.listaPostagens = resp
    })
  }

  findByIdUser(){
    this.authService.getByIdUser(environment.idUsuario).subscribe((resp: User)=>{
      this.user = resp
    })
  }

  publicar() {
    this.tema.codTema = this.codTema
    this.postagem.fk_tema = this.tema

    this.user.idUsuario = environment.idUsuario
    this.postagem.fk_usuario = this.user

    //console.log("COMO ESTÁ NOSSA POSTAGEM?")
    //console.table(this.postagem)

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
          this.postagem = resp
          this.alertas.showAlertSuccess("Postagem realizada com sucesso!")
          this.postagem = new Postagem()
          this.getAllPostagens()
    })


  }



}
