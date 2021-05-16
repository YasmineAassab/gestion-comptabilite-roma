import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import {DeclarationISService} from "../../../../controller/service/declaration-is.service";
import {DeclarationIS} from "../../../../controller/model/declaration-is.model";

@Component({
  selector: 'app-declaration-is-edit',
  templateUrl: './declaration-is-edit.component.html',
  styleUrls: ['./declaration-is-edit.component.scss']
})
export class DeclarationIsEditComponent implements OnInit {

  constructor(private messageService: MessageService, private service: DeclarationISService) {
  }

  ngOnInit(): void {
  }

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

}
