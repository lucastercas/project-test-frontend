import React, { Fragment, memo } from 'react';
import Card from '@material-ui/core/Card';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';

import Toolbar from 'components/Layout/Toolbar';
import TableWrapper from 'components/Shared/TableWrapper';
import orderService from 'services/OrderService';
import usePaginationObservable from 'hooks/usePagination';
import EmptyAndErrorMessages from 'components/Shared/Pagination/EmptyAndErrorMessages';
import { IOrder } from 'interfaces/models/IOrder';
import OrderListItem from './List/OrderListItem';
import TablePagination from 'components/Shared/Pagination/TablePagination';

const OrdersListPage = memo(() => {
  const [params, mergeParams, loading, data, , , refresh] = usePaginationObservable(
    params => orderService.list(params),
    { orderDirection: 'asc' },
    []
  );
  const { total, results } = data || ({ total: 0, results: [] } as typeof data);

  return (
    <Fragment>
      <Toolbar title='Pedidos' />
      <Card>
        <TableWrapper minWidth={500}>
          <Table arial-label='collapsible table'>
            <TableBody>
              <EmptyAndErrorMessages colSpan={3} hasData={results.length > 0} onTryAgain={refresh} />
              {results.map((order: IOrder, index) => (
                <OrderListItem key={index} order={order} />
              ))}
            </TableBody>
          </Table>
        </TableWrapper>
        <TablePagination total={total} disabled={loading} paginationParams={params} onChange={mergeParams} />
      </Card>
    </Fragment>
  );
});

export default OrdersListPage;
