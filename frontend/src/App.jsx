import styles from './App.module.css';
import {Routing} from "./Routing";
import {QueryClient, QueryClientProvider} from "react-query";

function App() {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      }
    }
  })
  return (
      <div className={styles.App}>
        <QueryClientProvider client={client}>
        <Routing/>
        </QueryClientProvider>
      </div>
  );
}

export default App;
