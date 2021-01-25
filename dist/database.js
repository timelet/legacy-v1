import {addRxPlugin, createRxDatabase} from "../_snowpack/pkg/rxdb.js";
import indexeddb from "../_snowpack/pkg/pouchdb-adapter-indexeddb.js";
import {entrySchema, configureEntryCollection} from "./collections/entryCollection.js";
addRxPlugin(indexeddb);
export async function initializeDatabase() {
  const database = await createRxDatabase({
    name: "timelet",
    adapter: "indexeddb"
  });
  await database.addCollections({
    entries: {
      schema: entrySchema,
      migrationStrategies: {
        1(previous) {
          return previous;
        }
      }
    }
  });
  configureEntryCollection(database.entries);
  return database;
}
