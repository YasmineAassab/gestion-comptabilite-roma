import {SousClasseComptable} from './sousClasseComptable.model';

export class ClasseComptable {
  public id: number;
  public numero: number;
  public libelle: string;
 public listeSections = new Array<SousClasseComptable>();

}
