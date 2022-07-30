// importing all componenets
import React, { Component } from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import apiKey from './config';
import Search from './Components/Search';
import Nav from './Components/Nav';
import PhotoContainer from './Components/PhotoContainer';
import NoPage from './Components/NoPage'


//Initializing state with app class component

class App extends Component {
  constructor(){
    super();
  
  this.state = {
    photos: [],
    basketball: [],
    honda: [],
    lion: [],
    title: '',
    isLoading: true
  };
}

  //Loading external data when our component gets mounted to the DOM via searchTag function
componentDidMount() {
  this.searchTag();
  this.searchTag('basketball');
  this.searchTag('honda');
  this.searchTag('lion');
}
// Requesting data from the Flickr API using the Fetch API using the searchTag function
searchTag = (tag) => {
  fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${tag}&per_page=16&format=json&nojsoncallback=1`)
  //After the fetch method executes the result is returned in JSON format and then the state is updated by passing in a function that takes the JSON data and returns a new state
    .then(res => res.json())
    
    .then(response => {
      if(tag === 'basketball'){
        this.setState({
          basketball: response.photos.photo,
          loading: false
        })
      } else if (tag === 'honda') {
        this.setState({
          honda: response.photos.photo,
          loading: false
        }) 
      } else if (tag === 'lion') {
          this.setState({
            lion: response.photos.photo,
            loading: false
          })
        } else {
          this.setState({
            photos: response.photos.photo,
            loading: false,
            title: tag
          })
        }
        })
        //Creating an error function that takes the parameter 'error'
      .catch(error => {
        console.log('Error collecting data', error);
      });
      }
//Adding a loading indicator to aim for Exceeds
manageLoading = (indicator) => {
  this.setState({loading: indicator});
}

//Rendering the child components of our app and passing them external API data state via props. Also establishing a header container and welcome message using Bootstrap. Also calling the NoPage component for routes that do not exist
render () {
  return(
    <div>
      <div>
            <Container> 
              <h1>Welcome to the Photo Gallery </h1>
              <p>
                This is an app built by your trusted developer Jerry Louis! Feel free to search any items you think of! 
              </p>
            </Container>
      </div>
    <BrowserRouter>
          <Search onSearch={this.searchTag} tag={this.state.title} setLoading={this.manageLoading}/>
          <Nav/>
          <Switch>
            <Route exact path='/' render= { () =>
            <Redirect to="/basketball"/>} />
            <Redirect from="/search/basketball" to="/basketball"/>
            <Route exact path='/basketball' render={ () =>
            <PhotoContainer data={this.state.basketball} title='basketball' loading={this.state.loading} onSearch={() => this.searchTag} />} />

            <Redirect from="/search/honda" to="/honda"/>
            <Route exact path='/honda' render={ () => <PhotoContainer 
              data={this.state.honda} title='honda' loading={this.state.loading} onSearch={ () => this.searchTag}/>} />

            <Redirect from="/search/lion" to="/lion"/>
              <Route exact path='/lion' render={ () => <PhotoContainer
                data={this.state.lion} title='lion' loading={this.state.loading} onSearch={ () => this.searchTag}/>}
                />
            <Route exact path='/search/:tag' render={ () => <PhotoContainer
              data={this.state.photos} title={this.state.title} loading={this.state.loading} onSearch={ () => this.searchTag}/>}
            />
            <Route component={NoPage} />
            </Switch>
          </BrowserRouter>  
    </div>)
}
}

export default App;

