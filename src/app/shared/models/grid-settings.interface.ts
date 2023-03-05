export interface IGridSettings {
    columns: {
        [key: string]: {
            title: string,
            filter?: boolean,
            'actions.edit'?: boolean,
            class?: string
        },

    }
}