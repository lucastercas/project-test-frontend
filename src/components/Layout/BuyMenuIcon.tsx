import React, { Fragment, memo, useCallback, useState } from 'react';
import { ShoppingBasket } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import BuyMenuFormDialog from './BuyMenu/BuyMenuFormDialog';

const BuyMenuIcon = memo((props: {}) => {
  const [opened, setOpened] = useState(false);

  const handleOpen = useCallback(() => {
    console.log('Opening');
    setOpened(true);
  }, []);

  const handleCancel = useCallback(() => {
    console.log('Closing');
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
