import { Button, Dialog, DialogActions, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import TableWrapper from 'components/Shared/TableWrapper';
import { useFormikObservable } from 'hooks/useFormikObservable';
import usePaginationObservable from 'hooks/usePagination';
import { IOrder } from 'interfaces/models/IOrder';
import * as yup from 'yup';
import React, { memo, useCallback } from 'react';
import { useObservable } from 'react-use-observable';
import authService from 'services/auth';
import orderService from 'services/OrderService';
import BuyMenuItem from './BuyMenuItem';
import Toast from 'components/Shared/Toast';
import { tap } from 'rxjs/operators';
import { logError } from 'helpers/rxjs-operators/logError';

interface IProps {
  opened: boolean;
  onCancel: () => void;
  onComplete: () => void;
}

const BuyMenuFormDialog = memo((props: IProps) => {
  const [result] = useObservable(() => authService.getCart(), [{}]);
  const data = result || ([] as typeof result);

  const validationSchema = yup.object().shape({});
  const formik = useFormikObservable<IOrder[]>({
    initialValues: [],
    validationSchema,
    onSubmit(model) {
      console.log('Submitting: ', model);
      return orderService.post(model).pipe(
        tap(() => {
          Toast.show('Compra Feita!');
          props.onComplete();
        }),
        logError(true)
      );
    }
  });

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
              {data.map((order: IOrder, index: number) => (
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
