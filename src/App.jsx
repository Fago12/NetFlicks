import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  useLocation,
} from 'react-router-dom';

import './App.css';
import RootLayout from './layouts/RootLayout';
import { Homepage, MoviesList, MovieDetails, PageNotFound } from './pages';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<Homepage />} />
      <Route path='movies/:genreId' element={<MoviesList />} />
      <Route path='movie/:movieID' element={<MovieDetails />} />
      <Route path='*' element={<PageNotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
