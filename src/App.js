// import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Entry from './Pages/Entry/Entry'

function App() {
  return (

    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path="/login" component = {() => <Entry type="login"/>} />
        <Route exact path="/register" component = {() => <Entry type="register"/>} />
        
      </Switch>
    </BrowserRouter>
  );
}

export default App;
