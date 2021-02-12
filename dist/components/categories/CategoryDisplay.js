import {IconButton} from "../../../_snowpack/pkg/@material-ui/core.js";
import {DataGrid} from "../../../_snowpack/pkg/@material-ui/data-grid.js";
import React from "../../../_snowpack/pkg/react.js";
import {Delete as DeleteIcon} from "../../../_snowpack/pkg/@material-ui/icons.js";
import {useIntl} from "../../../_snowpack/pkg/react-intl.js";
import CategoryForm from "./CategoryForm.js";
import ConfirmDialog from "../ConfirmDialog.js";
export default function CategoryDisplay({categories, update, remove, loading}) {
  const intl = useIntl();
  const renderEditButton = (params) => {
    const currentCategory = categories.find((c) => c.name === params.getValue("name"));
    return currentCategory ? /* @__PURE__ */ React.createElement(CategoryForm, {
      category: currentCategory,
      update
    }) : null;
  };
  const renderRemoveButton = (params) => {
    const currentCategory = categories.find((c) => c.name === params.getValue("name"));
    return currentCategory ? /* @__PURE__ */ React.createElement(ConfirmDialog, {
      title: intl.formatMessage({id: "label.confirmation", defaultMessage: "Confirmation"}),
      description: intl.formatMessage({id: "dialog.confirmRemove", defaultMessage: "Confirm the removal of the selected entry."}),
      onConfirm: () => remove(currentCategory)
    }, /* @__PURE__ */ React.createElement(IconButton, null, /* @__PURE__ */ React.createElement(DeleteIcon, null))) : null;
  };
  const columns = [
    {
      field: "name",
      headerName: intl.formatMessage({id: "label.name", defaultMessage: "Name"}),
      flex: 0.25
    },
    {
      field: "description",
      headerName: intl.formatMessage({id: "label.description", defaultMessage: "Description"}),
      flex: 0.75
    },
    {
      field: "actions",
      headerName: intl.formatMessage({id: "label.actions", defaultMessage: "Actions"}),
      width: 150,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => /* @__PURE__ */ React.createElement(React.Fragment, null, renderEditButton(params), renderRemoveButton(params))
    }
  ];
  const rows = categories.map((c, id) => ({...c, id}));
  return /* @__PURE__ */ React.createElement(DataGrid, {
    columns,
    rows,
    loading
  });
}
