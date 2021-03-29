import React, { Fragment, memo, useState } from 'react';
import {
  Box,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import IconButton from '@material-ui/core/IconButton';

import { IOrder } from 'interfaces/models/IOrder';
import OrderProductItem from './OrderProductItem';

interface IProps {
  order: IOrder;
}

const OrderListItem = memo((props: IProps) => {
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
                    <OrderProductItem product={product} />
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

export default OrderListItem;
