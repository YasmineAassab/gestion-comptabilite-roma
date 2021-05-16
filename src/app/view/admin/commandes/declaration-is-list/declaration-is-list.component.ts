import { Component, OnInit } from '@angular/core';
import {DeclarationISService} from "../../../../controller/service/declaration-is.service";
import {DeclarationIS} from "../../../../controller/model/declaration-is.model";
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
  selector: 'app-declaration-is-list',
  templateUrl: './declaration-is-list.component.html',
  styleUrls: ['./declaration-is-list.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class DeclarationIsListComponent implements OnInit {
  cols: any[];

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService,
              private service: DeclarationISService) {
  }

  ngOnInit(): void {
    this.initCol();
    this.service.findAll().subscribe(data => this.items = data);
  }

  public delete(selected: DeclarationIS) {
    this.selected = selected;
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + selected.ref + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.service.deleteByReference().subscribe(data => {
          this.items = this.items.filter(val => val.id !== this.selected.id);
          this.selected = new DeclarationIS();
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'DeclarationIS Deleted',
            life: 3000
          });
        });
      }
    });
  }
  public deleteMultiple() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected declarations IS?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.service.deleteMultipleByReference().subscribe(data =>{
          this.service.deleteMultipleIndexById();
          this.selectes = null;
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Declarations IS Deleted',
            life: 3000
          });
        });
      }
    });
  }

  public findFactures(declarationIS: DeclarationIS){
    this.selected = declarationIS;
    return this.service.findFactures().subscribe(data => this.selected.factures = data );
  }

  public openCreate() {
    this.selected = new DeclarationIS();
    this.submitted = false;
    this.createDialog = true;
  }

  public edit(declarationIS: DeclarationIS) {
    this.selected = {...declarationIS};
    this.editDialog = true;
  }
  public view(declarationIS: DeclarationIS) {
    this.selected = {...declarationIS};
    this.viewDialog = true;
  }

  private initCol() {
    this.cols = [
      {field: 'id', header: 'Id'},
      {field: 'ref', header: 'Reference'},
      {field: 'annee', header: 'Année'},
      {field: 'societe', header: 'Société'},
      {field: 'totalHTDiff', header: 'Résultat fiscal'},
      {field: 'montantISCalcule', header: 'Montant calculé'},
      {field: 'montantISPaye', header: 'Montant payé'},
      {field: 'etatDeclaration', header: 'État'}

    ];
  }

  get selected(): DeclarationIS {
    return this.service.selected;
  }

  set selected(value: DeclarationIS) {
    this.service.selected = value;
  }

  get items(): Array<DeclarationIS> {
    return this.service.items;
  }

  set items(value: Array<DeclarationIS>) {
    this.service.items = value;
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

  get selectes(): Array<DeclarationIS> {
    return this.service.selectes;
  }

  set selectes(value: Array<DeclarationIS>) {
    this.service.selectes = value;
  }

}
