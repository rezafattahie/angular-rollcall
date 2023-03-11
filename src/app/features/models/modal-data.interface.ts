export interface IModalData {
    actionMode: string,
    parent: string,
    title?: string,
    formFields?: IFormatFields[],
    selectedRow?: { id: number };
}

interface IFormatFields {
    name: string,
    type: 'text' | 'select' | 'chechbox',
    caption: string,
    value?: any
}
