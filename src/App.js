import {Component} from "react";


import './App.css';

class Wrapper extends Component{

constructor(props) {
  super(props);
  this.state={
    data:null,
    error:null,
    index:0,
    opacity:1,
    indexColor:0,
    loading:true
  };
}

componentDidMount() {
    const colors = [
        '#16a085',
        '#27ae60',
        '#2c3e50',
        '#f39c12',
        '#e74c3c',
        '#9b59b6',
        '#FB6964',
        '#342224',
        '#472E32',
        '#BDBB99',
        '#77B1A9',
        '#73A857'
    ];
    const body = document.querySelector('body');
    body.style.backgroundColor = colors[this.state.indexColor]
    this.fetchData();
}

async fetchData(){
  try{
    const response = await fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
    if (!response.ok) {
      throw new Error('Error during data loading');
    }
    const json = await response.json();

    this.setState({
        data: json.quotes,
        loading: false

    })

  }catch (error){
    this.setState({error:error.message})
  }
}

async newQuote (min,max,colors) {
    min = Math.floor(min);
    max = Math.floor(max);

    const body = document.querySelector('body');
    const minColor = 0,
          maxColor = colors.length
    this.setState({opacity: 0})
    await new Promise((resolve,reject)=>{
        setTimeout(()=>{
            this.setState(()=>{
                return {
                    index: Math.floor(Math.random() * (max - min + 1)) + min,
                    opacity: 1,
                    indexColor: Math.floor(Math.random() * (maxColor - minColor + 1)) + minColor,
                }
            })

            body.style.backgroundColor = colors[this.state.indexColor]
        },500);

    })

}



  render() {
    const { data, error ,index, opacity, indexColor,loading} = this.state;

    const colors = [
        '#16a085',
        '#27ae60',
        '#2c3e50',
        '#f39c12',
        '#e74c3c',
        '#9b59b6',
        '#FB6964',
        '#342224',
        '#472E32',
        '#BDBB99',
        '#77B1A9',
        '#73A857'
    ];
    let tt ='asdasd'

    return(
        <div id="wrapper">
            {loading ?(<p>Please wait</p>): (
                <div id="quote-box">
                    <div className="quote-text " style={{opacity: opacity, color: colors[indexColor]}}>
                        <i className="fa fa-quote-left"></i>
                        {error && <span id="text">Error:{error}</span>}
                        {data && <span id="text">{data[index].quote}</span>}
                    </div>
                    <div className="quote-author " style={{opacity: opacity, color: colors[indexColor]}}>
                        {error && <span id="author">Error:{error}</span>}
                        {data && <span id="author">- {data[index].author}</span>}
                    </div>
                    <div className="buttons">
                        <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(data[index].quote)}`}
                           className="button" id="tweet-quote" target="_top"
                           style={{backgroundColor: colors[indexColor]}}>
                            <i className="fa fa-twitter"></i>
                        </a>
                        <a href={`https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=start&caption=hello&content=${encodeURIComponent(data[index].quote)}&canonicalUrl=${encodeURIComponent('https://www.tumblr.com/buttons&shareSource=tumblr_share_button')}`} className="button" id="tumblr-quote" target="_top"
                           style={{backgroundColor: colors[indexColor]}}>
                            <i className="fa fa-tumblr"></i>
                        </a>
                        <button onClick={() => {
                            this.newQuote(0, data.length, colors);
                        }
                        } className="button " id="new-quote" style={{backgroundColor: colors[indexColor]}}>New quote
                        </button>
                    </div>
                </div>
            )

            }

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
