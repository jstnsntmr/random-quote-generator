import { useEffect, useState } from "react";
import "./App.scss";

function App() {
  useEffect(() => {
    getQuote();
  }, []);

  const [quoteContent, setQuoteContent] = useState({});

  const getQuote = () => {
    fetch("https://type.fit/api/quotes")
      .then((response) => response.json())
      .then((data) => {
        let randomIndex = Math.floor(Math.random() * data.length);
        let colors = ["yellow", "blue", "green", "pink", "violet", "rose"];
        let color = colors[Math.floor(Math.random() * colors.length)];
        while (color === quoteContent.curColor) {
          color = colors[Math.floor(Math.random() * colors.length)];
        }

        setQuoteContent({
          text: data[randomIndex].text,
          author: data[randomIndex].author,
          curColor: color,
          tweetURL:
            "https://twitter.com/intent/tweet/?text=" +
            encodeURIComponent(
              '"' + data[randomIndex].text + '" ' + data[randomIndex].author
            ),
        });
      });
  };

  const getNewQuote = () => {
    getQuote();
  };

  return (
    <div id="App" className={quoteContent.curColor}>
      <div className="container">
        <div className="row">
          <div id="quote-box" className="column">
            <div className="quote-content">
              <h3>Quote of the Day</h3>
              <div id="text">
                <i className="fa-solid fa-quote-left"></i>
                {quoteContent.text}
              </div>
              <div id="author">- {quoteContent.author || "Unknown"}</div>
            </div>
            <div className="buttons">
              <a
                href={quoteContent.tweetURL}
                target="_blank"
                id="tweet-quote"
                className={`button ${quoteContent.curColor}`}
              >
                <i className="fa-brands fa-twitter"></i>
              </a>
              <button
                id="new-quote"
                onClick={getNewQuote}
                className={`button ${quoteContent.curColor}`}
              >
                New Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
