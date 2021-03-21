import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

// CSS
import './App.css'

// Components
import Header from './components/header/header'
import Footer from './components/footer/footer'

// Pages
import RootPage from './pages/rootPage/root'
import LoginPage from './pages/loginPage/login'
import RegisterPage from './pages/registerPage/register'

const App = () => {

  const client = new ApolloClient({
    uri: 'http://localhost:8000/graphql',
    cache: new InMemoryCache()
  })

  return (
    <div className="App">
      <ApolloProvider client={client} >
        <BrowserRouter>
          <Header/>
            <Switch>
              <Route exact path="/" component={RootPage} /> 
              <Route path="/login" component={LoginPage} /> 
              <Route path="/register" component={RegisterPage} /> 
            </Switch>
          <Footer></Footer>  
        </BrowserRouter>
      </ApolloProvider>   
    </div>
  )
}

export default App;
