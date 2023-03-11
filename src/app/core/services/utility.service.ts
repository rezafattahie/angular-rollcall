import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class UtilityService {

    getKeyByValue(object: any, value: any) {
        let found: string[] = []
        for (const key in object) {
            if (object[key] === value) {
                found.push(key)
            }
        }
        return found;
    }

}