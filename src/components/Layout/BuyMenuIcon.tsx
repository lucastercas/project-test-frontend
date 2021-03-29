import React, { Fragment, memo, useCallback, useState } from 'react';
import { ShoppingBasket } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';

import BuyMenuFormDialog from './BuyMenu/BuyMenuFormDialog';

const BuyMenuIcon = memo(() => {
  const [opened, setOpened] = useState(false);

  const handleOpen = useCallback(() => {
    setOpened(true);
  }, []);

  const handleCancel = useCallback(() => {
    setOpened(false);
  }, []);

  const handleComplete = useCallback(() => {
    setOpened(false);
  }, []);

  return (
    <Fragment>
      <BuyMenuFormDialog opened={opened} onCancel={handleCancel} onComplete={handleComplete} />
      <IconButton color='primary' onClick={handleOpen}>
        <ShoppingBasket />
      </IconButton>
    </Fragment>
  );
});

export default BuyMenuIcon;
