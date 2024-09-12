import { lazy, Suspense, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import classes from './App.module.scss';
import Loading from "@/components/Loading";

const Shop = lazy(() => import('@/components/Shop'));
const About = lazy(() => import('@/components/About'));
const Main = lazy(() => import('@/components/Main'));
const Gallery = lazy(() => import('@/components/Gallery'));

// Tree shaking - will be deleted from bundle
function printLog() {
    console.log('TODO');
}

const router = createBrowserRouter([
    {
      path: "/",
      element: <Suspense fallback={<Loading />}><Main /></Suspense>,
      errorElement: <h1>This is Error Page</h1>,
      children: [
        {
            path: "about",
            element: <Suspense fallback={<Loading />}><About /></Suspense>,
        },
        {
            path: "shop",
            element: <Suspense fallback={<Loading />}><Shop /></Suspense>,
        },
        {
            path: "gallery",
            element: <Suspense fallback={<Loading />}><Gallery /></Suspense>,
        },
      ]
    },
    
]);

export function App() {
    const [counter, setCounter] = useState(0);

    return (
        <div className={classes.app}>
            <h1 className={classes.title}>Welcome to <span>my</span> app</h1>
            <h2>{counter}</h2>
            <button className={classes.button} onClick={() => setCounter(prev => ++prev)}>increase</button>
            <RouterProvider router={router} />
        </div>
    )
}