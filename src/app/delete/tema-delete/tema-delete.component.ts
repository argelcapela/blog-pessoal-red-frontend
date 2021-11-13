import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tema } from 'src/app/model/Tema';
import { AlertasService } from 'src/app/service/alertas.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tema-delete',
  templateUrl: './tema-delete.component.html',
  styleUrls: ['./tema-delete.component.css']
})
export class TemaDeleteComponent implements OnInit {

  tema: Tema = new Tema()
  codTema: number

  constructor(
    private temaService: TemaService,
    private router: Router,
    private route: ActivatedRoute,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)

    if(environment.token == '')
    {
    this.alertas.showAlertInfo("Sua sessão expirou, faça o login novamente.")
    this.router.navigate(['/entrar'])
    }

    this.codTema = this.route.snapshot.params["codTema"]
    this.findByCodTema(this.codTema)
  }

  findByCodTema(codTema: number) {
    this.temaService.getByCodTema(codTema).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  apagar(){
    this.temaService.deleteTema(this.codTema).subscribe(()=>{
      this.alertas.showAlertSuccess("Tema apagado com sucesso!")
      this.router.navigate(['/tema'])

    })
  }

}
