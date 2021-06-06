# HWP Demo React

This is a demo for integrating [Hoops Communicator](https://www.techsoft3d.com/products/hoops/communicator/)(HWP) with React framework.
The project is bootstrapped with [Create React App](https://create-react-app.dev/docs/adding-typescript).

**This branch is showcasing the implementation using JavaScript. For TypeScript implementation, please checkout the [TypeScript Branch](https://github.com/techsoft3d/hwp-demo-react/tree/typescript).**

## Live Demo

A live demo is running with GitHub Pages at:
https://techsoft3d.github.io/hwp-demo-react/

## How To Intergrate
In order to integrate Hoops Web Platform with React using JavaScript:

- Make sure that NodeJS is installed.
- Generate a new React project with `npx create-react-app [newApp]`
- Run `npm run eject` to access dependency configuration files
- In the **index.html**, include the `hoops_web_viewer.js` with a **\<script>** tag. 
  ```html
  <script crossorigin type="text/javascript"
      src="https://cdn.jsdelivr.net/gh/techsoft3d/hoops-web-viewer@2020.0.0/hoops_web_viewer.js"></script>
  ```
- !!! Since `hoops_web_viewer.js` is an external library, we need to modify the webpack dependency configurations. Inside `config/webpack.config.js`, add the following to the **return()** function of **module.exports**:
  ```javascript
  externals: {
    communicator: ‘Communicator'
  }
  ```
- Now in each components’ js file, we can use the HWP Communicator by importing it like this: 
  ```javascript
  import Communicator from 'communicator';
  ```

## To Use this Repository Locally

Make sure that NodeJS is installed. In the project directory, run:

### `npm install`

Install node_module dependencies.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

See the official React documentation about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.