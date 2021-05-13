# HWP Demo React

This is a demo for integrating [Hoops Communicator](https://www.techsoft3d.com/products/hoops/communicator/) with React framework.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Live Demo

A live demo is running with GitHub Pages at:
https://techsoft3d.github.io/hwp-demo-react/

## How To Intergrate
In order to intergrate Hoops Web Platform with React:
- Make sure that NodeJS is installed.
- Generate a new React project with `npx create-react-app [newApp]`
- Run `npm run eject` to access dependency configuration files
- Include the HWP script in **index.html**. Since it is an external library, we need to modify the webpack dependency configurations.
- !!! Inside `config/webpack.config.js`, add the following to the **return()** function of **module.exports**:
```
externals: {
  communicator: ‘Communicator'
}
```
- Now in each components’ js file, we can use the HWP Communicator by importing it like this: `import Communicator from 'communicator'`;

## To Use this Reposiroty Locally

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

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the official React documentation about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.