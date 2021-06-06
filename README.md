# HWP Demo React - TypeScript

This is a demo for integrating [Hoops Communicator](https://www.techsoft3d.com/products/hoops/communicator/)(HWP) with React framework.
The project is bootstrapped with [Create React App](https://create-react-app.dev/docs/adding-typescript).

**This branch is showcasing the implementation using TypeScript. For JavaScript implementation, please checkout the [Main Branch](https://github.com/techsoft3d/hwp-demo-react/tree/main).**

## Live Demo

A live demo is running with GitHub Pages at:
https://techsoft3d.github.io/hwp-demo-react/

## How To Intergrate
In order to intergrate Hoops Web Platform with React using TypeScript:
- Make sure that NodeJS is installed.

- Generate a new React project with `npx create-react-app [app-name] --template typescript`

- In **index.html**, include the `hoops_web_viewer.js` with a **\<script>** tag.

  ```html
  <script crossorigin type="text/javascript"
      src="https://cdn.jsdelivr.net/gh/techsoft3d/hoops-web-viewer@2020.0.0/hoops_web_viewer.js"></script>
  ```

- In **src/react-app-env.d.ts**, add the following so that *.scs* files can be imported in the typescript code.

  ```typescript
  declare module '*.scs';
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