export interface IModalData {
    actionMode: string,
    title?: string,
    formFields?: IFormFields[],
    selectedRow?: any;
}

export interface IFormFields {
    name: any,
    allowNull: boolean,
    type: 'textInput' | 'select' | 'checkbox' | 'text' | 'image' | '',
    caption: string,
    value?: any
}
