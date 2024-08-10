# Getting started with Create React App

## 1. Initial CRA project envirement

### a. Use CRA to create peoject 

```
npx create-react-app react-app    // 'react-app' is peoject name
```

### b. Organize the project directory (especially src)

Create new floder: 

1. '/src/apis': contains apis 

2. '/src/assets': contains static resource, such as pictures and formats 

3. '/src/components': contains common components 

4. '/src/pages': contains page-level components 

5. '/src/router': contains routers 

6. '/src/store': contains Redux states 

7. '/src/utils': contains utility functions, such as event-processing-function and request-function

## 2. SCSS

SCSS is a precompiled CSS language with the suffix '.scss'. 

https://sass-lang.com/

### a. Access SCSS

```
npm install sass -D
npm i sass -D
```

### b. Test if '.scss' file available  

```scss
body {
    div {
        color: blue; 
    }
}
```

## 3. Ant Design 

Ant Design is a React UI component library based on the Ant Design design system. 

https://ant.design/index-cn

### a. Install AntD

```
npm install antd --save
npm i antd --save
```

### b. Use AntD in React App 

```jsx
import { Button } from 'antd';

function App() {
  return (
    <div className="App">
      {/* functions */}
      <Button type="primary">Button</Button>
      {/* functions */}
    </div>
  );
}

export default App;
```

## 4. Configuring basic routing

### a. Install Router 

```
npm install react-router-dom
npm i react-router-dom
```

### b. Create two new routers

#### Create new '/src/pages/Layout/index.js'

Basic Router: 
```jsx 
const Layout = () => {
    return (
        <div>
            this is Layout.
        </div>
    )
}

export default Layout
```

#### Create new '/src/pages/Login/index.js'

Basic Router: 
```jsx 
const Layout = () => {
    return (
        <div>
            this is Layout.
        </div>
    )
}

export default Layout
```

#### Set Routers in '/src/router/index.js'

```jsx
// set router 
import Layout from "../pages/Layout";
import Login from "../pages/Login";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: '/', 
        element: <Layout />
    }, 
    {
        path: 'Login', 
        element: <Login />
    }
])

export default router
```

#### Configure project entry file '/src /index.js'

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { RouterProvider } from 'react-router-dom';
import router from './router';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
```

## 5. Configure alias path '@' 

Replace the src path with @ to facilitate path search and access during development.

```jsx
// before use @
import Layout from '../pages/Layout'
// after use @
import Layout from '@/pages/Layout'
```

### a. Replace the src path with @

#### Install craco

https://www.npmjs.com/package/@craco/craco

```
npm install @craco/craco -D
npm i @craco/craco -D
```

#### Create '/craco.config.js'

```jsx
const path = require('path')

module.exports = {
    webpack: {
        alias: {
            '@' : path.resolve(__dirname, 'src')
        }
    }
}
```

#### Modify '/package.json' file

```json
"scripts": {
    "start": "craco start",
    "build": "craco build",
    "test": "craco test",
    "eject": "react-scripts eject"
  },
```

### b. Add association reminder

#### Create '/jsconfig.json'

```json
{
    "compilerOptions": {
        "baseUrl": "./", 
        "paths": {
            "@/*" : [
                "src/*"
            ]
        }
    }
}
```

## 6. Manage projects with Giteeu (version update)

Gitee Account: 
Name: pei
URL: https://gitee.com/peixi_z
Phone number: 15832111034
Password: Zpx,19931110

Github Account: 
Email: peixi1110@gmail.com
Password: Zpx,19931110

### a. Initial an empty remote repository for porject

Example: https://github.com/peixi1110/react-app.git

#### create a new repository on the command line

```
echo "# react-app" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/peixi1110/react-app.git
git push -u origin main
```

#### push an existing repository from the command line

```
git remote add origin https://github.com/peixi1110/react-app.git
git branch -M main
git push -u origin main
```

### b. Associate remote repository with local repository 

```
git remote add origin https://github.com/peixi1110/react-app.git
```

### c. Submit code to the remote repository

```
git add . 
git commit -m "Init"
git push
```

# Project development

## 1. Login page

### Preparing static structure

Core Components: 
1. Card
2. Form
3. Input 
4. Button 

