import { Component } from '@angular/core';

@Component({
  selector: 'app-basic-definitions',
  template: ` <div class="position-absolute w-100 end-0 ">
                <router-outlet></router-outlet>
              </div>`,
  styleUrls: ['./basic-definitions.component.scss']
})
export class BasicDefinitionsComponent {

}
