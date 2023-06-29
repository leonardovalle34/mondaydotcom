/* eslint-disable react/react-in-jsx-scope */
import MainPage from './Pages/MainPage';
import { ModalState } from './contextApi/ModalContext';

function App() {
  return (
    <ModalState>
      <MainPage />
    </ModalState>
  );
}

export default App;
