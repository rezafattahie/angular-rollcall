export interface IMenu {
    id: number;
    item: string,
    path: string,
    children: [{
        subId: number,
        subItem: string,
        path: string
    }]
}