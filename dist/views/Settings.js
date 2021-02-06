import {CircularProgress} from "../../_snowpack/pkg/@material-ui/core.js";
import React from "../../_snowpack/pkg/react.js";
import {FormattedMessage} from "../../_snowpack/pkg/react-intl.js";
import ProfileForm from "../components/settings/ProfileForm.js";
import {useDatabase} from "../domain/contexts/DatabaseContext.js";
import {SETTINGS_DOCUMENT_ID} from "../domain/documents/settingsDocument.js";
import ContentContainer from "../layout/default/ContentContainer.js";
import ContentElement from "../layout/default/ContentElement.js";
import ContentTitle from "../layout/default/ContentTitle.js";
import {createSubscriptionEffect} from "../utils/rxdb.js";
export default function Settings() {
  const database = useDatabase();
  const [profiles, setProfiles] = React.useState([]);
  const [currentProfile, setCurrentProfile] = React.useState();
  React.useEffect(createSubscriptionEffect(() => database?.profiles.find().$.subscribe((docs) => {
    setProfiles(docs);
  })), [database]);
  React.useEffect(createSubscriptionEffect(() => database?.getLocal$(SETTINGS_DOCUMENT_ID).subscribe((doc) => setCurrentProfile(profiles.find((p) => p.profileId === doc?.get("profile"))))), [profiles]);
  const selectProfile = async (profile) => {
    const currentSettings = await database?.getLocal(SETTINGS_DOCUMENT_ID);
    database?.upsertLocal(SETTINGS_DOCUMENT_ID, {...currentSettings, profile: profile.profileId});
  };
  const saveProfile = async (profile) => {
    const query = database?.profiles.findOne({selector: {profileId: profile.profileId}});
    await query?.update({$set: profile});
  };
  return /* @__PURE__ */ React.createElement(ContentContainer, null, /* @__PURE__ */ React.createElement(ContentTitle, null, /* @__PURE__ */ React.createElement(FormattedMessage, {
    id: "title.settings",
    defaultMessage: "Settings"
  })), /* @__PURE__ */ React.createElement(ContentElement, null, currentProfile ? /* @__PURE__ */ React.createElement(ProfileForm, {
    profiles,
    currentProfile,
    selectProfile,
    saveProfile
  }) : /* @__PURE__ */ React.createElement(CircularProgress, null)));
}
