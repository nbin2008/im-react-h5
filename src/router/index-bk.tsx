import React, {lazy} from "react";
import {Route, Routes, Navigate} from "react-router-dom"
import TestA from "src/pages/test/TestA";
import TestB from "src/pages/test/TestB";
import ComponentA from "src/pages/test/componentA/ComponentA";
import ComponentB from "src/pages/test/componentA/ComponentB";

interface IRoute {
  path: string,
  // element: string,
  children?: IRoute[]
  [key: string]: any
}

const config: IRoute[] = [
  {
    path: '/',
    element: <Navigate to="testA" />,
  },
  {
    path: 'testA',
    element: <TestA />,
    children: [
      {
        path: 'componentA',
        element: <ComponentA />
      },
      {
        path: 'componentB',
        element: <ComponentB />
      }
    ]
  },
  {
    path: 'testB',
    element: <TestB />
  }
]

function formatRouter(config: IRoute[]) {
  return config.map((v:IRoute, i) => {
    return <React.Fragment key={i}>
      <Route path={v.path} element={v.element}>
        {
          v.children ? formatRouter(v.children) : null
        }
      </Route>
    </React.Fragment>
  })
}

export default function MRouter() {
  return <Routes>
    { formatRouter(config) }
  </Routes>
}