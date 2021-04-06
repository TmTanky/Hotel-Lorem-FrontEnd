  import React from 'react'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { PersistGate } from 'redux-persist/integration/react'
import {useSelector} from 'react-redux'
import { persistor } from './redux/store/store'

// CSS
import './App.css'

// Components
import Header from './components/header/header'
import Footer from './components/footer/footer'

// Pages
import RootPage from './pages/rootPage/root'
import LoginPage from './pages/loginPage/login'
import RegisterPage from './pages/registerPage/register'
import RoomPage from './pages/homePage/homePage'
import OneRoomPage from './pages/oneRoomPage/oneRoomPage'
import MyBookingsPage from './pages/myBookingsPage/myBookingsPage'
import EditProfilePage from './pages/editProfilePage/editProfile'
import AdminPage from './pages/adminPage/adminPage'
import OngoingLink from './pages/adminPage/adminLinks/ongoing'
import Ongoing from './pages/myBookingsPage/myBookingsLinks/ongoing'

const App = () => {

  const token = localStorage.getItem('token')

  const client = new ApolloClient({
    uri: 'https://hotel-lorem-api-graphql.herokuapp.com/graphql',
    cache: new InMemoryCache(),
    headers: {
      'auth': `Bearer ${token}` || null
    }
  })

  const isTheUserLoggedIn = useSelector(state => state.isLoggedIn)
  const user = useSelector(state => state.user.user)

  return (
    <div className="App">
      <PersistGate persistor={persistor}>
        <ApolloProvider client={client} >
          <BrowserRouter>
            <Header/>
              <Switch>
                <Route exact path="/" render={() => isTheUserLoggedIn ? <Redirect to="/rooms"/> : <RootPage/> } /> 
                <Route path="/login" render={() => isTheUserLoggedIn ? <Redirect to="/rooms"/> : <LoginPage/> } /> 
                <Route path="/register" render={() => isTheUserLoggedIn ? <Redirect to="/rooms"/> : <RegisterPage/> } /> 
                <Route exact path="/rooms" render={() => isTheUserLoggedIn ? <RoomPage/> : <Redirect to="/" /> } /> 
                <Route path="/rooms/:id" render={() => isTheUserLoggedIn ? <OneRoomPage/> : <Redirect to="/login" /> } /> 
                <Route path="/mybookings" render={() => isTheUserLoggedIn ? <MyBookingsPage/> : <Redirect to="/login" /> } /> 
                <Route path="/mybookings/ongoing" render={() => isTheUserLoggedIn ? <Ongoing/> : <Redirect to="/login" /> } /> 
                <Route path="/myprofile" render={() => isTheUserLoggedIn ? <EditProfilePage/> : <Redirect to="/login" /> } /> 
                <Route path="/admin" render={() => isTheUserLoggedIn && user.isAdmin ? <AdminPage/> : <Redirect to="/login" /> } /> 
                <Route path="/admin/ongoing" render={() => isTheUserLoggedIn && user.isAdmin ? <OngoingLink/> : <Redirect to="/login" /> } />
              </Switch>
            <Footer></Footer>  
          </BrowserRouter>
        </ApolloProvider>
      </PersistGate>   
    </div>
  )
}

export default App;
