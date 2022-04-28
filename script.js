const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show loading
function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
// Close loading
function removeLoadingSpinner() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Show New Quote
function showNewQuote() {
    // Call the loader
    showLoadingSpinner();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check for long text
    quote.text.length > 120 ? quoteText.classList.add('long-quote') : quoteText.classList.remove('long-quote');
    quoteText.textContent = quote.text;
    // Only populate author if it's not blank
    authorText.textContent = !quote.author ? 'Unknown' : quote.author ;
    // complete; hide the loader
    removeLoadingSpinner();
}

// Get Quotes From API
async function getQuotes() {
    // Call the loader
    showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        showNewQuote();
    } catch(error){
        // Error handling
    }
}

// Tweet a quote 
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Twitter event Listeners
twitterBtn.addEventListener('click', tweetQuote);

// New Quote event
newQuoteBtn.addEventListener('click', showNewQuote);

// On Load
getQuotes();
