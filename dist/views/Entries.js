import styled from "../../_snowpack/pkg/@emotion/styled.js";
import React from "../../_snowpack/pkg/react.js";
import {FormattedMessage} from "../../_snowpack/pkg/react-intl.js";
import EntryDisplay from "../components/entries/EntryDisplay.js";
import EntryInlineForm from "../components/entries/EntryInlineForm.js";
import {useDatabase} from "../domain/contexts/DatabaseContext.js";
import ContentContainer from "../layout/default/ContentContainer.js";
import ContentElement from "../layout/default/ContentElement.js";
import ContentTitle from "../layout/default/ContentTitle.js";
const EntryDisplayContainer = styled(ContentElement)`
  flex-grow: 1;
`;
export default function Entries() {
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
        setEntries(docs.map((doc, i) => ({...doc.toJSON(), id: i})));
        setLoading(false);
      });
    }
  }, [database]);
  return /* @__PURE__ */ React.createElement(ContentContainer, null, /* @__PURE__ */ React.createElement(ContentTitle, null, /* @__PURE__ */ React.createElement(FormattedMessage, {
    id: "title.entries",
    defaultMessage: "Entries"
  })), /* @__PURE__ */ React.createElement(ContentElement, null, /* @__PURE__ */ React.createElement(EntryInlineForm, {
    create: createEntry
  })), /* @__PURE__ */ React.createElement(EntryDisplayContainer, null, /* @__PURE__ */ React.createElement(EntryDisplay, {
    entries,
    loading,
    stop: stopEntry,
    update: updateEntry
  })));
}
