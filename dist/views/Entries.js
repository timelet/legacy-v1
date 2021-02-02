import styled from "../../_snowpack/pkg/@emotion/styled.js";
import {Container, Paper, withTheme} from "../../_snowpack/pkg/@material-ui/core.js";
import React from "../../_snowpack/pkg/react.js";
import {useIntl} from "../../_snowpack/pkg/react-intl.js";
import EntryDisplay from "../components/entries/EntryDisplay.js";
import EntryInlineForm from "../components/entries/EntryInlineForm.js";
import {useDatabase} from "../contexts/DatabaseContext.js";
const EntryContainer = withTheme(styled(Container)`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  `);
const EntryFormContainer = withTheme(styled(Paper)`
    padding: ${({theme}) => theme.spacing(2)}px;
    margin-bottom: ${({theme}) => theme.spacing(2)}px;
  `);
const EntryDisplayContainer = withTheme(styled(Paper)`
    padding: ${({theme}) => theme.spacing(2)}px;
    flex-grow: 1;
  `);
export default function Entries() {
  const intl = useIntl();
  const database = useDatabase();
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
  React.useEffect(() => {
    if (database) {
      database.entries.find().$.subscribe((docs) => {
        setEntries(docs.map((doc, i) => ({
          id: i,
          entryId: doc.entryId,
          description: doc.description,
          startedAt: `${intl.formatDate(doc.startedAt)} ${intl.formatTime(doc.startedAt)}`,
          endedAt: doc.endedAt ? `${intl.formatDate(doc.endedAt)} ${intl.formatTime(doc.endedAt)}` : void 0
        })));
        setLoading(false);
      });
    }
  }, [database]);
  return /* @__PURE__ */ React.createElement(EntryContainer, null, /* @__PURE__ */ React.createElement(EntryFormContainer, null, /* @__PURE__ */ React.createElement(EntryInlineForm, {
    create: createEntry
  })), /* @__PURE__ */ React.createElement(EntryDisplayContainer, null, /* @__PURE__ */ React.createElement(EntryDisplay, {
    entries,
    loading,
    stop: stopEntry,
    update: updateEntry
  })));
}
