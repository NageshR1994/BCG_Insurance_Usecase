import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Header from './components/header'
import SearchBox from './components/search_box';
import GraphPage from './pages/graphs'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
       <Routes>
       <Route path="/" element={<SearchBox/>} exact></Route>
       <Route path="/analytics" element={<GraphPage/>} exact></Route>
       <Route path="" element={''} ></Route>
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
