import {v4} from "../../../_snowpack/pkg/uuid.js";
export const entrySchema = {
  title: "entry schema",
  description: "describes time entries",
  version: 5,
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
      type: "string",
      description: "ISO date string of an activities starting point"
    },
    endedAt: {
      type: "string",
      description: "ISO date string of an activities ending point"
    },
    category: {
      type: "string",
      description: "Category of this entry"
    }
  },
  required: ["description", "startedAt"]
};
export function configureEntryCollection(collection) {
  collection.preInsert((data) => {
    data.entryId = v4();
  }, false);
}
export const entryCreatorBase = {
  name: "entries",
  schema: entrySchema,
  migrationStrategies: {
    1(previous) {
      return previous;
    },
    2(previous) {
      return {
        ...previous,
        startedAt: new Date(previous.startedAt).toISOString(),
        endedAt: previous.endedAt ? new Date(previous.endedAt).toISOString() : void 0
      };
    },
    3(previous) {
      return {
        ...previous,
        startedAt: new Date(previous.startedAt).toISOString(),
        endedAt: previous.endedAt === "Undefined" ? void 0 : previous.endedAt
      };
    },
    4(previous) {
      return {
        ...previous
      };
    },
    5(previous) {
      return {
        ...previous
      };
    }
  }
};
