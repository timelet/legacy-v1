import {v4} from "../../_snowpack/pkg/uuid.js";
export const entrySchema = {
  title: "entry schema",
  description: "describes time entries",
  version: 0,
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
  required: ["description", "startedAt", "endedAt"]
};
export function configureEntryCollection(collection) {
  collection.preInsert((data) => {
    data.entryId = v4();
  }, false);
}
