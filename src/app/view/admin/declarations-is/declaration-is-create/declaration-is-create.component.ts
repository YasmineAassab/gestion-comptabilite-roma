import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import {DeclarationISService} from "../../../../controller/service/declaration-is.service";
import {DeclarationIsObject} from "../../../../controller/model/declaration-is-object.model";
import {DeclarationIS} from "../../../../controller/model/declaration-is.model";
import {Facture} from "../../../../controller/model/facture.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-declaration-is-create',
  templateUrl: './declaration-is-create.component.html',
  styleUrls: ['./declaration-is-create.component.scss', './declaration-is-create.component.css']
})
export class DeclarationIsCreateComponent implements OnInit {

    ice: string;
    annee: number;
    fileName: string;
    public a: boolean;
    public val: boolean;
    public bro: boolean;

  constructor(private messageService: MessageService, private service: DeclarationISService) {
  }

  ngOnInit(): void {
  }

  public findByAnnee(annee: number){
    return this.service.findByAnnee(annee).subscribe(data => this.selected = data);
  }

  public afficheObject(ice: string, annee: number){
    return this.service.afficheObject(ice, annee).subscribe(data => {
      this.selected = data;
      /*if (this.selected.declarationIS.etatDeclaration == null){
        this.val = false;
        this.bro = false;
      }
      else if (this.selected.declarationIS.etatDeclaration.libelle == 'valider'){
        this.val = true;
        this.bro = false;
      }
      else if (this.selected.declarationIS.etatDeclaration.libelle == 'brouillon'){
        this.bro = true;
        this.val = false;
      }*/

    });
  }

  public save(etat: string){
    return this.service.save(this.ice, this.annee, etat).subscribe(data => {
      console.log(data);
      if (data > 0){
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Declaration IS Created', life: 4000});
        this.selected = null;
        this.annee = null;
        this.ice = null;
      }else {
        this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Declaration IS is NOT created !       ( data = ' + data + ' )', life: 4000});
      }
    }, error => {
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Error !', life: 4000});
        }
    );
  }

  public openCreate() {
    this.selectedFact.typeOperation = "credit";
    this.selectedFact.societeSource.ice = this.ice;
    this.submitted = false;
    this.createDialog = true;
  }

  public openCreate1() {
    this.selectedFact.typeOperation = "debit";
    this.selectedFact.societeSource.ice = this.ice;
    this.submitted = false;
    this.createDialog = true;
  }

  public edit(DeclarationIS: DeclarationIS) {
    this.selected = {...DeclarationIS};
    this.editDialog = true;
  }
  public view(DeclarationIS: DeclarationIS) {
    this.selected = {...DeclarationIS};
    this.viewDialog = true;
  }
/*
  get object(): DeclarationIsObject {
    return this.service.object;
  }

  set object(value: DeclarationIsObject) {
    this.service.object = value;
  }
*/
  get selected(): DeclarationIS {
    return this.service.selected;
  }

  set selected(value: DeclarationIS) {
    this.service.selected = value;
  }

  get submitted(): boolean {
    return this.service.submitted;
  }

  set submitted(value: boolean) {
    this.service.submitted = value;
  }

  get createDialog(): boolean {
    return this.service.createDialog;
  }

  set createDialog(value: boolean) {
    this.service.createDialog = value;
  }

  get editDialog(): boolean {
    return this.service.editDialog;
  }

  set editDialog(value: boolean) {
    this.service.editDialog = value;
  }

  get viewDialog(): boolean {
    return this.service.viewDialog;
  }

  set viewDialog(value: boolean) {
    this.service.viewDialog = value;
  }

  get selectedFact(): Facture {
    return this.service.selectedFact;
  }

  set selectedFact(value: Facture) {
    this.service.selectedFact = value;
  }

  fileChanged(e) {
    this.fileName = e.target.files[0].name;
    this.a = true;
    console.log('name of file  ' + this.fileName); // name of file
  }
}
