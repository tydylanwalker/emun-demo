import { Provider } from 'react-redux';
import { store } from '../store/store';
import { AppWrapper } from '../components/AppWrapper';
import { NextPage } from 'next';
import { AppProps } from 'next/app';

type EnhancedAppProps = AppProps & {
  Component: NextPage;
};

export default function App(props: EnhancedAppProps) {
  const { Component, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <Provider store={store}>
      <AppWrapper>{getLayout(<Component {...pageProps} />)}</AppWrapper>
    </Provider>
  );
}
