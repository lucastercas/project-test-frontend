import React, { memo } from 'react';
import { useObservable } from 'react-use-observable';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { IOrderProduct } from 'interfaces/models/IOrderProduct';
import productService from 'services/ProductService';

interface IProps {
  product: IOrderProduct;
}

const OrderProductItem = memo((props: IProps) => {
  const [data] = useObservable(() => productService.findById(props.product.productId), []);
  const result = data || ({} as typeof data);

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
