import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, LinearProgress } from '@material-ui/core';
import { useFormikObservable } from 'hooks/useFormikObservable';
import * as yup from 'yup';
import React, { Fragment, memo, useCallback } from 'react';
import productService from 'services/ProductService';
import TextField from 'components/Shared/Fields/Text';
import { tap } from 'rxjs/operators';
import Toast from 'components/Shared/Toast';
import { logError } from 'helpers/rxjs-operators/logError';
import { IProduct } from 'interfaces/models/IProduct';

interface IProps {
  opened: boolean;
  product?: IProduct;
  onComplete: (product: IProduct) => void;
  onCancel: () => void;
}

const ProductFormDialog = memo((props: IProps) => {
  const validationSchema = yup.object().shape({});

  const formik = useFormikObservable<IProduct>({
    initialValues: {},
    validationSchema,
    onSubmit(model) {
      if (props.product) {
        return productService.edit(model).pipe(
          tap(product => {
            Toast.show(`Produto Atualizado`);
            props.onComplete(product);
          }),
          logError(true)
        );
      } else {
        return productService.save(model).pipe(
          tap(product => {
            Toast.show(`Produto Salvo`);
            props.onComplete(product);
          }),
          logError(true)
        );
      }
    }
  });

  const handleEnter = useCallback(() => {
    formik.setValues(props.product ?? formik.initialValues, false);
  }, [formik, props.product]);

  const handleExit = useCallback(() => {
    formik.resetForm();
  }, [formik]);

  return (
    <Dialog open={props.opened} onEnter={handleEnter} onExit={handleExit}>
      {formik.isSubmitting && <LinearProgress color='primary' />}
      <form onSubmit={formik.handleSubmit}>
        {formik.values.id ? (
          <DialogTitle>Editar Produto {props.product.name} </DialogTitle>
        ) : (
          <DialogTitle>Novo Produto</DialogTitle>
        )}

        <DialogContent>
          <Fragment>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField label='Nome' name='name' formik={formik} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label='Descricao' name='description' formik={formik} />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField label='Valor' name='value' formik={formik} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label='Quantidade' name='quantity' formik={formik} />
              </Grid>
            </Grid>
          </Fragment>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onCancel}>Cancelar</Button>
          <Button color='primary' variant='contained' type='submit' disabled={formik.isSubmitting}>
            Salvar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
});

export default ProductFormDialog;
