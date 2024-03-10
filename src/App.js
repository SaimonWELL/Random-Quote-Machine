import {Component} from "react";


import './App.css';

class Wrapper extends Component{
  render() {
    return(
        <div id="wrapper">
          <div id="quote-box">
            <div className="quote-text">
              <i className="fa fa-quote-left"></i>
              <span id="text"></span>
            </div>
            <div className="quote-author">
              <span id="author"></span>
            </div>
            <div className="buttons">
                <a className="button" id="tweet-quote" target="_top">
                    <i className="fa fa-twitter"></i>
                </a>
                <a className="button" id="tumblr-quote" target="_top">
                    <i className="fa fa-tumblr"></i>
                </a>
                <button className="button" id="new-quote"></button>
            </div>
          </div>
        </div>
    )
  }
}



function App() {
  return (
    <div className="App">
      <Wrapper/>
    </div>
  );
}

export default App;
