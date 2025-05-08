import React from "react";
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import Layout from './pages/StockPage';
import CreateProductPage from "./pages/CreateProductPage";
import StockPage from "./pages/StockPage";

function App(){
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Layout><StockPage/></Layout>}/>
        <Route path="/stock" element={<Layout><CreateProductPage/></Layout>}/>
        <Route path="/crear-producto" element={<Layout><CreateProductPage/></Layout>}/>
      </Routes>
    </Router>
  );
}

export default App;