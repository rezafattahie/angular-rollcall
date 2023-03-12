import { Injectable } from "@angular/core";

import { ApiService } from "src/app/shared/services/api.service";

@Injectable({
    providedIn: 'root'
})
export class BasicDefinitionsService {
    constructor(private api: ApiService) { }

    addNewItem(data: any, url: string) {
        return this.api.post(data, url);
    }

    getAll(url: string) {
        return this.api.get(url);
    }


    editItem(data: any, url: string, id: number) {
        return this.api.put(data, url, id)
    }

    delete(url: string, id: number) {
        return this.api.delete(url, id);
    }

}