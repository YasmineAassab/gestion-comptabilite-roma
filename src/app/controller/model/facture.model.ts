import {Societe} from './societe.model';
import {DeclarationIS} from './declaration-is.model';
import {Tva} from './tva.model';
import {ClasseComptable} from "./classeComptable.model";
import {DeclarationTva} from "./declaration-tva.model";
import {DeclarationIR} from "./declaration-ir.model";
import {EtatPaiement} from "./etat-paiement.model";
import {EtatFacture} from "./etat-facture.model";

export class Facture {
  public id: number;
  public ref: string;
  public libelle: string;
  public dateOperation: string;
  public montantHorsTaxe: number;
  public annee: number;
  public mois: number;
  public trim: number;
  public montantTTC: number;
  public montantTVA: number;
  public typeOperation: string;
  public societeSource = new Societe();
  public societeDistination = new Societe();
  public tva = new Tva();
  public classComptable = new ClasseComptable();
  public  declarationIS = new DeclarationIS();
  public declarationTva = new DeclarationTva();
  public declarationIR = new DeclarationIR();
  public etatPaiement = new EtatPaiement();
  public etatFacture = new EtatFacture();
}
