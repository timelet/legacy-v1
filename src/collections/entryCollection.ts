import type { RxCollection, RxDocument, RxJsonSchema } from "rxdb"
import { v4 } from "uuid";

export type EntryDocumentType = {
    entryId: string;
    description: string;
    startedAt: number;
    endedAt: number;
}

export type EntryDocument = RxDocument<EntryDocumentType>;

export type EntryCollection = RxCollection<EntryDocumentType>;

export const entrySchema: RxJsonSchema<EntryDocumentType> = {
    title: 'entry schema',
    description: 'describes time entries',
    version: 0,
    type: 'object',
    properties: {
        entryId: {
            type: 'string',
            primary: true
        },
        description: {
            type: 'string'
        },
        startedAt: {
            type: 'number',
        },
        endedAt: {
            type: 'number'
        }
    },
    required: ['description', 'startedAt', 'endedAt']
}

export function configureEntryCollection(collection: EntryCollection) {
    collection.preInsert((data) => { data.entryId = v4()}, false);
}