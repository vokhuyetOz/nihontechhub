import React from 'react';

import codePush from '@recodepush/react-native-code-push';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { persister } from '@utils/modules/QueryPersisterStorage';
import { appKeys } from '@utils/resource';

import AppContent from './AppContent';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      experimental_prefetchInRender: true,
      staleTime: 0, // sẽ fetch lại khi mount
      persister: persister.persisterFn,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default codePush({
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  installMode: codePush.InstallMode.IMMEDIATE,
  deploymentKey: appKeys.codePush,
})(App);
