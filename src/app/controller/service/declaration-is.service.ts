import { Injectable } from '@angular/core';
import {DeclarationIS} from '../model/declaration-is.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from "rxjs";
import {Facture} from "../model/facture.model";
import {DeclarationIsObject} from "../model/declaration-is-object.model";
import {TauxIS} from "../model/taux-is.model";
import {DeclarationIsVo} from "../model/declaration-is-vo.model";


@Injectable({
  providedIn: 'root'
})
export class DeclarationISService {

  private _url = environment.baseUrl + 'declarationIS/';
  private _items: Array<DeclarationIS>;
  private _selected: DeclarationIS;
  private _selectes: Array<DeclarationIS>;

  private _createDialog: boolean;
  private _editDialog: boolean;
  private _viewDialog: boolean;
  private _submitted: boolean;

  private _object: DeclarationIsObject;

  private _selectedFact: Facture;
  private _itemsFact: Array<Facture>;
  private _viewDialog2: boolean;
  private _selectedVo: DeclarationIsVo;

  constructor(private http: HttpClient) { }

  public findAll(): Observable<Array<DeclarationIS>> {
    return this.http.get<Array<DeclarationIS>>(this._url);
  }
  
  public save(ice: string, annee: number, etat: string): Observable<number> {
    return this.http.get<number>(this.url + 'ice/' + ice + '/annee/' + annee + '/etat/' + etat);
  }

  public edit(): Observable<number> {
    return this.http.put<number>(this.url, this.selected);
  }

  public findByAnnee(annee: number): Observable<DeclarationIS>{
    return this.http.get<DeclarationIS>(this.url + 'annee/' + annee);
  }

  public deleteBySocieteIceAndAnnee(): Observable<number> {
    return this.http.delete<number>(this.url + '/societe/ice/'+ this.selected.societe.ice + '/annee/' + this.selected.annee);
  }

  public findFactures(): Observable<Array<Facture>> {
    return this.http.get<Array<Facture>>(environment.baseUrl +'facture/societeSource/ice/'+this.selected.societe.ice+'/annee/'+ this.selected.annee);
  }

  public XmlToObject(fileName: string): Observable<DeclarationIS>{
    return this.http.get<DeclarationIS>(this.url + 'xmlToDec/fileName/' + fileName);
  }

  public afficheObject(ice: string, annee: number): Observable<DeclarationIS>{
    return this.http.get<DeclarationIS>(this.url + 'afficheDecIS/ice/'+ ice +'/annee/'+ annee);
  }

  public calculTotalHT(factures: Array<Facture>): Observable<number>{
    return this.http.post<number>(this.url + 'calcul-totalHT/', factures);
  }

  public calculMontantIS(resultatFiscal: number): Observable<number>{
    return this.http.get<number>(this.url + 'montantISCalcule/rf/' + resultatFiscal);
  }

  public findTauxIS(totalDiff: number): Observable<TauxIS> {
    return this.http.get<TauxIS>(this.url + 'find-tauxIS/totalDiff/'+ totalDiff);
  }

  public montantPaye(age: number, cm:number, montant:number): Observable<number> {
    return this.http.get<number>(this.url + 'montantPaye/age/'+age+'/cm/'+cm+'/montantCalcule/'+ montant);
  }

  public downloadXmlFile(declarationIS: DeclarationIS): Observable<number>{
    return this.http.post<number>(this.url + 'toXML/', declarationIS);
  }

  public searchCriteria(): Observable<Array<DeclarationIS>> {
  return this.http.post<Array<DeclarationIS>>(this.url + 'criteria/', this.selectedVo);
  }

  public deleteMultipleBySocieteIceAndAnnee(): Observable<number> {
    return this.http.post<number>(this.url + 'delete-multiple-by-societe-ice-and-annee' , this.selectes);
  }

  public findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  public deleteIndexById(id: number) {
    this.items.splice(this.findIndexById(id), 1);
  }

  public deleteMultipleIndexById() {
    for (const item of this.selectes){
      this.deleteIndexById(item.id);
    }
  }

  //    FACTURE SERVICE     -----------------------------

  public saveFact(): Observable<number> {
    return this.http.post<number>(environment.baseUrl + 'facture/', this.selectedFact);
  }

  public editFact(): Observable<Facture> {
    return this.http.put<Facture>(environment.baseUrl + 'facture/', this.selectedFact);
  }

  public deleteFactByRef(): Observable<number> {
    return this.http.delete<number>(environment.baseUrl + 'facture/ref/' + this.selectedFact.ref);
  }

  public findFactureBySocieteSourceIceAndAnneeAndTypeOperation(typeOperation: string): Observable<Array<Facture>> {
    return this.http.delete<Array<Facture>>(environment.baseUrl + 'facture/societeSource/ice/'+ this.selected.societe.ice
        +'/annee/'+ this.selected.annee+'/typeoperation/' + typeOperation);
  }


  get selectedFact(): Facture {
    if (this._selectedFact == null){
      this._selectedFact =new Facture();
    }
    return this._selectedFact;
  }

  set selectedFact(value: Facture) {
    this._selectedFact = value;
  }

  get itemsFact(): Array<Facture> {
    return this._itemsFact;
  }

  set itemsFact(value: Array<Facture>) {
    this._itemsFact = value;
  }

// -----------------------------------------------------

  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._url = value;
  }

  get items(): Array<DeclarationIS> {
    return this._items;
  }

  set items(value: Array<DeclarationIS>) {
    this._items = value;
  }

  get selected(): DeclarationIS {
    if (this._selected == null){
      this._selected = new DeclarationIS();
    }
    return this._selected;
  }

  set selected(value: DeclarationIS) {
    this._selected = value;
  }

  get selectes(): Array<DeclarationIS> {
    return this._selectes;
  }

  set selectes(value: Array<DeclarationIS>) {
    this._selectes = value;
  }

  get createDialog(): boolean {
    return this._createDialog;
  }

  set createDialog(value: boolean) {
    this._createDialog = value;
  }

  get editDialog(): boolean {
    return this._editDialog;
  }

  set editDialog(value: boolean) {
    this._editDialog = value;
  }

  get viewDialog(): boolean {
    return this._viewDialog;
  }

  set viewDialog(value: boolean) {
    this._viewDialog = value;
  }

  get viewDialog2(): boolean {
    return this._viewDialog2;
  }

  set viewDialog2(value: boolean) {
    this._viewDialog2 = value;
  }

  get submitted(): boolean {
    return this._submitted;
  }

  set submitted(value: boolean) {
    this._submitted = value;
  }

  get object(): DeclarationIsObject {
    if (this._object == null){
      this._object = new DeclarationIsObject();
    }
    return this._object;
  }

  set object(value: DeclarationIsObject) {
    this._object = value;
  }

  get selectedVo(): DeclarationIsVo {
    if (this._selectedVo == null){
      this._selectedVo = new DeclarationIsVo();
    }
    return this._selectedVo;
  }

  set selectedVo(value: DeclarationIsVo) {
    this._selectedVo = value;
  }
}
