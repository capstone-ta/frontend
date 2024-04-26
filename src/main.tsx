import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App' // Your main app component
import RoleProvider from './role_provider' // Assuming the path to your auth context

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RoleProvider> 
      <App />
    </RoleProvider>
  </React.StrictMode>,
)
