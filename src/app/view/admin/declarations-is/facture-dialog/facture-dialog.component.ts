import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import {DeclarationISService} from "../../../../controller/service/declaration-is.service";
import {Facture} from "../../../../controller/model/facture.model";
import {DeclarationIS} from "../../../../controller/model/declaration-is.model";
import {DeclarationIsObject} from "../../../../controller/model/declaration-is-object.model";
import {Observable} from "rxjs";
import {TauxIS} from "../../../../controller/model/taux-is.model";

@Component({
  selector: 'app-facture-dialog',
  templateUrl: './facture-dialog.component.html',
  styleUrls: ['./facture-dialog.component.scss']
})
export class FactureDialogComponent implements OnInit {

  public facturat = new Array<Facture>();
  //public facturesD = new Array<Facture>();

  constructor(private messageService: MessageService, private service: DeclarationISService) { }

  ngOnInit(): void {
  }

  public hideCreateDialog() {
    this.createDialog = false;
    this.submitted = false;
  }

  public saveFact() {
    this.submitted = true;
    if (this.selectedFact.ref.trim()) {
      this.service.saveFact().subscribe(data => {
        if (data > 0){
          if (this.selectedFact.typeOperation == "credit"){
            this.selected.factureC.push({...this.selectedFact});
            this.selected.totalHTGain += this.selectedFact.montantHorsTaxe;
          }
          if (this.selectedFact.typeOperation == "debit"){
            this.selected.factureD.push({...this.selectedFact});
            this.selected.totalHTCharge += this.selectedFact.montantHorsTaxe;
          }
          this.selected.factures = this.selected.factureC;
          this.selected.factures.concat(this.selected.factureD);
          this.selected.totalHTDiff = this.selected.totalHTGain - this.selected.totalHTCharge;
          this.calculMontantIS(this.selected.totalHTDiff);
          this.findTauxIS(this.selected.totalHTDiff);
          this.montantPaye(this.selected.societe.age, this.selected.tauxIsConfig.cotisationMinimale, this.selected.montantISCalcule);
/*
          this.selected.factures.push({...this.selectedFact});
          if (this.selectedFact.typeOperation == 'credit'){
            this.selected.totalHTGain += this.selectedFact.montantHorsTaxe;
          }
          if (this.selectedFact.typeOperation == 'debit'){
            this.selected.totalHTCharge += this.selectedFact.montantHorsTaxe;
          }
          this.selected.totalHTDiff = this.selected.totalHTGain - this.selected.totalHTCharge;
          console.log('selected');
          this.calculMontantIS(this.selected.totalHTDiff);
          this.findTauxIS(this.selected.totalHTDiff);
          this.montantPaye(this.selected.societe.age, this.selected.tauxIsConfig.cotisationMinimale, this.selected.montantISCalcule);
          this.service.afficheObject(this.selectedFact.societeSource.ice, this.selectedFact.annee);

 */
          this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Facture Created', life: 4000});
          this.selectedFact = null;
        }
        else {
          this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Facture No created ! ( data = ' + data + ' )', life: 4000});
        }
      }, error => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Facture No Created', life: 4000});
          }
      );
      this.createDialog = false;
    }
  }

  public calculMontantIS(resultatFiscal: number) {
    return this.service.calculMontantIS(resultatFiscal).subscribe(data => {
      this.selected.montantISCalcule = data;
      console.log('cal cal cal')
    });
  }
  public findTauxIS(totalDiff: number) {
    return this.service.findTauxIS(totalDiff).subscribe(data => this.selected.tauxIS = data);
  }
  public montantPaye(age: number, cm:number, montant:number) {
    this.service.montantPaye(age, cm, montant).subscribe(data => {
      console.log('montant qbel '+this.selected.montantISPaye);
      this.selected.montantISPaye = data;
      console.log('montant be3eed '+data);
    });
  }
/*
  public calculTotalHTG(fc: Array<Facture>) {
    return this.service.calculTotalHT(fc).subscribe(data => {
      console.log('miaou');
      this.selected.totalHTGain = data;
    });
  }
*/
  get selectedFact(): Facture {
    return this.service.selectedFact;
  }

  set selectedFact(value: Facture) {
    this.service.selectedFact = value;
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

  set object(value: DeclarationIsObject) {
    this.service.object = value;
  }

}
