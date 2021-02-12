import {addRxPlugin, createRxDatabase} from "../_snowpack/pkg/rxdb.js";
import indexeddb from "../_snowpack/pkg/pouchdb-adapter-indexeddb.js";
import {configureEntryCollection, entryCreatorBase} from "./domain/collections/entryCollection.js";
import {configureProfileCollection, profileCreatorBase} from "./domain/collections/profileCollection.js";
import {defaultSettings, SETTINGS_DOCUMENT_ID} from "./domain/documents/settingsDocument.js";
export const DATABASE_NAME = "timelet";
addRxPlugin(indexeddb);
export async function initializeDatabase() {
  const database = await createRxDatabase({
    name: DATABASE_NAME,
    adapter: "indexeddb"
  });
  await database.addCollections({
    entries: entryCreatorBase,
    profiles: profileCreatorBase
  });
  configureEntryCollection(database.entries);
  configureProfileCollection(database.profiles);
  try {
    await database.insertLocal(SETTINGS_DOCUMENT_ID, defaultSettings);
  } catch (e) {
  }
  return database;
}
