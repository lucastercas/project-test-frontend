import React, { memo, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { logError } from 'helpers/rxjs-operators/logError';
import { useFormikObservable } from 'hooks/useFormikObservable';
import * as yup from 'yup';
import { useObservable } from 'react-use-observable';
import { map, tap } from 'rxjs/operators';

import { IOrderProduct } from 'interfaces/models/IOrderProduct';
import authService from 'services/auth';
import orderService from 'services/OrderService';
import BuyMenuItem from './BuyMenuItem';
import Toast from 'components/Shared/Toast';
import EmptyAndErrorMessages from 'components/Shared/Pagination/EmptyAndErrorMessages';
import IUserToken from 'interfaces/tokens/userToken';
import TableWrapper from 'components/Shared/TableWrapper';

interface IProps {
  opened: boolean;
  onCancel: () => void;
  onComplete: () => void;
}

const BuyMenuFormDialog = memo((props: IProps) => {
  const [result] = useObservable(() => authService.getCart(), [{}]);
  const data = result || ([] as typeof result);

  const [userId] = useObservable(() => authService.getUser().pipe(map((user: IUserToken) => user.id)), [{}]);

  const validationSchema = yup.object().shape({});

  const formik = useFormikObservable<IOrderProduct[]>({
    initialValues: [],
    validationSchema,
    onSubmit(model) {
      return orderService.post(model, userId).pipe(
        tap(() => {
          Toast.show('Compra Feita!');
          props.onComplete();
        }),
        logError(true)
      );
    }
  });

  // To-Do: Add and Remove product quantity
  const handleAddQuantity = useCallback((orderProduct: IOrderProduct) => {
    console.log(orderProduct);
  }, []);

  const handleRemoveQuantity = useCallback((orderProduct: IOrderProduct) => {
    console.log(orderProduct);
  }, []);

  const handleRefresh = () => {};

  const handleEnter = useCallback(() => {
    formik.setValues(data ?? formik.initialValues, false);
  }, [formik, data]);

  const handleExit = useCallback(() => {
    formik.resetForm();
    authService.clearCart();
  }, [formik]);

  return (
    <Dialog open={props.opened} onEnter={handleEnter} onExit={handleExit} disableBackdropClick disableEscapeKeyDown>
      <form onSubmit={formik.handleSubmit}>
        <TableWrapper minWidth={500}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Valor</TableCell>
                <TableCell>Quantidade</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <EmptyAndErrorMessages colSpan={3} hasData={data.length > 0} onTryAgain={handleRefresh} />
              {data.map((orderProduct: IOrderProduct, index: number) => (
                <BuyMenuItem
                  key={index}
                  orderProduct={orderProduct}
                  addQuantity={handleAddQuantity}
                  removeQuantity={handleRemoveQuantity}
                />
              ))}
            </TableBody>
          </Table>
        </TableWrapper>

        <DialogActions>
          <Button onClick={props.onCancel}>Cancelar</Button>
          <Button color='primary' variant='contained' type='submit' disabled={formik.isSubmitting || data.length <= 0}>
            Comprar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
});

export default BuyMenuFormDialog;
