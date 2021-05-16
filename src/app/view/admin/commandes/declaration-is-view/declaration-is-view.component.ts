import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import {DeclarationISService} from "../../../../controller/service/declaration-is.service";
import {DeclarationIS} from "../../../../controller/model/declaration-is.model";

@Component({
  selector: 'app-declaration-is-view',
  templateUrl: './declaration-is-view.component.html',
  styleUrls: ['./declaration-is-view.component.scss']
})
export class DeclarationIsViewComponent implements OnInit {

  constructor(private messageService: MessageService, private service: DeclarationISService) {
  }

  ngOnInit(): void {
  }

  public hideViewDialog() {
    this.viewDialog = false;
  }

  get selected(): DeclarationIS {
    return this.service.selected;
  }

  set selected(value: DeclarationIS) {
    this.service.selected = value;
  }

  get viewDialog(): boolean {
    return this.service.viewDialog;
  }

  set viewDialog(value: boolean) {
    this.service.viewDialog = value;
  }

}
