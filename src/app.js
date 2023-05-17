import React, { useCallback, useState } from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from './components/modal';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [modal, setModal] = useState(false);
  const { list, cart } = store.getState();

  const callbacks = {
    onAddToCart: useCallback((code) => {
      store.addToCart(code);
    }, [store]),

    onRemoveFromCart: useCallback((code) => {
      store.removeFromCart(code);
    }, [store])
  }

  return (
    <PageLayout>
      <Head title='Магазин' />
      <Controls
        cart={cart}
        modal={modal}
        setModal={setModal}
      />
      <List
        list={list}
        onAddToCart={callbacks.onAddToCart}
      />
      {
        modal &&
        <Modal
          cart={cart}
          setModal={setModal}
          onRemoveFromCart={callbacks.onRemoveFromCart}
        />
      }
    </PageLayout>
  );
}

export default App;
