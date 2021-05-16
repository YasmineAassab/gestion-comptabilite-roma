import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import {DeclarationISService} from "../../../../controller/service/declaration-is.service";
import {DeclarationIsObject} from "../../../../controller/model/declaration-is-object.model";

@Component({
  selector: 'app-declaration-is-create',
  templateUrl: './declaration-is-create.component.html',
  styleUrls: ['./declaration-is-create.component.scss']
})
export class DeclarationIsCreateComponent implements OnInit {

    ice: string;
    annee: number;

  constructor(private messageService: MessageService, private service: DeclarationISService) {
  }

  ngOnInit(): void {
  }

  public afficheObject(ice: string, annee: number){
    return this.service.afficheObject(ice, annee).subscribe(data => this.object = data);
  }

  public save(etat: string){
      return this.service.save(this.ice, this.annee, etat).subscribe(data => {
        console.log(data);
        if (data > 0){
          this.object = null;
        }
      });
  }

/*  public hideCreateDialog() {
    this.createDialog = false;
    this.submitted = false;
  }

  public save() {
    this.submitted = true;
    if (this.selected.ref.trim()) {
      this.service.save().subscribe(data => {
        this.items.push({...data});
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Commande Created',
          life: 3000
        });
      });
      this.createDialog = false;
      this.selected = new DeclarationIS();
    }
  }
  get selected(): DeclarationIS {
    return this.service.selected;
  }

  set selected(value: DeclarationIS) {
    this.service.selected = value;
  }

  get createDialog(): boolean {
    return this.service.createDialog;
  }

  set createDialog(value: boolean) {
    this.service.createDialog = value;
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
  }  */

  get object(): DeclarationIsObject {
    return this.service.object;
  }

  set object(value: DeclarationIsObject) {
    this.service.object = value;
  }

}
