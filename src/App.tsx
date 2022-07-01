import React from 'react'
import './App.css'
import { RecoilRoot } from 'recoil'

import Background from './components/background'
import Document from './components/document'
import Editor from './components/editor'

function App() {
  return (
    <RecoilRoot>
      <Document>
        <Background>
          <Editor />
        </Background>
      </Document>
    </RecoilRoot>
  )
}

export default App
