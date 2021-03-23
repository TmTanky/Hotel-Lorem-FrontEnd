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

const App = () => {

  const client = new ApolloClient({
    uri: 'http://localhost:8000/graphql',
    cache: new InMemoryCache()
  })

  const isTheUserLoggedIn = useSelector(state => state.isLoggedIn)

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
              </Switch>
            <Footer></Footer>  
          </BrowserRouter>
        </ApolloProvider>
      </PersistGate>   
    </div>
  )
}

export default App;
