import { BrowserRouter, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home/';
import PageDetail from './components/PageDetail/PageDetail';
import CreateRecipe from './components/CreateRecipe';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/" component={LandingPage} />
        <Route path="/home" component={Home} />
        <Route path="/recipes/:id" component={PageDetail} />
        <Route path="/create" component={CreateRecipe} />
      </div>
    </BrowserRouter>
  );
}

export default App;
