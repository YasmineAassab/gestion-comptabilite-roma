import { Component, OnInit, Input, Inject} from '@angular/core';
import {DeclarationISService} from "../../../../controller/service/declaration-is.service";
import {DeclarationIS} from "../../../../controller/model/declaration-is.model";
import {ConfirmationService, MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {Facture} from "../../../../controller/model/facture.model";
import {DeclarationIsVo} from "../../../../controller/model/declaration-is-vo.model";

@Component({
  selector: 'app-declaration-is-list',
  templateUrl: './declaration-is-list.component.html',
  styleUrls: ['./declaration-is-list.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class DeclarationIsListComponent implements OnInit {
  cols: any[];
  exportColumns: any[];
  public factureCr = new Array<Facture>();
  public factureDe = new Array<Facture>();

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService,
              private service: DeclarationISService, private router: Router) {}


  navigateToEdit(selected: DeclarationIS) {
    this.selected = selected;
    this.findFactures(selected);
    this.router.navigateByUrl('/view/declarations-is/edit');
  }

  navigateToCreate(){
    this.selected = null;
    this.router.navigateByUrl('view/declarations-is/create');
  }

  public findFactures(declarationIS: DeclarationIS){
    this.selected = declarationIS;
    return this.service.findFactures().subscribe(data => {
      this.selected.factures = data;
      for (var i = 0; i < this.selected.factures.length; i++){
        if (this.selected.factures[i].typeOperation == "credit"){
          this.factureCr.push(this.selected.factures[i]);
        }else {
          this.factureDe.push(this.selected.factures[i]);
        }
      }
      this.selected.factureC = this.factureCr;
      this.selected.factureD = this.factureDe;
    });
  }

  ngOnInit(): void {
    this.initCol();
    //this.service.findAll().subscribe(data => this.items = data);
  }

  public searchCriteria(){
    return this.service.searchCriteria().subscribe(data => this.items = data);
  }
  public delete(selected: DeclarationIS) {
    this.selected = selected;
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete declaration IS - ' + selected.ref + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.service.deleteBySocieteIceAndAnnee().subscribe(data => {
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
        this.service.deleteMultipleBySocieteIceAndAnnee().subscribe(data =>{
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
  public viewFact(facture: Facture) {
    this.selectedFact = {...facture};
    this.viewDialog2 = true;
  }

  public downloadXmlFile(selected: DeclarationIS){
    return this.service.downloadXmlFile(selected).subscribe( data => {
      if (data == 1){
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'File xml generated',
          life: 3000
        });
      }
    });
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
    this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
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

  get viewDialog2(): boolean {
    return this.service.viewDialog2;
  }

  set viewDialog2(value: boolean) {
    this.service.viewDialog2 = value;
  }

  get selectes(): Array<DeclarationIS> {
    return this.service.selectes;
  }
  set selectes(value: Array<DeclarationIS>) {
    this.service.selectes = value;
  }

  get selectedFact(): Facture {
    return this.service.selectedFact;
  }
  set selectedFact(value: Facture) {
    this.service.selectedFact = value;
  }

  get selectedVo(): DeclarationIsVo {
    return this.service.selectedVo;
  }
  set selectedVo(value: DeclarationIsVo) {
    this.service.selectedVo = value;
  }

}
