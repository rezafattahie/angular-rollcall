export interface IGridSettings {
    columns: {
        [key: string]: {
            title: string,
            filter?: boolean,
            editable?: boolean,
            'actions.edit'?: boolean,
            class?: string
        },

    }
}