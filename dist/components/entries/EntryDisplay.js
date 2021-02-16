import styled from "../../../_snowpack/pkg/@emotion/styled.js";
import {IconButton} from "../../../_snowpack/pkg/@material-ui/core.js";
import {DataGrid} from "../../../_snowpack/pkg/@material-ui/data-grid.js";
import {Stop as StopIcon, Delete as DeleteIcon, PlayArrow as PlayIcon, Timer as RecordIcon} from "../../../_snowpack/pkg/@material-ui/icons.js";
import React from "../../../_snowpack/pkg/react.js";
import {useIntl} from "../../../_snowpack/pkg/react-intl.js";
import ConfirmDialog from "../ConfirmDialog.js";
import InteractiveDuration from "../InteractiveDuration.js";
import EntryForm from "./EntryForm.js";
const StyledRecordIcon = styled(RecordIcon)`
  margin-right: 0.2rem;
`;
const defaultSortModel = [
  {
    field: "startedAt",
    sort: "desc"
  }
];
export default function EntryDisplay({entries, categories, tags, loading, update, remove, stop, copy}) {
  const intl = useIntl();
  const renderStopButton = (params) => /* @__PURE__ */ React.createElement(IconButton, {
    onClick: () => {
      const entryId = params.getValue("entryId")?.toString();
      if (entryId) {
        if (params.getValue("endedAt")) {
          copy(entryId);
        } else {
          stop(entryId);
        }
      }
    }
  }, params.getValue("endedAt") ? /* @__PURE__ */ React.createElement(PlayIcon, null) : /* @__PURE__ */ React.createElement(StopIcon, null));
  const renderEditButton = (params) => {
    const currentEntry = entries.find((e) => e.entryId === params.getValue("entryId"));
    return currentEntry ? /* @__PURE__ */ React.createElement(EntryForm, {
      entry: currentEntry,
      categories,
      tags,
      update
    }) : null;
  };
  const renderRemoveButton = (params) => {
    const currentEntryId = params.getValue("entryId")?.toString();
    return currentEntryId ? /* @__PURE__ */ React.createElement(ConfirmDialog, {
      title: intl.formatMessage({id: "label.confirmation", defaultMessage: "Confirmation"}),
      description: intl.formatMessage({id: "dialog.confirmRemove", defaultMessage: "Confirm the removal of the selected entry."}),
      onConfirm: () => remove(currentEntryId)
    }, /* @__PURE__ */ React.createElement(IconButton, null, /* @__PURE__ */ React.createElement(DeleteIcon, null))) : null;
  };
  const renderDateTime = (params) => /* @__PURE__ */ React.createElement("span", null, params.value ? `${intl.formatDate(params.value)} ${intl.formatTime(params.value)}` : intl.formatMessage({id: "label.undefined", defaultMessage: "Undefined", description: "An undefined value"}));
  const columns = [
    {
      field: "entryId",
      headerName: intl.formatMessage({id: "label.id", defaultMessage: "Id"}),
      width: 150,
      hide: true
    },
    {
      field: "category",
      headerName: intl.formatMessage({id: "label.category", defaultMessage: "Category"}),
      flex: 0.2
    },
    {
      field: "tag",
      headerName: intl.formatMessage({id: "label.tag", defaultMessage: "Tag"}),
      flex: 0.2
    },
    {
      field: "description",
      headerName: intl.formatMessage({id: "label.description", defaultMessage: "Description"}),
      flex: 0.5
    },
    {
      field: "startedAt",
      headerName: intl.formatMessage({id: "label.startedAt", defaultMessage: "Started at"}),
      width: 180,
      renderCell: renderDateTime
    },
    {
      field: "endedAt",
      headerName: intl.formatMessage({id: "label.endedAt", defaultMessage: "Ended at"}),
      width: 180,
      renderCell: renderDateTime,
      hide: true
    },
    {
      field: "duration",
      headerName: intl.formatMessage({id: "label.duration", defaultMessage: "Duration"}),
      width: 130,
      renderCell: (params) => /* @__PURE__ */ React.createElement(React.Fragment, null, params.getValue("endedAt")?.toString() ? null : /* @__PURE__ */ React.createElement(StyledRecordIcon, {
        color: "primary",
        fontSize: "small"
      }), /* @__PURE__ */ React.createElement(InteractiveDuration, {
        from: params.getValue("startedAt")?.toString() || "",
        to: params.getValue("endedAt")?.toString()
      }))
    },
    {
      field: "actions",
      headerName: intl.formatMessage({id: "label.actions", defaultMessage: "Actions"}),
      width: 180,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => /* @__PURE__ */ React.createElement(React.Fragment, null, renderStopButton(params), renderEditButton(params), renderRemoveButton(params))
    }
  ];
  return /* @__PURE__ */ React.createElement(DataGrid, {
    columns,
    rows: entries,
    loading,
    sortModel: defaultSortModel,
    density: "compact"
  });
}
