import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@material-ui/core';
import { useFormikObservable } from 'hooks/useFormikObservable';
import * as yup from 'yup';
import React, { Fragment, memo } from 'react';
import { IProduct } from './List/ListProduct';
import productService from 'services/product';
import TextField from 'components/Shared/Fields/Text';

interface IProps {
  opened: boolean;
  product?: IProduct;
  onCancel: () => void;
}

const FormDialog = memo((props: IProps) => {
  const validationSchema = yup.object().shape({});

  const formik = useFormikObservable<IProduct>({
    initialValues: {},
    validationSchema,
    onSubmit(model) {
      return productService.save(model).pipe();
    }
  });

  return (
    <Dialog open={props.opened} disableBackdropClick disableEscapeKeyDown>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>Produto </DialogTitle>
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

export default FormDialog;
