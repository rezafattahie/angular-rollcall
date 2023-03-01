import { Injectable } from "@angular/core";

import { ApiService } from "src/app/shared/services/api.service";

@Injectable({
    providedIn: 'root'
})
export class CoreService {
    constructor(private api: ApiService) { }

    getMenu() {
        return this.api.get('menu')
    }

}