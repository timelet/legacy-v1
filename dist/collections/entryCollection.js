import {v4} from "../../_snowpack/pkg/uuid.js";
export const entrySchema = {
  title: "entry schema",
  description: "describes time entries",
  version: 1,
  type: "object",
  properties: {
    entryId: {
      type: "string",
      primary: true
    },
    description: {
      type: "string"
    },
    startedAt: {
      type: "number"
    },
    endedAt: {
      type: "number"
    }
  },
  required: ["description", "startedAt"]
};
export function configureEntryCollection(collection) {
  collection.preInsert((data) => {
    data.entryId = v4();
  }, false);
}
