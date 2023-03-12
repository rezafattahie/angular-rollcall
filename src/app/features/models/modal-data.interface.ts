export interface IModalData {
    actionMode: string,
    parent: string,
    title?: string,
    formFields?: IFormFields[],
    selectedRow?: any;
}

export interface IFormFields {
    name: any,
    allowNull: boolean,
    type: 'text' | 'select' | 'checkbox',
    caption: string,
    value?: any
}
