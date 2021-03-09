/* Custom Hooks */
import { CharactersProvider } from './helpers/hooks/CharactersContext';
/* Pages */
import Homepage from './pages/Homepage';

function App() {
  return (
    <CharactersProvider>
      <Homepage />
    </CharactersProvider>
  );
}

export default App;
