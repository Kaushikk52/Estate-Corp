import { Component ,Input, OnInit} from '@angular/core';
import { Properties } from '../../Models/properties';
import { DatabaseService } from '../../services/database.service';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'] 
})
export class CardsComponent implements OnInit{
  @Input() properties:Properties[] | undefined;

constructor(private dbServ: DatabaseService){}

ngOnInit(): void {
    this.getAllProperties();
}

  getAllProperties() {
    this.dbServ.getAllProperties().subscribe((res)=>{
        this.properties = res
        .filter((element)=> element.isApproved == 1);
    })
  }
}
