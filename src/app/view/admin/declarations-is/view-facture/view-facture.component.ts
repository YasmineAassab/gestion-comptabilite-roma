import { Component, OnInit } from '@angular/core';
import {MessageService} from "primeng/api";
import {DeclarationISService} from "../../../../controller/service/declaration-is.service";
import {Facture} from "../../../../controller/model/facture.model";

@Component({
  selector: 'app-view-facture',
  templateUrl: './view-facture.component.html',
  styleUrls: ['./view-facture.component.scss']
})
export class ViewFactureComponent implements OnInit {

  constructor(private messageService: MessageService, private service: DeclarationISService) { }

  ngOnInit(): void {
  }

  public hideViewDialog() {
    this.viewDialog2 = false;
  }

  get selectedFact(): Facture {
    return this.service.selectedFact;
  }

  set selectedFact(value: Facture) {
    this.service.selectedFact = value;
  }

  get viewDialog2(): boolean {
    return this.service.viewDialog2;
  }

  set viewDialog2(value: boolean) {
    this.service.viewDialog2 = value;
  }
}
