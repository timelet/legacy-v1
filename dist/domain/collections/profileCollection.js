const DEFAULT_PROFILE = "default";
export const profileSchema = {
  title: "profile schema",
  description: "describes profiles",
  version: 1,
  type: "object",
  properties: {
    profileId: {
      type: "string",
      primary: true
    },
    userInterfaceLanguage: {
      type: "string",
      description: "Preferred ISO language for UI"
    }
  },
  required: []
};
export function configureProfileCollection(collection) {
  collection.findOne({selector: {profileId: DEFAULT_PROFILE}}).exec().then((doc) => {
    if (!doc) {
      collection.insert({profileId: DEFAULT_PROFILE});
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
    }
  }
};
