import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'antd/dist/reset.css'
import { ConfigProvider, theme } from 'antd'
import { Provider, useSelector } from "react-redux"
import store, {persistor} from "./store/store"
import { PersistGate } from 'redux-persist/integration/react'
import MainLayout from './layouts/Main/MainLayout'
import AuthLayout from './layouts/Auth/AuthLayout'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './router/Router'

const root = ReactDOM.createRoot(document.getElementById('root'));

const RootApp = () => {

  const isDarkMode = useSelector((state) => state.theme.isDarkMode) // Get theme state from Redux

  return (
    <ConfigProvider theme={{ algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm }}>
        <AppRouter />
    </ConfigProvider>
  )
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}> {/* Delay rendering until state is restored */}
        <RootApp />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

