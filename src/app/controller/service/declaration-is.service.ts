import { Injectable } from '@angular/core';
import {DeclarationIS} from '../model/declaration-is.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from "rxjs";
import {Facture} from "../model/facture.model";
import {DeclarationIsObject} from "../model/declaration-is-object.model";


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

  constructor(private http: HttpClient) { }

  public findAll(): Observable<Array<DeclarationIS>> {
    return this.http.get<Array<DeclarationIS>>(this._url);
  }
  
  public save(ice: string, annee: number, etat: string): Observable<number> {
    return this.http.get<number>(this.url + 'ice/' + ice + '/annee/' + annee + '/etat/' + etat);
  }

  public edit(): Observable<DeclarationIS> {
    return this.http.put<DeclarationIS>(this.url, this.selected);
  }

  public deleteByReference(): Observable<number> {
    return this.http.delete<number>(this.url + 'reference/' + this.selected.ref);
  }

  public findFactures(): Observable<Array<Facture>> {
    return this.http.get<Array<Facture>>(environment.baseUrl +'facture/societeSource/ice/'+this.selected.societe.ice+'/annee/'+ this.selected.annee);
  }

  public afficheObject(ice: string, annee: number): Observable<DeclarationIsObject>{
    return this.http.get<DeclarationIsObject>(this.url + 'afficheDecIS/ice/'+ ice +'/annee/'+ annee);
  }
  public afficheObject1(): Observable<DeclarationIsObject>{
    return this.http.post<DeclarationIsObject>(this.url + 'afficheDecIS/', this.object);
  }
  public deleteMultipleByReference(): Observable<number> {
    return this.http.post<number>(this.url + 'delete-multiple-by-reference' , this.selectes);
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
}
