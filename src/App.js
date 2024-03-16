import {Component} from "react";


import './App.css';

class Wrapper extends Component{

constructor(props) {
  super(props);
  this.state={
    data:null,
    error:null,
    index:0,
    opacity:1
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

newQuote = (min,max)=> {
    min = Math.ceil(min);
    max = Math.floor(max);
    this.setState({opacity: 0})
    setTimeout(()=>{
        this.setState(({index})=>{
            return {
                index: Math.floor(Math.random() * (max - min + 1)) + min
            }
        })
    },500)
    setTimeout(() => {
        this.setState({ opacity: 1 });
    }, 500);

}

 async decreaseOpacity() {
     this.setState({ opacity: 0 });
     // Через определенный промежуток времени (например, 1 секунду) возвращаем прозрачность обратно к 1
     setTimeout(() => {
         this.setState({ opacity: 1 });
     }, 2000);
};

  render() {
    const { data, error ,index, opacity} = this.state;



    return(
        <div id="wrapper">
          <div id="quote-box">
            <div className="quote-text text-opacity" style={{opacity: opacity}}>
              <i className="fa fa-quote-left"></i>
              {error && <span id="text">Error:{error}</span>}
              {data && <span id="text" className='' >{data[index].quote}</span>}
            </div>
            <div className="quote-author ">
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
                <button onClick={()=>{
                    this.newQuote(0,data.length);
                     }
                } className="button " id="new-quote">New quote</button>
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
