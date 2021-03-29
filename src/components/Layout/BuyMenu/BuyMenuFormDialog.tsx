import { Button, Dialog, DialogActions, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import TableWrapper from 'components/Shared/TableWrapper';
import { useFormikObservable } from 'hooks/useFormikObservable';
import { IOrderProduct } from 'interfaces/models/IOrderProduct';
import * as yup from 'yup';
import React, { memo, useCallback } from 'react';
import { useObservable } from 'react-use-observable';
import authService from 'services/auth';
import orderService from 'services/OrderService';
import BuyMenuItem from './BuyMenuItem';
import Toast from 'components/Shared/Toast';
import { map, tap } from 'rxjs/operators';
import { logError } from 'helpers/rxjs-operators/logError';
import EmptyAndErrorMessages from 'components/Shared/Pagination/EmptyAndErrorMessages';
import IUserToken from 'interfaces/tokens/userToken';

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
              {data.map((order: IOrderProduct, index: number) => (
                <BuyMenuItem key={index} order={order} />
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
