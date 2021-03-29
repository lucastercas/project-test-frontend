import React, { memo, useCallback, useMemo, useState } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from 'mdi-react/DeleteIcon';
import EditIcon from 'mdi-react/EditIcon';
import WalletIcon from 'mdi-react/WalletIcon';
import { from } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { useCallbackObservable } from 'react-use-observable';

import Alert from 'components/Shared/Alert';
import Toast from 'components/Shared/Toast';
import TableCellActions from 'components/Shared/Pagination/TableCellActions';
import { IOption } from 'components/Shared/DropdownMenu';
import productService from 'services/ProductService';
import { IProduct } from 'interfaces/models/IProduct';

interface IProps {
  product: IProduct;
  onEdit: (product: IProduct) => void;
  onBuy: (product: IProduct) => void;
  onDeleteComplete: () => void;
}

const ListProduct = memo((props: IProps) => {
  const { product, onEdit, onDeleteComplete, onBuy } = props;

  const [deleted, setDeleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleDismissError = useCallback(() => setError(null), []);

  const [handleDelete] = useCallbackObservable(() => {
    return from(Alert.confirm(`Excluir produto ${product.name}?`)).pipe(
      filter(ok => ok),
      tap(() => setLoading(true)),
      switchMap(() => productService.delete(product.id)),
      tap(
        () => {
          Toast.show(`${product.name} foi removido`);
          setLoading(true);
          setDeleted(true);
          onDeleteComplete();
        },
        error => {
          setLoading(true);
          setError(error);
        }
      )
    );
  }, []);

  const handleEdit = useCallback(() => {
    onEdit(product);
  }, [onEdit, product]);

  const handleBuy = useCallback(() => {
    onBuy(product);
  }, [onBuy, product]);

  const options = useMemo<IOption[]>(() => {
    return [
      { text: 'Editar', icon: EditIcon, handler: handleEdit },
      { text: 'Excluir', icon: DeleteIcon, handler: handleDelete },
      { text: 'Comprar', icon: WalletIcon, handler: handleBuy }
    ];
  }, [handleDelete, handleEdit, handleBuy]);

  if (deleted) return null;

  return (
    <TableRow>
      <TableCell>{product.name}</TableCell>
      <TableCell>{product.description}</TableCell>
      <TableCell>{product.value}</TableCell>
      <TableCell>{product.quantity}</TableCell>
      <TableCellActions options={options} loading={loading} error={error} onDismissError={handleDismissError} />
    </TableRow>
  );
});

export default ListProduct;
