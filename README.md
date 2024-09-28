# Tree-Structure Management App

This project is a dynamic tree-structure management application built using React, Redux Toolkit, and RTK Query. It enables users to interact with a hierarchical tree structure, including the ability to drag and drop both nodes and leaves. The app efficiently manages state using Redux Toolkit and optimistically updates the tree using RTK Query, ensuring a seamless user experience.

## Key Features
- Drag-and-Drop Functionality: Move nodes and leaves within the tree by dragging and dropping.
- Dynamic Tree Rendering: Render trees dynamically with efficient state updates.
- Optimistic UI Updates: Mutate the cache directly using RTK Query for responsive UI updates.
- Persistent State: Cache updates after 24 hours.
- Toggling dark and light theme

## Tech Stack

Tech Stack
- React: Frontend framework.
- Redux Toolkit: State management and slices.
- RTK Query: Data fetching, caching, and synchronization.
- TypeScript: Static type checking.
- Jest & React Testing Library: For unit testing and integration tests.

## Project Structure
```plaintext
.
├── src
│   ├── assets               # Static assets like icons
│   ├── components           # React components
│   ├── features             # Redux slices and state management
│   │   ├── treeReducer.ts   # Redux slice for tree management
│   ├── services             # API services and RTK Query logic
│   │   └── fetchTreeData.ts # RTK Query API slice for tree data
│   ├── utils                # Utility functions like drag-and-drop helpers
│   └── App.tsx              # Main application component
├── public                   # Static assets like HTML, favicon, etc.
└── package.json             # Project dependencies and scripts

````


## Usage 
- Drag-and-Drop Tree Nodes: Drag a node or leaf by clicking and holding. Drop it onto another node to move it within the tree (all its children will move to target tree node).
- The state of the tree is updated optimistically using RTK Query.
- Node Highlighting: Click on any node to highlight it and Clicking the node again will unhighlight it.
- State Synchronization
