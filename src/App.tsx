import React from 'react'
import './App.css'
import { RecoilRoot } from 'recoil'
import Editor from './components/editor'

function App() {
  return (
    <RecoilRoot>
      <Editor />
    </RecoilRoot>
  )
}

export default App
