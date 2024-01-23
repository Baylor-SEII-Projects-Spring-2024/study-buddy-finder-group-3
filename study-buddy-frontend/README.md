# study-buddy-frontend

This is the frontend component of the Study Buddy project. This project uses [React](https://react.dev/) as a framework and [Next.js](https://nextjs.org/) (using the **pages router**) as a routing and building solution. [Yarn](https://yarnpkg.com/) is used for project and dependency management (in other words, use `yarn add` instead of `npm install` when following any guides online). In addition, [Material UI](https://mui.com/material-ui/) and [Redux](https://react-redux.js.org/) are preconfigured for styling and global state management, respectively.

This set of tools has been chosen to be a solid, simple foundation for frontend development that mimics what is commonly used in production applications that are developed in the industry. However, as consultants, your team may discover that a different tool or library suits the needs of your specific project better than what we have provided here. If you choose to replace some of the pieces of the project, please just run it by your mentors and the class TAs in your next scrum meeting; just keep in mind that the mentors and class TAs are only guaranteed to be familiar and be able to provide help with this specific set of tools. Using additional tools is always allowed and encouraged!

**For installation and setup instructions, see the root folder's README.**

## Quick Reference

To run the development server:

```bash
yarn dev
```

To run a production version of your application:
```bash
# Build the producation application
yarn build

# Run the production application
yarn start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

In development mode, pages that you are viewing will auto-update as you edit the corresponding files in your project.

## Overview of Pre-Configured Tools

### React

React is a JavaScript-based open-source web application framework for the application’s front-end that allows you to create dynamic views for your single-page application. It is a very widely-used platform and is thus many developers; go-to when creating a web application.

React allows you to declare re-usable, composable components that allows you to quickly and easily create interactive webpages written in a way that looks almost like normal HTML.

The React documentation offers a good way to learn the basics that will get you started:

- [React Quick Start Guide](https://react.dev/learn) - introduction to the 80% of React concepts that you will use on a daily basis
- [Tic-Tac-Toe](https://react.dev/learn/tutorial-tic-tac-toe) - learn-by-doing approach to make a quick tic-tac-toe game as a way to learn React
- [Thinking in React](https://react.dev/learn/thinking-in-react) - example of how to transform some data and site designs into actual React components

### Next.js

Next.js is one of the most popular frameworks for easily setting up and deploying a React project. It offers many different benefits to React developers, such as straightforward routing, support for various rendering approaches (server-side, client-side, static), CSS support, and general optimizations.

The main benefit of using Next.js in the context of this project is its **pages router**, which will allow you to create new pages in your app by creating a separate file per-page and link them automatically without having to write the code to do so yourself. **Important: Next.js offers two routing approaches: the App Router and the Pages Router. This template project uses the pages router as it is generally the simpler of the two and works better for multi-page projects like this one. Make sure that you select the correct version of the documentation (app vs pages router) when looking at the Next.js documentation.**

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Next.js Project Structure](https://nextjs.org/docs/getting-started/project-structure) - helps to describe the different folders and files present in the project

### Material UI

Material UI is a React component library which allows you to quickly create apps that follow Google's [Material Design specifications](https://m3.material.io/). It includes both common components, such as buttons, dialogs, and layouts, as well as a styling solution that lets you integrate CSS styles within your Javascript code that are responsive and interactive (different color themes included!).

See the Material UI documentation [here](https://mui.com/material-ui/getting-started/). Do note that Material UI version 5 (which is what this template project uses) is still quite young and many guides and tutorials online still use version 4, which is not entirely compatible.

### Redux

Redux allows you to manage state that you can access from anywhere in your app (i.e., "global state"). This is useful for things like information about the logged-in user, cookie preferences, configuration settings (light vs. dark color scheme), etc.

This project uses Redux Toolkit, a separate library which makes configuring the Redux stores in a more organized way. Here are some resources you might find useful:

- [Redux Core Concepts](https://redux.js.org/introduction/core-concepts) - brief introduction to how Redux works
- [Redux Learning Resources](https://redux.js.org/introduction/learning-resources) - additional resources to learn about Redux
- [Redux Toolkit Quick Start Guide](https://redux-toolkit.js.org/tutorials/quick-start) - brief tutorial on how to use Redux
- [Redux Toolkit Usage Guide](https://redux-toolkit.js.org/usage/usage-guide) - full guide about the various aspects of Redux toolkit