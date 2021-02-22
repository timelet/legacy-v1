import styled from "../../_snowpack/pkg/@emotion/styled.js";
import {FormControl, InputLabel, MenuItem, Select, withTheme} from "../../_snowpack/pkg/@material-ui/core.js";
import React from "../../_snowpack/pkg/react.js";
import {FormattedMessage} from "../../_snowpack/pkg/react-intl.js";
const CategoryTagFilterContainer = withTheme(styled.div`
    display: flex;

    & > *:not(:last-child) {
      margin-right: ${({theme}) => theme.spacing(2)}px;
    }
  `);
export default function CategoryTagFilter({entries, onSelect}) {
  const [filter, setFilter] = React.useState({categories: [], tags: []});
  const handleOnSelect = (currentFilter) => {
    let filteredEntries = entries;
    if (currentFilter.categories.length > 0) {
      filteredEntries = filteredEntries.filter((e) => currentFilter.categories.indexOf(e.category) !== -1);
    }
    if (currentFilter.tags.length > 0) {
      filteredEntries = filteredEntries.filter((e) => e.tag ? currentFilter.tags.indexOf(e.tag) !== -1 : false);
    }
    onSelect(filteredEntries);
  };
  const handleChange = (event) => {
    const {name} = event.target;
    const values = event.target.value;
    const newFilter = {...filter, [name]: values};
    setFilter(newFilter);
    handleOnSelect(newFilter);
  };
  return /* @__PURE__ */ React.createElement(CategoryTagFilterContainer, null, /* @__PURE__ */ React.createElement(FormControl, {
    fullWidth: true
  }, /* @__PURE__ */ React.createElement(InputLabel, null, /* @__PURE__ */ React.createElement(FormattedMessage, {
    id: "label.filterByCategories",
    defaultMessage: "Filter by categories"
  })), /* @__PURE__ */ React.createElement(Select, {
    multiple: true,
    value: filter.categories,
    name: "categories",
    onChange: handleChange
  }, [...new Set(entries.map((e) => e.category))].map((category) => /* @__PURE__ */ React.createElement(MenuItem, {
    value: category,
    key: category
  }, category)))), /* @__PURE__ */ React.createElement(FormControl, {
    fullWidth: true
  }, /* @__PURE__ */ React.createElement(InputLabel, null, /* @__PURE__ */ React.createElement(FormattedMessage, {
    id: "label.filterByTags",
    defaultMessage: "Filter by tags"
  })), /* @__PURE__ */ React.createElement(Select, {
    multiple: true,
    value: filter.tags,
    name: "tags",
    onChange: handleChange
  }, [...new Set(entries.map((e) => e.tag))].map((tag) => /* @__PURE__ */ React.createElement(MenuItem, {
    value: tag,
    key: tag
  }, tag)))));
}
