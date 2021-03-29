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
  TableRow,
} from '@material-ui/core';
import Toolbar from 'components/Layout/Toolbar';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import IconButton from '@material-ui/core/IconButton';
import TableWrapper from 'components/Shared/TableWrapper';
import orderService from 'services/OrderService';
import usePaginationObservable from 'hooks/usePagination';
import EmptyAndErrorMessages from 'components/Shared/Pagination/EmptyAndErrorMessages';
import { IOrder } from 'interfaces/models/IOrder';
import productService from 'services/ProductService';
import { IOrderProduct } from 'interfaces/models/IOrderProduct';
import { useObservable } from 'react-use-observable';

interface IProductsProps {
  product: IOrderProduct;
}

const ProductItem = memo((props: IProductsProps) => {
  const [data] = useObservable(() => productService.findById(props.product.id), []);
  const result = data || ({} as typeof data);

  console.log('Result: ', result);

  return (
    <TableRow>
      <TableCell component='th' scope='row'>
        {result.name}
      </TableCell>
      <TableCell align='left'>R$ {result.value}</TableCell>
      <TableCell align='left'>{props.product.quantity}</TableCell>
    </TableRow>
  );
});

interface IProps {
  order: IOrder;
}

const ListItem = memo((props: IProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <TableRow>
        <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
        <TableCell component='th' scope='row' align='center'>
          <b>Numero do Pedido:</b> {props.order.id}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box margin={1}>
              <Table size='small' aria-label='products'>
                <TableHead>
                  <TableRow>
                    <TableCell>Produto</TableCell>
                    <TableCell>Valor</TableCell>
                    <TableCell>Quantidade</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.order.products.map(product => (
                    <ProductItem product={product} />
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
});

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
                  <ListItem key={index} order={order} />
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
