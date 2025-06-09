import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </BrowserRouter>
);

reportWebVitals();



// function App() {
//   return (
//     <div className="App">
//       <Routes>
//         {/* Other team routes */}
//         <Route path="/admin/dashboard" element={<Dashboard />} />
//         {/* More routes */}
//       </Routes>
//     </div>
//   );
// }

// export default App;
