import { BrowserRouter, Route, Routes} from "react-router-dom"
import ListarFilmes from "./pages/ListarFilmes"
import CadastrarFilme from "./pages/CadastroFilmes"
import ReviewsFilmes from "./pages/ReviewFilmes"

function App() {

  return (
    <div>

      <BrowserRouter>
        <Routes> 
          <Route path="/" element={<ListarFilmes/>}/>
          <Route path="/cadastro" element={<CadastrarFilme/>}/>
          <Route path="/review/" element={<ReviewsFilmes/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
