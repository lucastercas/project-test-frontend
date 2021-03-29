import React, { Fragment, memo, useCallback, useState } from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import TableCellSortable from 'components/Shared/Pagination/TableCellSortable';
import usePaginationObservable from 'hooks/usePagination';
import productService from 'services/ProductService';
import EmptyAndErrorMessages from 'components/Shared/Pagination/EmptyAndErrorMessages';
import ListProductItem from './List/ListProductItem';
import { IProduct } from 'interfaces/models/IProduct';
import Toolbar from 'components/Layout/Toolbar';
import CardLoader from 'components/Shared/CardLoader';
import TableWrapper from 'components/Shared/TableWrapper';
import ProductFormDialog from './ProductFormDialog';
import SearchField from 'components/Shared/Pagination/SearchField';
import authService from 'services/auth';
import { IOrderProduct } from 'interfaces/models/IOrderProduct';
import TablePagination from 'components/Shared/Pagination/TablePagination';
import CardContent from '@material-ui/core/CardContent/CardContent';

const ProductListPage = memo(() => {
  const [formOpened, setFormOpened] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<IProduct>();

  const [params, mergeParams, loading, data, error, , refresh] = usePaginationObservable(
    params => productService.list(params),
    { orderBy: 'name', orderDirection: 'asc' },
    []
  );
  const { total, results } = data || ({ total: 0, results: [] } as typeof data);

  const handleCreate = useCallback(() => {
    setCurrentProduct(null);
    setFormOpened(true);
  }, []);

  const handleEdit = useCallback((product: IProduct) => {
    setCurrentProduct(product);
    setFormOpened(true);
  }, []);

  // To-Do
  const handleBuy = useCallback((product: IProduct) => {
    const order: IOrderProduct = {
      productName: product.name,
      productId: product.id,
      value: product.value,
      quantity: 1 // To-Do
    };
    authService.addToCart(order);
  }, []);

  const handleRefresh = useCallback(() => refresh(), [refresh]);

  const formCancel = useCallback(() => setFormOpened(false), []);

  const formCallback = useCallback(
    (product?: IProduct) => {
      setFormOpened(false);
      currentProduct ? refresh() : mergeParams({ term: product.name });
    },
    [currentProduct, mergeParams, refresh]
  );

  return (
    <Fragment>
      <Toolbar title='Produtos' />
      <Card>
        <ProductFormDialog
          opened={formOpened}
          product={currentProduct}
          onCancel={formCancel}
          onComplete={formCallback}
        />
        <CardLoader show={loading} />

        <CardContent>
          <Grid container justify='space-between' alignItems='center' spacing={2}>
            <Grid item xs={12} sm={6} lg={4}>
              <SearchField paginationParams={params} onChange={mergeParams} />
            </Grid>
            <Grid item xs={12} sm={'auto'}>
              <Button fullWidth variant='contained' color='primary' onClick={handleCreate}>
                Adicionar
              </Button>
            </Grid>
          </Grid>
        </CardContent>

        <TableWrapper minWidth={500}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCellSortable paginationParams={params} disabled={loading} column='name' onChange={mergeParams}>
                  Nome
                </TableCellSortable>
                <TableCell>Descricao</TableCell>
                <TableCellSortable paginationParams={params} disabled={loading} column='value' onChange={mergeParams}>
                  Valor
                </TableCellSortable>
                <TableCellSortable
                  paginationParams={params}
                  disabled={loading}
                  column='quantity'
                  onChange={mergeParams}
                >
                  Quantidade
                </TableCellSortable>
              </TableRow>
            </TableHead>

            <TableBody>
              <EmptyAndErrorMessages
                colSpan={3}
                loading={loading}
                hasData={results.length > 0}
                error={error}
                onTryAgain={refresh}
              />
              {results.map((product: IProduct) => (
                <ListProductItem
                  key={product.id}
                  product={product}
                  onEdit={handleEdit}
                  onDeleteComplete={handleRefresh}
                  onBuy={handleBuy}
                />
              ))}
            </TableBody>
          </Table>
        </TableWrapper>

        <TablePagination total={total} disabled={loading} paginationParams={params} onChange={mergeParams} />
      </Card>
    </Fragment>
  );
});

export default ProductListPage;
