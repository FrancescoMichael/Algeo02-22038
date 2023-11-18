import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'
import ErrorPage from './pages/404.jsx';
import AboutUs from './pages/aboutus.jsx';
import PenjalasanSearchEngine from './pages/search.jsx';
import HowtoUse from './pages/howtouse.jsx';
import Proses from './pages/cbir.jsx';
import ResultSection from './components/Layouts/ResultSection.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Proses />,
    errorElement: <ErrorPage />
  },
  {
    path : "/results",
    element: <ResultSection />
  },
  {
    path: "/about-us",
    element: <AboutUs />
  },
  {
    path: "/search-engine",
    element: <PenjalasanSearchEngine />
  },
  {
    path: "/how-to-use",
    element: <HowtoUse />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider 
      router = {router}
    />
  </React.StrictMode>,
)
