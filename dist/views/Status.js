import React from "../../_snowpack/pkg/react.js";
import {Sync as SyncIcon, SyncProblem as SyncErrorIcon, SyncDisabled as SyncOfflineIcon} from "../../_snowpack/pkg/@material-ui/icons.js";
import {useDatabase} from "../contexts/DatabaseContext.js";
import {REPLICATION_DOCUMENT_ID} from "../domain/models/replicationModel.js";
import {createSubscriptionEffect} from "../utils/rxdb.js";
export default function Status() {
  const database = useDatabase();
  const [replicationUrl, setReplicationUrl] = React.useState();
  const [replicationStatus, setReplicationStatus] = React.useState("offline");
  const getReplicationUrl = React.useCallback(() => createSubscriptionEffect(() => database?.getLocal$(REPLICATION_DOCUMENT_ID).subscribe((doc) => {
    setReplicationUrl(doc?.get("url"));
  })), [database]);
  const registerReplicationState = (state) => {
    state.error$.subscribe(() => {
      setReplicationStatus("error");
    });
    state.complete$.subscribe(() => {
      setReplicationStatus("synced");
    });
    state.denied$.subscribe(() => {
      setReplicationStatus("error");
    });
  };
  React.useEffect(() => getReplicationUrl(), [getReplicationUrl]);
  React.useEffect(() => {
    const replicationStates = [];
    if (replicationUrl && database) {
      const entriesReplication = database.collections.entries.sync({remote: replicationUrl});
      registerReplicationState(entriesReplication);
      replicationStates.push(entriesReplication);
      replicationStates.push(database.collections.profiles.sync({remote: replicationUrl}));
    }
    return () => {
      Promise.all(replicationStates.map((s) => s.cancel()));
    };
  }, [database, replicationUrl]);
  if (!replicationUrl) {
    return null;
  }
  switch (replicationStatus) {
    case "offline":
      return /* @__PURE__ */ React.createElement(SyncOfflineIcon, null);
    case "error":
      return /* @__PURE__ */ React.createElement(SyncErrorIcon, null);
    case "synced":
      return /* @__PURE__ */ React.createElement(SyncIcon, null);
    default:
      return /* @__PURE__ */ React.createElement(SyncOfflineIcon, null);
  }
}
