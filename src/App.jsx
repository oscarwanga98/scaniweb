
import ProdcutList from './pages/ProdcutList'
import AddProduct from './pages/AddProduct'
import {BrowserRouter as Router,Routes,Route, BrowserRouter} from 'react-router-dom'

function App() {
  

  return (
    <BrowserRouter>

        <Routes>
          <Route path='/' element={<ProdcutList/>}></Route>
          <Route path='/add-product' element={<AddProduct/>}></Route>
        </Routes>
    </BrowserRouter>
     
    
  )
}

export default App
