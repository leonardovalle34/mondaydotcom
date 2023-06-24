import MainPage from "./Pages/MainPage"
import Modal from "./components/modal/Modal"
import { ModalState } from "./contextApi/ModalContext"


function App() {

  return (
    <ModalState>
      <MainPage/>
    </ModalState>
  )
}

export default App
