import { TableRow, TableCell, List, ListItem, makeStyles } from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';
import { IOrderProduct } from 'interfaces/models/IOrderProduct';
import React, { memo } from 'react';

const useStyles = makeStyles(theme => ({
  list: {
    display: 'flex',
    flexDirection: 'row',
    padding: 0
  }
}));

interface IProps {
  order: IOrderProduct;
}

const BuyMenuItem = memo((props: IProps) => {
  const classes = useStyles(props);

  const handleRemoveProduct = () => {};

  const handleAddProduct = () => {};

  return (
    <TableRow>
      <TableCell>{props.order.productName}</TableCell>
      <TableCell>R$ {props.order.value}</TableCell>
      <TableCell align='left'>
        <List className={classes.list}>
          <ListItem button={true} action={handleRemoveProduct}>
            <Remove />
          </ListItem>
          <ListItem>{props.order.quantity}</ListItem>
          <ListItem button={true} action={handleAddProduct}>
            <Add />
          </ListItem>
        </List>
      </TableCell>
      <TableCell>R$ {props.order.value * props.order.quantity}</TableCell>
    </TableRow>
  );
});

export default BuyMenuItem;
