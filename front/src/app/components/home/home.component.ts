import { Component, OnInit } from '@angular/core';
import { StatesService } from 'src/app/services/states.service';
import { BridgeService } from 'src/app/services/bridge.service';
import { UserModel } from 'src/app/interfaces/users.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  /**
   * Defini la variable arrTest
   * Link le model/interface 'UserModel' à cette variable
   * Cette variable sera poséde les propriétés du model 'UserModel'
   */
  public arrTest: UserModel;

  /**
   * Init les import de service
   */
  constructor(private statesService: StatesService,
              private bridgeState: BridgeService) { }

  ngOnInit() {
    /**
     * Crée un observable
     * Affiche dans une variable le resultat
     */
    this.bridgeState.getUser().subscribe((res) => {
      this.arrTest = res;
    });

    /**
     * Crée un observable
     * Affiche en console.log le resultat de la requête
     */
    this.bridgeState.getTest().subscribe((res) => {
      console.log(res);
    });
  }
}
