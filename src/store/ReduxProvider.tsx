import { ReactNode, useRef } from 'react';
import { AppStore, makeStore } from './store.ts';
import { Provider } from 'react-redux';

type ReduxProviderProps = {
  children: ReactNode;
};

export function ReduxProvider({ children }: ReduxProviderProps) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
