import AsyncStorage from "@react-native-async-storage/async-storage";
import { focusManager, QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { Stack } from "expo-router";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { useAppState } from "../src/query-setup/useAppState";
import { useOnlineManager } from "../src/query-setup/useOnlineManager";

function onAppStateChange(status) {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      staleTime: Infinity,
      cacheTime: Infinity,
      retry: 0,
    },
    queries: {
      retry: 2,
      cacheTime: 1000 * 10,
    },
  },
});

const asyncPersist = createAsyncStoragePersister({
  storage: AsyncStorage,
  dehydrateOptions: {
    dehydrateMutations: true,
    dehydrateQueries: false,
  },
  throttleTime: 1000,
});

export default function App() {
  useAppState(onAppStateChange);
  useOnlineManager();

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        maxAge: Infinity,
        persister: asyncPersist,
      }}
      onSuccess={() =>
        queryClient
          .resumePausedMutations()
          .then(() => queryClient.invalidateQueries())
      }
    >
      <Stack />
    </PersistQueryClientProvider>
  );
}
