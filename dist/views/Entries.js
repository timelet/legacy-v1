import styled from "../../_snowpack/pkg/@emotion/styled.js";
import React from "../../_snowpack/pkg/react.js";
import {FormattedMessage} from "../../_snowpack/pkg/react-intl.js";
import {Typography} from "../../_snowpack/pkg/@material-ui/core.js";
import EntryDisplay from "../components/entries/EntryDisplay.js";
import EntryInlineForm from "../components/entries/EntryInlineForm.js";
import {useDatabase} from "../contexts/DatabaseContext.js";
import ContentContainer from "../layout/default/ContentContainer.js";
import ContentElement from "../layout/default/ContentElement.js";
import {createAsyncSubscriptionEffect, createSubscriptionEffect} from "../utils/rxdb.js";
import {SETTINGS_DOCUMENT_ID} from "../domain/documents/settingsDocument.js";
const EntryDisplayContainer = styled(ContentElement)`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;
export default function Entries() {
  const database = useDatabase();
  const [categories, setCategories] = React.useState([]);
  const [entries, setEntries] = React.useState([]);
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
    await query?.update({$set: {endedAt: new Date().toISOString()}});
  };
  const removeEntry = async (entryId) => {
    const query = database?.entries.findOne({selector: {entryId}});
    await query?.remove();
  };
  React.useEffect(createSubscriptionEffect(() => database?.entries.find().$.subscribe((docs) => {
    setEntries(docs.map((doc, i) => ({...doc.toJSON(), id: i})));
    setLoading(false);
  })), [database]);
  React.useEffect(createAsyncSubscriptionEffect(async () => {
    const settings = await database?.getLocal(SETTINGS_DOCUMENT_ID);
    return database?.profiles.findOne({selector: {profileId: settings?.profile}}).$.subscribe((doc) => {
      setCategories(doc?.categories || []);
      setLoading(false);
    });
  }), [database]);
  return /* @__PURE__ */ React.createElement(ContentContainer, null, /* @__PURE__ */ React.createElement(Typography, {
    variant: "h2"
  }, /* @__PURE__ */ React.createElement(FormattedMessage, {
    id: "title.entries",
    defaultMessage: "Entries"
  })), /* @__PURE__ */ React.createElement(ContentElement, null, /* @__PURE__ */ React.createElement(EntryInlineForm, {
    categories,
    create: createEntry
  })), /* @__PURE__ */ React.createElement(EntryDisplayContainer, null, /* @__PURE__ */ React.createElement(EntryDisplay, {
    entries,
    loading,
    stop: stopEntry,
    update: updateEntry,
    remove: removeEntry
  })));
}
