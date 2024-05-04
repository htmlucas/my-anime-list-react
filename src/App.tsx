import './App.css';
import { Layout } from './components/Layout';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import MainRoutes from './routes/routes';
import { BrowserRouter } from 'react-router-dom';
import { AppContextProvider } from './components/AppContext';
import { createLocalStorage, getAllLocalStorage } from './services/storage';
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {

  !getAllLocalStorage() && createLocalStorage()

  return (
    <>
    <BrowserRouter>
      <AppContextProvider>
        <Layout>
          <MainRoutes/>
        </Layout>
      </AppContextProvider>
    </BrowserRouter>
    </>
  );
}

export default App;
