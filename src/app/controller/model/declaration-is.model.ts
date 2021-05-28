import {Societe} from './societe.model';
import {Facture} from './facture.model';
import {TauxIS} from './taux-is.model';
import {TauxIsConfig} from "./taux-is-config.model";
import {EtatDeclaration} from "./etat-declaration.model";

export class DeclarationIS {
  public id: number;
  public annee: number;
  public ref: string;
  public totalHTGain: number;
  public totalHTCharge: number;
  public totalHTDiff: number;
  public montantISCalcule: number;
  public montantISPaye: number;
  public societe = new Societe();
  public tauxIS = new TauxIS();
  public tauxIsConfig = new TauxIsConfig();
  public etatDeclaration = new EtatDeclaration();
  public factureD  = new Array<Facture>();
  public factureC  = new Array<Facture>();
  public factures  = new Array<Facture>();
}
