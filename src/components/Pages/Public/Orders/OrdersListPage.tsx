import React, { Fragment, memo, useState } from 'react';
import {
  Box,
  Card,
  Collapse,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core';
import Toolbar from 'components/Layout/Toolbar';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import TableWrapper from 'components/Shared/TableWrapper';
import orderService from 'services/OrderService';
import usePaginationObservable from 'hooks/usePagination';
import EmptyAndErrorMessages from 'components/Shared/Pagination/EmptyAndErrorMessages';
import { IOrder } from 'interfaces/models/IOrder';
import OrderListItem from './OrderListItem';

const OrdersListPage = memo(() => {
  const [, , , data, , , refresh] = usePaginationObservable(() => orderService.list(), {}, []);
  const { results } = data || ({ total: 0, results: [] } as typeof data);

  return (
    <Fragment>
      <Toolbar title='Pedidos' />
      <Card>
        <TableContainer component={Paper}>
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
        </TableContainer>
      </Card>
    </Fragment>
  );
});

export default OrdersListPage;
