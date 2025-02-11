# E-Commerce Project

## Setup

1. Install dependencies:
   ```sh
   npm install
   ```

2. Start the development server:
   ```sh
   npm run dev
   ```

## Using Material-UI (MUI)

This project uses Material-UI (MUI) for UI components. To use MUI components, follow these steps:

1. Install MUI packages:
   ```sh
   npm install @mui/material @emotion/react @emotion/styled
   ```

2. Import and use MUI components in your React components:
   ```jsx
   import * as React from 'react';
   import Button from '@mui/material/Button';

   function App() {
     return (
       <Button variant="contained">Hello World</Button>
     );
   }

   export default App;
   ```

3. For more information, refer to the [MUI documentation](https://mui.com/).
