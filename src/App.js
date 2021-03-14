/* Custom Hooks */
import { GlobalProvider } from './helpers/hooks/context/Rick&Morty/GlobalContext';
/* Pages */
import Homepage from './pages/Homepage';

function App() {
  return (
    <GlobalProvider>
      <Homepage />
    </GlobalProvider>
  );
}

export default App;
