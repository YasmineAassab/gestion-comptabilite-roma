import {CompteComptable} from './compteComptable.model';

export class SousClasseComptable {
  public id: number;
  public numero: number;
  public libelle: string;
  public listeCompteComptable = new Array<CompteComptable> ();

}
