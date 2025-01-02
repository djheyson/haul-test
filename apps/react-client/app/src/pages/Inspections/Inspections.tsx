import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import {
  Filters,
  ResponseGetInspections,
} from '@haul/nest-api/app/inspection/inspection.service';
import {
  GridContainer,
  StyledDataGrid,
  LoadingContainer,
} from './Inspections.styles';
import { getInspections } from '../../api';
import { Toolbar, UploadInspectionsForm, columns } from './components';

export function Inspections() {
  const [data, setData] = useState<ResponseGetInspections>(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [filters, setFilters] = useState<Filters>({
    sort: [{ field: 'inspectionDate', sort: 'desc' }],
  });

  const onChangeFilters = (filters: Filters) => {
    setFilters((prev) => ({ ...prev, ...filters }));
  };

  const fetchInspections = () => {
    setLoading(true);
    getInspections({ page, pageSize, filters })
      .then(setData)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchInspections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, filters]);

  if (loading && !data) {
    return (
      <LoadingContainer>
        <CircularProgress />
      </LoadingContainer>
    );
  }

  if (!loading && !data) {
    return <UploadInspectionsForm refetch={fetchInspections} />;
  }

  return (
    <GridContainer>
      <Toolbar
        filters={filters}
        allBasics={data?.allBasics}
        allStatus={data?.allStatus}
        allAssignedTo={data?.allAssignedTo}
        onChangeFilters={onChangeFilters}
        refetch={fetchInspections}
      />

      <StyledDataGrid
        rows={data?.items || []}
        columns={columns}
        checkboxSelection
        disableRowSelectionOnClick
        pageSizeOptions={[25, 50, 100]}
        paginationModel={{ page, pageSize }}
        paginationMode="server"
        rowCount={data?.total || 0}
        onPaginationModelChange={(paginationModel) => {
          setPage(paginationModel.page);
          setPageSize(paginationModel.pageSize);
        }}
        sortingMode="server"
        sortModel={filters.sort}
        onSortModelChange={(sortModel) => {
          onChangeFilters({
            sort: sortModel.map(({ field, sort }) => ({
              field,
              sort: sort === 'desc' ? 'desc' : 'asc',
            })),
          });
        }}
        loading={loading}
      />
    </GridContainer>
  );
}
