import {IconButton} from "../../../_snowpack/pkg/@material-ui/core.js";
import {DataGrid} from "../../../_snowpack/pkg/@material-ui/data-grid.js";
import {Stop as StopIcon} from "../../../_snowpack/pkg/@material-ui/icons.js";
import React from "../../../_snowpack/pkg/react.js";
import {useIntl} from "../../../_snowpack/pkg/react-intl.js";
import Duration from "../Duration.js";
import EntryForm from "./EntryForm.js";
export default function EntryDisplay({entries, loading, update, stop}) {
  const intl = useIntl();
  const renderStopButton = (params) => /* @__PURE__ */ React.createElement(IconButton, {
    disabled: !!params.getValue("endedAt"),
    onClick: () => {
      const entryId = params.getValue("entryId")?.toString();
      if (entryId && stop) {
        stop(entryId);
      }
    }
  }, /* @__PURE__ */ React.createElement(StopIcon, null));
  const renderEditButton = (params) => {
    const currentEntry = entries.find((e) => e.entryId === params.getValue("entryId"));
    if (currentEntry) {
      return /* @__PURE__ */ React.createElement(EntryForm, {
        entry: currentEntry,
        update
      });
    }
    return null;
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
      renderCell: renderDateTime
    },
    {
      field: "duration",
      headerName: intl.formatMessage({id: "label.duration", defaultMessage: "Duration"}),
      width: 130,
      renderCell: (params) => /* @__PURE__ */ React.createElement(Duration, {
        from: params.getValue("startedAt")?.toString() || "",
        to: params.getValue("endedAt")?.toString()
      })
    },
    {
      field: "actions",
      headerName: intl.formatMessage({id: "label.actions", defaultMessage: "Actions"}),
      width: 150,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => /* @__PURE__ */ React.createElement(React.Fragment, null, renderStopButton(params), renderEditButton(params))
    }
  ];
  return /* @__PURE__ */ React.createElement(DataGrid, {
    columns,
    rows: entries,
    loading
  });
}
