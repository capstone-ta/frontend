import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes' 
import RoleProvider from './utils/roleProvider' 
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RoleProvider> 
      <App />
    </RoleProvider>
  </React.StrictMode>,
)
