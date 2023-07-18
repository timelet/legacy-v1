import styled from "../../_snowpack/pkg/@emotion/styled.js";
import React from "../../_snowpack/pkg/react.js";
import {Typography} from "../../_snowpack/pkg/@material-ui/core.js";
import {FormattedMessage} from "../../_snowpack/pkg/react-intl.js";
import EntryDisplay from "../components/entries/EntryDisplay.js";
import EntryInlineForm from "../components/entries/EntryInlineForm.js";
import {useDatabase} from "../contexts/DatabaseContext.js";
import ContentElement from "../layout/default/ContentElement.js";
import {createSubscriptionEffect} from "../utils/rxdb.js";
import {SETTINGS_DOCUMENT_ID} from "../domain/documents/settingsDocument.js";
const EntryDisplayContainer = styled(ContentElement)`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  min-height: 20vh;
`;
export default function Entries({entries: externalEntries}) {
  const database = useDatabase();
  const [categories, setCategories] = React.useState([]);
  const [tags, setTags] = React.useState([]);
  const [entries, setEntries] = React.useState(externalEntries || []);
  const [loading, setLoading] = React.useState(true);
  const createEntry = (entry) => {
    database?.entries.insert(entry);
  };
  const updateEntry = async (entry) => {
    const query = database?.entries.findOne({selector: {entryId: entry.entryId}});
    await query?.update({$set: entry});
  };
  const stopEntry = async (entryId) => {
    const query = database?.entries.findOne({selector: {entryId}});
    await query?.update({$set: {endedAt: new Date().getTime()}});
  };
  const copyEntry = async (entryId) => {
    const entry = await database?.entries.findOne({selector: {entryId}}).exec();
    if (entry) {
      await database?.entries.insert({...entry.toJSON(), entryId: void 0, startedAt: new Date().getTime(), endedAt: void 0});
    }
  };
  const removeEntry = async (entryId) => {
    const query = database?.entries.findOne({selector: {entryId}});
    await query?.remove();
  };
  const getEntries = React.useCallback(() => createSubscriptionEffect(() => externalEntries ? void 0 : database?.entries.find().$.subscribe((docs) => {
    setEntries(docs.map((doc, i) => ({...doc.toJSON(), id: i})));
    setLoading(false);
  })), [database, externalEntries]);
  const getProfile = React.useCallback(() => createSubscriptionEffect(async () => {
    const settings = await database?.getLocal(SETTINGS_DOCUMENT_ID);
    return database?.profiles.findOne({selector: {profileId: settings?.profile}}).$.subscribe((doc) => {
      setCategories(doc?.categories || []);
      setTags(doc?.tags || []);
    });
  }), [database]);
  React.useEffect(() => getEntries(), [getEntries]);
  React.useEffect(() => getProfile(), [getProfile]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(ContentElement, null, /* @__PURE__ */ React.createElement(EntryInlineForm, {
    categories,
    tags,
    create: createEntry
  })), /* @__PURE__ */ React.createElement(Typography, {
    variant: "h3"
  }, /* @__PURE__ */ React.createElement(FormattedMessage, {
    id: "title.recentEntries",
    defaultMessage: "Recent entries"
  })), /* @__PURE__ */ React.createElement(EntryDisplayContainer, null, /* @__PURE__ */ React.createElement(EntryDisplay, {
    entries,
    categories,
    tags,
    loading,
    stop: stopEntry,
    update: updateEntry,
    remove: removeEntry,
    copy: copyEntry
  })));
}
