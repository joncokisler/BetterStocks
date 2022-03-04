
import React from 'react';
import ReviewPage from './react-components/ReviewComponents/ReviewPage';
import AdminPage from './react-components/AdminComponents/AdminPage';


function App(){

  return(
    // <AdminPage/>
    <ReviewPage/>
  )
}
export default App;
  
// =======
// import React from 'react';
// import './App.css';

// import { Route, Routes, BrowserRouter } from 'react-router-dom';

// import LoginPage from './react-components/login-signup/LoginPage';
// import SignupPage from './react-components/login-signup/SignupPage';

// class App extends React.Component {

//   render() {
//     return (
//       <div className="App">
//         <BrowserRouter>
//           <Routes>
//             <Route path='/' element={ <LoginPage /> } />
//             <Route path='signup' element={ <SignupPage /> } />
//             <Route path='top-stocks' element={ <div>top-stocks</div> } />
//             <Route path='trending-stocks' element={ <div>trending-stocks</div> } />
//           </Routes>
//         </BrowserRouter>
//       </div>
//     );
//   }
// >>>>>>> 363947f38df9ffb8a6c5980a58a46e2a30a32673
// }

// export default App;