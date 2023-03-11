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

    getStudents() {
        return this.api.get('students');
    }


    getCourses() {
        return this.api.get('courses');
    }
}