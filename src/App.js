import {Component} from "react";


import './App.css';

class Wrapper extends Component{

constructor(props) {
  super(props);
  this.state={
    data:null,
    error:null
  };
}

componentDidMount() {
  this.fetchData();
}

async fetchData(){
  try{
    const response = await fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
    if (!response.ok) {
      throw new Error('Error during data loading');
    }
    const json = await response.json();

    this.setState({data: json.quotes})

  }catch (error){
    this.setState({error:error.message})
  }
}

  render() {
    const { data, error } = this.state;
    let index = 0

    return(
        <div id="wrapper">
          <div id="quote-box">
            <div className="quote-text">
              <i className="fa fa-quote-left"></i>
              {error && <span id="text">Error:{error}</span>}
              {data && <span id="text">{data[index].quote}</span>}
            </div>
            <div className="quote-author">
              {error && <span id="author">Error:{error}</span>}
              {data && <span id="author">- {data[index].author}</span>}


            </div>
            <div className="buttons">
                <a className="button" id="tweet-quote" target="_top">
                    <i className="fa fa-twitter"></i>
                </a>
                <a className="button" id="tumblr-quote" target="_top">
                    <i className="fa fa-tumblr"></i>
                </a>
                <button className="button" id="new-quote">New quote</button>
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
