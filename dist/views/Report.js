import styled from "../../_snowpack/pkg/@emotion/styled.js";
import {CircularProgress, Typography, withTheme} from "../../_snowpack/pkg/@material-ui/core.js";
import React, {useEffect, useState} from "../../_snowpack/pkg/react.js";
import {FormattedMessage} from "../../_snowpack/pkg/react-intl.js";
import PredefinedDateRangePicker from "../components/PredefinedDateRangePicker.js";
import CategoryTagFilter from "../components/CategoryTagFilter.js";
import CategoryTagPieChart from "../components/report/CategoryTagPieChart.js";
import EntryTable from "../components/report/EntryTable.js";
import ExportEntries from "../components/report/ExportEntries.js";
import SummaryTable from "../components/report/SummaryTable.js";
import {useDatabase} from "../contexts/DatabaseContext.js";
import ContentElement from "../layout/default/ContentElement.js";
import {createSubscriptionEffect} from "../utils/rxdb.js";
const ReportContentContainer = withTheme(styled(ContentElement)`
    flex-grow: 1;
    display: flex;
    flex-direction: column;

    & > *:nth-of-type(2) {
      margin-bottom: ${({theme}) => theme.spacing(2)}px;
    }
  `);
const ReportContentElement = withTheme(styled.div`
    margin: ${({theme}) => theme.spacing(2)}px 0;
  `);
function RenderElements({entries}) {
  if (entries.length <= 0) {
    return /* @__PURE__ */ React.createElement(FormattedMessage, {
      id: "label.noEntriesFound",
      defaultMessage: "Couldn't find any entries"
    });
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(ReportContentElement, null, /* @__PURE__ */ React.createElement(Typography, {
    variant: "h3"
  }, /* @__PURE__ */ React.createElement(FormattedMessage, {
    id: "title.overviewOfCategoriesAndTags",
    defaultMessage: "Overview of categories and tags"
  })), /* @__PURE__ */ React.createElement(CategoryTagPieChart, {
    entries
  })), /* @__PURE__ */ React.createElement(ReportContentElement, null, /* @__PURE__ */ React.createElement(Typography, {
    variant: "h3"
  }, /* @__PURE__ */ React.createElement(FormattedMessage, {
    id: "title.summary",
    defaultMessage: "Summary"
  })), /* @__PURE__ */ React.createElement(SummaryTable, {
    entries
  })), /* @__PURE__ */ React.createElement(ReportContentElement, null, /* @__PURE__ */ React.createElement(Typography, {
    variant: "h3"
  }, /* @__PURE__ */ React.createElement(FormattedMessage, {
    id: "title.selectedEntries",
    defaultMessage: "Selected entries"
  })), /* @__PURE__ */ React.createElement(EntryTable, {
    entries
  })), /* @__PURE__ */ React.createElement(ReportContentElement, null, /* @__PURE__ */ React.createElement(Typography, {
    variant: "h3"
  }, /* @__PURE__ */ React.createElement(FormattedMessage, {
    id: "title.dataExport",
    defaultMessage: "Data export"
  })), /* @__PURE__ */ React.createElement(ExportEntries, {
    entries
  })));
}
export default function Report() {
  const database = useDatabase();
  const [dateRange, setDateRange] = useState();
  const [entries, setEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const getEntries = React.useCallback(() => createSubscriptionEffect(() => database?.entries.find({selector: {startedAt: {$gte: dateRange?.from}, endedAt: {$lte: dateRange?.to}}}).$.subscribe((docs) => {
    setEntries(docs);
    setFilteredEntries(docs);
    setLoading(false);
  })), [database, dateRange]);
  useEffect(() => getEntries(), [getEntries]);
  const handlePredefinedDateRangeSelect = (from, to) => {
    setLoading(true);
    setDateRange({from, to});
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(ReportContentContainer, null, /* @__PURE__ */ React.createElement(PredefinedDateRangePicker, {
    onSelect: handlePredefinedDateRangeSelect
  }), entries.length > 0 ? /* @__PURE__ */ React.createElement(CategoryTagFilter, {
    entries,
    onSelect: (newFilteredEntries) => setFilteredEntries(newFilteredEntries)
  }) : null, loading ? /* @__PURE__ */ React.createElement(CircularProgress, null) : /* @__PURE__ */ React.createElement(RenderElements, {
    entries: filteredEntries
  })));
}
