import {Societe} from "./societe.model";
import {TypeDeclarationTva} from "./type-declaration-tva.model";

export class DeclarationTva {
  public id: number;
  public ref: string;
  public tvacollecter: number;
  public tvaperdue: number;
  public difftva: number;
  public annee: number;
  public mois: number;
  public trim: number;
  public societe = new Societe();
  public typeDeclarationTva = new TypeDeclarationTva();
}
