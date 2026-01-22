import {createRoot} from 'react-dom/client'
import './index.css'
import './style-0-480.css'
import {Provider} from "react-redux";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {App} from "./App.tsx";
import {MoviesList} from "./pages/MoviesList.tsx";
import {MovieDetails} from "./pages/MovieDetails.tsx";
import {store} from "./store.ts";

const routes = createBrowserRouter([
    {
        path: "/", element: <App/>, children: [
            {index: true, element:<MoviesList/>},
            {path: 'movies/:id', element:<MovieDetails/>},
        ]
    }
]);

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <RouterProvider router={routes}/>
    </Provider>
);
