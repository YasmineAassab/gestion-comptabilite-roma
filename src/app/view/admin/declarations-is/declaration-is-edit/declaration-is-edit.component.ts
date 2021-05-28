import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import {DeclarationISService} from "../../../../controller/service/declaration-is.service";
import {Table} from "primeng/table";
import {DeclarationIsObject} from "../../../../controller/model/declaration-is-object.model";
import {Facture} from "../../../../controller/model/facture.model";
import {DeclarationIS} from "../../../../controller/model/declaration-is.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-declaration-is-edit',
  templateUrl: './declaration-is-edit.component.html',
  styleUrls: ['./declaration-is-edit.component.scss']
})
export class DeclarationIsEditComponent implements OnInit {

  etat: string[];
  typeOp: any[];

  constructor(private messageService: MessageService, private service: DeclarationISService, private router: Router) {
    this.etat = [
      "valider",
      "brouillon"
    ];
  }

  ngOnInit(): void {
    this.typeOp = [
      {label: 'Débit', value: 'debit'},
      {label: 'Ctédit', value: 'credit'}
    ];
       this.service.findFactures().subscribe(data => this.selected.factures = data );
  }

  public edit(selected: DeclarationIS){
        this.service.edit().subscribe(data => {
          if (data > 0){
            console.log(data);
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Declaration IS Updated',
              life: 3000
            });
            this.selected = new DeclarationIS();
            this.router.navigateByUrl('/view/commande');
          }
        }, error => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error !!',
            life: 3000
          });
            }
        );
  }

  public openCreate() {
    this.selectedFact.societeSource.ice = this.selected.societe.ice;
    this.submitted = false;
    this.createDialog = true;
  }

  public findFactureBySocieteSourceIceAndAnneeAndTypeOperation(typeOeration: string) {
    return this.service.findFactureBySocieteSourceIceAndAnneeAndTypeOperation(typeOeration).subscribe( data => {
      this.itemsFact = data;
      console.log(data);
        }
    );
  }
  clear(table: Table) {
    table.clear();
  }

  get selected(): DeclarationIS {
    return this.service.selected;
  }

  set selected(value: DeclarationIS) {
    this.service.selected = value;
  }

  get object(): DeclarationIsObject {
    return this.service.object;
  }

  set objet(value: DeclarationIsObject) {
    this.service.object = value;
  }

  get selectedFact(): Facture {
    return this.service.selectedFact;
  }

  set selectedFact(value: Facture) {
    this.service.selectedFact = value;
  }

  get itemsFact(): Array<Facture> {
    return this.service.itemsFact;
  }

  set itemsFact(value: Array<Facture>) {
    this.service.itemsFact = value;
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


  /*
    public edit() {
      this.submitted = true;
      if (this.selected.ref.trim()) {
        if (this.selected.id) {
          this.items[this.service.findIndexById(this.selected.id)] = this.selected;
          this.service.edit().subscribe(data => {
            this.selected = data;
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Declaration IS Updated',
              life: 3000
            });
          });
        }
        this.editDialog = false;
        this.selected = new DeclarationIS();
      }
    }

    public hideEditDialog() {
      this.editDialog = false;
    }
    get selected(): DeclarationIS {
      return this.service.selected;
    }

    set selected(value: DeclarationIS) {
      this.service.selected = value;
    }

    get editDialog(): boolean {
      return this.service.editDialog;
    }

    set editDialog(value: boolean) {
      this.service.editDialog = value;
    }

    get submitted(): boolean {
      return this.service.submitted;
    }

    set submitted(value: boolean) {
      this.service.submitted = value;
    }

    get items(): Array<DeclarationIS> {
      return this.service.items;
    }

    set items(value: Array<DeclarationIS>) {
      this.service.items = value;
    }
  */

}
