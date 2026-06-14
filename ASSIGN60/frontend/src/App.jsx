import React from 'react'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Upload from './pages/Upload'
import Preview from './pages/preview'
import Export from './pages/Export'

const App = () => {
  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
         <Route path="/preview" element={<Preview />} />
         <Route path="/export" element={<Export />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App