import React, { Fragment, memo, useCallback, useState } from 'react';
import Card from '@material-ui/core/Card';
import { Table, TableBody, TableCell, TableHead, TablePagination, TableRow } from '@material-ui/core';

import TableCellSortable from 'components/Shared/Pagination/TableCellSortable';
import usePaginationObservable from 'hooks/usePagination';
import productService from 'services/product';
import EmptyAndErrorMessages from 'components/Shared/Pagination/EmptyAndErrorMessages';
import ListProduct, { IProduct } from './List/ListProduct';
import Toolbar from 'components/Layout/Toolbar';
import CardLoader from 'components/Shared/CardLoader';
import TableWrapper from 'components/Shared/TableWrapper';
import FormDialog from './FormDialog';

const ProductListPage = memo(() => {
  const [formOpened, setFormOpened] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<IProduct>();

  const [params, mergeParams, loading, data, error, , refresh] = usePaginationObservable(
    params => productService.list(params),
    { orderBy: 'name', orderDirection: 'asc' },
    []
  );

  // const handleCreate = useCallback(() => {}, []);

  const handleEdit = useCallback((product: IProduct) => {
    setCurrentProduct(product);
    setFormOpened(true);
  }, []);

  const handleBuy = useCallback((product: IProduct) => {}, []);

  const handleRefresh = useCallback(() => refresh(), [refresh]);

  const { total, results } = data || ({ total: 0, results: [] } as typeof data);

  const formCancel = useCallback(() => setFormOpened(false), []);
  const formCallback = () => {};

  return (
    <Fragment>
      <Toolbar title='Produtos' />
      <Card>
        <FormDialog opened={formOpened} product={currentProduct} onCancel={formCancel} />
        <CardLoader show={loading} />

        <TableWrapper minWidth={500}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCellSortable paginationParams={params} disabled={loading} column='name' onChange={() => {}}>
                  Nome
                </TableCellSortable>
                <TableCell>Descricao</TableCell>
                <TableCellSortable paginationParams={params} disabled={loading} column='value' onChange={() => {}}>
                  Valor
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
                <ListProduct product={product} onEdit={handleEdit} onDeleteComplete={handleRefresh} onBuy={handleBuy} />
              ))}
            </TableBody>
          </Table>
        </TableWrapper>

        {/* <TablePagination total={total} disabled={loading} paginationParams={params} onChange={mergeParams} /> */}
      </Card>
    </Fragment>
  );
});

export default ProductListPage;
