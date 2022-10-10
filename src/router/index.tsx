import React, {
  ComponentPropsWithRef,
  ComponentType,
  ExoticComponent, FC,
  FunctionComponent,
  lazy,
  LazyExoticComponent
} from "react";
import {Route, Routes, Navigate} from "react-router-dom"

interface IRoute {
  path: string, // url路径
  element?: any, // 懒加载页面 TODO 这里类型是？？？
  children?: IRoute[],
  navigate?: string, // 重定向地址
  guest?: boolean, // 无token可访问
}

const config: IRoute[] = [
  {
    path: 'login',
    element: lazy(() => import('src/pages/login'))
  },
  {
    path: '/',
    navigate: '/login'
  },
  {
    path: 'testA',
    element: lazy(() => import('src/pages/test/TestA')),
    children: [
      {
        path: 'componentA',
        element: lazy(() => import('src/pages/test/componentA/ComponentA'))
      },
      {
        path: 'componentB',
        element: lazy(() => import('src/pages/test/componentA/ComponentB'))
      }
    ]
  },
  {
    path: 'testB',
    element: lazy(() => import('src/pages/test/TestB')),
    guest: true
  }
]

const whiteList = ['testB']

export default function MRouter() {
  return <Routes>
    { formatRouter(config) }
  </Routes>
}

function formatRouter(config: IRoute[]) {
  return config.map((v:IRoute, i) => {
    const Comp = v.element
    const auth = checkAuth()
    const Sus = <React.Suspense fallback={<div/>}>
      { (auth || whiteList.includes(v.path) ) ? (v.navigate ? <Navigate to={v.navigate} /> : <Comp />) : <Navigate to='/testB' /> }
    </React.Suspense>
    return <React.Fragment key={i}>
      <Route path={v.path} element={Sus}>
        {
          v.children ? formatRouter(v.children) : null
        }
      </Route>
    </React.Fragment>
  })
}

function checkAuth() {
  return true
  // return !!sessionStorage.getItem('token');
}