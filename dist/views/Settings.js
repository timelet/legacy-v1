import {CircularProgress, Typography} from "../../_snowpack/pkg/@material-ui/core.js";
import React from "../../_snowpack/pkg/react.js";
import {FormattedMessage, useIntl} from "../../_snowpack/pkg/react-intl.js";
import saveFile from "../../_snowpack/pkg/save-as-file.js";
import {format} from "../../_snowpack/pkg/date-fns.js";
import StorageManagement from "../components/settings/StorageManagement.js";
import ProfileForm from "../components/settings/ProfileForm.js";
import {useDatabase} from "../contexts/DatabaseContext.js";
import {SETTINGS_DOCUMENT_ID} from "../domain/documents/settingsDocument.js";
import ContentElement from "../layout/default/ContentElement.js";
import {createSubscriptionEffect} from "../utils/rxdb.js";
import ReplicationForm from "../components/settings/ReplicationForm.js";
import {REPLICATION_DOCUMENT_ID} from "../domain/models/replicationModel.js";
export default function Settings() {
  const intl = useIntl();
  const database = useDatabase();
  const [profiles, setProfiles] = React.useState([]);
  const [currentProfile, setCurrentProfile] = React.useState();
  const [replicationUrl, setReplicationUrl] = React.useState();
  const getProfiles = React.useCallback(() => createSubscriptionEffect(() => database?.profiles.find().$.subscribe((docs) => {
    setProfiles(docs);
  })), [database]);
  const getCurrentProfile = React.useCallback(() => createSubscriptionEffect(() => profiles ? database?.getLocal$(SETTINGS_DOCUMENT_ID).subscribe((doc) => setCurrentProfile(profiles.find((p) => p.profileId === doc?.get("profile")))) : void 0), [database, profiles]);
  const getReplicationUrl = React.useCallback(() => createSubscriptionEffect(() => database?.getLocal$(REPLICATION_DOCUMENT_ID).subscribe((doc) => {
    setReplicationUrl(doc?.get("url"));
  })), [database]);
  React.useEffect(() => getProfiles(), [getProfiles]);
  React.useEffect(() => getCurrentProfile(), [getCurrentProfile]);
  React.useEffect(() => getReplicationUrl(), [getReplicationUrl]);
  const selectProfile = async (profile) => {
    const currentSettings = await database?.getLocal(SETTINGS_DOCUMENT_ID);
    database?.upsertLocal(SETTINGS_DOCUMENT_ID, {...currentSettings, profile: profile.profileId});
  };
  const saveProfile = async (profile) => {
    const query = database?.profiles.findOne({selector: {profileId: profile.profileId}});
    await query?.update({$set: profile});
  };
  const saveUrl = async (url) => {
    await database?.upsertLocal(REPLICATION_DOCUMENT_ID, {
      url
    });
  };
  const exportDump = async () => {
    const dump = await database?.dump();
    if (dump) {
      const filename = `${intl.formatMessage({id: "app.title", defaultMessage: "Timelet"})}-${format(new Date(), "yyyy-MM-dd_HH-mm")}.json`.toLowerCase();
      const type = "text/plain;charset=utf-8";
      const file = new Blob([JSON.stringify(dump)], {type});
      saveFile(file, filename);
    }
  };
  const importDump = async (fileContent) => {
    const dump = JSON.parse(fileContent);
    await database?.importDump(dump);
  };
  const deleteAllLocalData = async () => {
    await database?.remove();
    window.location.reload();
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(ContentElement, null, /* @__PURE__ */ React.createElement(Typography, {
    variant: "h3"
  }, /* @__PURE__ */ React.createElement(FormattedMessage, {
    id: "title.profiles",
    defaultMessage: "Profiles"
  })), currentProfile ? /* @__PURE__ */ React.createElement(ProfileForm, {
    profiles,
    currentProfile,
    selectProfile,
    saveProfile
  }) : /* @__PURE__ */ React.createElement(CircularProgress, null)), /* @__PURE__ */ React.createElement(ContentElement, null, /* @__PURE__ */ React.createElement(Typography, {
    variant: "h3"
  }, /* @__PURE__ */ React.createElement(FormattedMessage, {
    id: "title.replication",
    defaultMessage: "Replication"
  })), /* @__PURE__ */ React.createElement(ReplicationForm, {
    saveUrl,
    url: replicationUrl
  })), /* @__PURE__ */ React.createElement(ContentElement, null, /* @__PURE__ */ React.createElement(Typography, {
    variant: "h3"
  }, /* @__PURE__ */ React.createElement(FormattedMessage, {
    id: "title.storage",
    defaultMessage: "Storage"
  })), /* @__PURE__ */ React.createElement(StorageManagement, {
    exportDump,
    importDump,
    deleteAllLocalData
  })));
}
