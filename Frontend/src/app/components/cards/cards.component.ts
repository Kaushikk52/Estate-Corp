import { Component ,Input} from '@angular/core';
import { Properties } from '../../Models/properties';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'] 
})
export class CardsComponent {
  @Input() property!: Properties;
  @Input() isApproved!: number;
}
