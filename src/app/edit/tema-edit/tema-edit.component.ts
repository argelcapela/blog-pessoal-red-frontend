import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tema } from 'src/app/model/Tema';
import { AlertasService } from 'src/app/service/alertas.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tema-edit',
  templateUrl: './tema-edit.component.html',
  styleUrls: ['./tema-edit.component.css']
})
export class TemaEditComponent implements OnInit {

  tema: Tema = new Tema()


  constructor(
    private temaService: TemaService,
    private router: Router,
    private route: ActivatedRoute,
    private alertas: AlertasService
  ) { }

  ngOnInit(){
    window.scroll(0, 0)

    if(environment.token == '')
    {
      this.alertas.showAlertInfo("Sua sessão expirou, faça o login novamente.")
      this.router.navigate(['/entrar'])
    }

    let codTema = this.route.snapshot.params['codTema']
    this.findByCodTema(codTema)
  }

  findByCodTema(codTema: number) {
    this.temaService.getByCodTema(codTema).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  atualizar()
  {
    this.temaService.putTema(this.tema).subscribe((resp: Tema) => {
      this.tema = resp
      this.alertas.showAlertSuccess("Tema atualizado com sucesso!")
      this.router.navigate(['/tema'])
    })
  }

}
