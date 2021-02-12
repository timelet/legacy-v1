const DEFAULT_PROFILE = "default";
export const profileSchema = {
  title: "profile schema",
  description: "describes profiles",
  version: 3,
  type: "object",
  properties: {
    profileId: {
      type: "string",
      primary: true
    },
    userInterfaceLanguage: {
      type: "string",
      description: "Preferred ISO language for UI"
    },
    categories: {
      type: "array",
      uniqueItems: true,
      description: "Categories in this profile",
      default: [],
      items: {
        type: "object",
        properties: {
          name: {
            type: "string"
          },
          description: {
            type: "string"
          }
        },
        required: ["name"]
      }
    }
  },
  required: []
};
export function configureProfileCollection(collection) {
  collection.findOne({selector: {profileId: DEFAULT_PROFILE}}).exec().then((doc) => {
    if (!doc) {
      collection.insert({profileId: DEFAULT_PROFILE, categories: []});
    }
  });
}
export const profileCreatorBase = {
  name: "profiles",
  autoMigrate: true,
  schema: profileSchema,
  migrationStrategies: {
    1(previous) {
      return previous;
    },
    2(previous) {
      return previous;
    },
    3(previous) {
      return {
        ...previous,
        categories: previous.categories ?? []
      };
    }
  }
};
