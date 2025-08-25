import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-pokemon',
  imports: [],
  templateUrl: './pokemon.html',
  styleUrl: './pokemon.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Pokemon {

}
