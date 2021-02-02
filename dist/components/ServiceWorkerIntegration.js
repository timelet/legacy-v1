import * as __SNOWPACK_ENV__ from '../../_snowpack/env.js';

import {Button, Snackbar} from "../../_snowpack/pkg/@material-ui/core.js";
import React from "../../_snowpack/pkg/react.js";
import {FormattedMessage, useIntl} from "../../_snowpack/pkg/react-intl.js";
import {Workbox, messageSW} from "../../_snowpack/pkg/workbox-window.js";
export default function ServiceWorkerIntegration() {
  const intl = useIntl();
  const workbox = new Workbox(__SNOWPACK_ENV__.SNOWPACK_PUBLIC_SERVICE_WORKER);
  const [updateNotificationOpen, setUpdateNotificationOpen] = React.useState(false);
  const [registration, setRegistration] = React.useState();
  const showSkipWaitingPrompt = () => {
    setUpdateNotificationOpen(true);
  };
  const updateApplication = (currentRegistration) => () => {
    if (currentRegistration && currentRegistration.waiting) {
      messageSW(currentRegistration.waiting, {type: "SKIP_WAITING"});
      setUpdateNotificationOpen(false);
      window.location.reload();
    }
  };
  React.useEffect(() => {
    if ("serviceWorker" in navigator) {
      workbox.addEventListener("waiting", showSkipWaitingPrompt);
      workbox.register().then((r) => {
        setRegistration(r);
      });
    }
  }, []);
  const reloadButton = /* @__PURE__ */ React.createElement(Button, {
    onClick: updateApplication(registration),
    color: "primary"
  }, /* @__PURE__ */ React.createElement(FormattedMessage, {
    id: "action.reload",
    defaultMessage: "Reload",
    description: "Action to reload something"
  }));
  return /* @__PURE__ */ React.createElement(Snackbar, {
    anchorOrigin: {horizontal: "center", vertical: "top"},
    message: intl.formatMessage({
      id: "action.updateApplication",
      defaultMessage: "Reload to update this application",
      description: "Requests the user to update the application"
    }),
    action: reloadButton,
    open: updateNotificationOpen
  });
}
