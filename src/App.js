import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

// CSS
import './App.css'

// Components
import Header from './components/header/header'
import Footer from './components/footer/footer'

// Pages
import RootPage from './pages/rootPage/root'

const App = () => {
  return (
    <div className="App"> 
      <BrowserRouter>
        <Header/>
          <Switch>
            <Route exact path="/" component={RootPage} /> 
          </Switch>
        <Footer></Footer>  
      </BrowserRouter>
    </div>
  )
}

export default App;
