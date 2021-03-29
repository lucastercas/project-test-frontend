import React, { memo } from 'react';
import { useObservable } from 'react-use-observable';
import { TableCell, TableRow } from '@material-ui/core';

import { IOrderProduct } from 'interfaces/models/IOrderProduct';
import productService from 'services/ProductService';

interface IProps {
  product: IOrderProduct;
}

const OrderProductItem = memo((props: IProps) => {
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

export default OrderProductItem;
