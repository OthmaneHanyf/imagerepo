import React from 'react';
import Layout from './components/Layout';
import {Route, Routes, BrowserRouter as Router} from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <Layout >
      <Router >
        <Routes >
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>
    </Layout>
  )
}

export default App;
