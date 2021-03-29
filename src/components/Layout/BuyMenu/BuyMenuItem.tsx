import React, { memo } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import { Add, Remove } from '@material-ui/icons';

import { IOrderProduct } from 'interfaces/models/IOrderProduct';

const useStyles = makeStyles(() => ({
  list: {
    display: 'flex',
    flexDirection: 'row',
    padding: 0
  }
}));

interface IProps {
  orderProduct: IOrderProduct;
  addQuantity: (product: IOrderProduct) => void;
  removeQuantity: (product: IOrderProduct) => void;
}

// To-Do: Implementar adicionar e remover quantidade de produto
const BuyMenuItem = memo((props: IProps) => {
  const classes = useStyles(props);

  const handleAddQuantity = () => {
    props.removeQuantity(props.orderProduct);
  };
  const handleRemoveQuantity = () => {
    props.addQuantity(props.orderProduct);
  };

  return (
    <TableRow>
      <TableCell>{props.orderProduct.productName}</TableCell>
      <TableCell>R$ {props.orderProduct.value}</TableCell>
      <TableCell align='left'>
        <List className={classes.list}>
          <ListItem button={true} action={handleAddQuantity}>
            <Remove />
          </ListItem>
          <ListItem>{props.orderProduct.quantity}</ListItem>
          <ListItem button={true} action={handleRemoveQuantity}>
            <Add />
          </ListItem>
        </List>
      </TableCell>
      <TableCell>R$ {props.orderProduct.value * props.orderProduct.quantity}</TableCell>
    </TableRow>
  );
});

export default BuyMenuItem;
