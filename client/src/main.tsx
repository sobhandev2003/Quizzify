
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import  { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>

    <BrowserRouter>
    <Provider store={store}>
    <App />
    </Provider>
    <Toaster
    position="top-center"
    gutter={8}
    toastOptions={{
      duration:2000
    }}
    />
    </BrowserRouter>
  // </React.StrictMode>,
)
