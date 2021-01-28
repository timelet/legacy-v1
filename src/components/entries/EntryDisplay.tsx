import { IconButton } from '@material-ui/core';
import { CellParams, ColDef, DataGrid } from '@material-ui/data-grid';
import { PauseCircleFilled } from '@material-ui/icons';
import React from 'react';
import { useIntl } from 'react-intl';
import { EntryDisplayViewModel } from '../../models/entryDisplayViewModel';
import Duration from '../Duration';

type EntryDisplayProps = {
  entries: EntryDisplayViewModel[];
  stop?: (entryId: string) => void;
  loading?: boolean;
};

export default function EntryDisplay({ entries, loading, stop }: EntryDisplayProps) {
  const intl = useIntl();

  const renderStopButton = (params: CellParams) => {
    if (!params.getValue('endedAt')) {
      return (
        <IconButton
          onClick={() => {
            const entryId = params.getValue('entryId')?.toString();
            if (entryId && stop) {
              stop(entryId);
            }
          }}
        >
          <PauseCircleFilled />
        </IconButton>
      );
    }
    return null;
  };

  const columns: ColDef[] = [
    {
      field: 'entryId',
      headerName: intl.formatMessage({ id: 'label.id', defaultMessage: 'Id' }),
      width: 150,
      hide: true
    },
    {
      field: 'description',
      headerName: intl.formatMessage({ id: 'label.description', defaultMessage: 'Description' }),
      flex: 0.5
    },
    {
      field: 'startedAt',
      headerName: intl.formatMessage({ id: 'label.startedAt', defaultMessage: 'Started at' }),
      width: 180
    },
    {
      field: 'endedAt',
      headerName: intl.formatMessage({ id: 'label.endedAt', defaultMessage: 'Ended at' }),
      width: 180,
      renderCell: (params) => (
        <span>
          {params.value
            ? params.value
            : intl.formatMessage({ id: 'label.undefined', defaultMessage: 'Undefined', description: 'An undefined value' })}
        </span>
      )
    },
    {
      field: 'duration',
      headerName: intl.formatMessage({ id: 'label.duration', defaultMessage: 'Duration' }),
      width: 130,
      renderCell: (params) => <Duration from={params.getValue('startedAt')?.toString() || ''} to={params.getValue('endedAt')?.toString()} />
    },
    {
      field: 'actions',
      headerName: intl.formatMessage({ id: 'label.actions', defaultMessage: 'Actions' }),
      width: 120,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => <>{renderStopButton(params)}</>
    }
  ];

  return <DataGrid columns={columns} rows={entries} loading={loading} />;
}
