import AppRoutes from './routes/router'
import {Suspense} from 'react'
import "./App.css";



function App() {
  return (
    <Suspense fallback={<div>loading</div>}>
      <AppRoutes />

    </Suspense>
    
  );
}

export default App;
