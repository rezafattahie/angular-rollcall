import { Component, OnInit } from '@angular/core';
import { IMenu } from '../../models/menu.interface';
import { CoreService } from '../../services/core.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class menuComponent implements OnInit {

  menuItems: IMenu[] = [];
  isLoading: boolean = false;
  showChildren: boolean = false;

  constructor(private coreService: CoreService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.coreService.getMenu().subscribe((result: any) => {
      if (result) {
        this.menuItems = result;
        this.isLoading = false;
      }
    })
  }
  showChildrens() {
    this.showChildren = !this.showChildren;
  }
}


