const quoteText = document.getElementById("quote")
const quoteAuthor = document.getElementById("author")
const quoteCard = document.getElementById("card")

const newQuote = document.getElementById("newquote")
const copy = document.getElementById("copy")
const tweet = document.getElementById("tweet")
const exportButton = document.getElementById("exportbutton")

// Renders the qutes into the screen
function displayQuote(obj) {
    quoteText.innerText = `"${obj.data.content}"`
    quoteAuthor.innerText = `- ${obj.data.author}`
}

// Fetchs the qoutes from the API
async function fetchQuote() {
    fetch('https://api.freeapi.app/api/v1/public/quotes/quote/random')
        .then((response) => response.json())
        .then(displayQuote)
        .catch(() => {
            quoteText.innerText = `"can not fethch the content"`
        })
        .finally(console.log("end"))
}

// Sets a random image behind the quote 
function setRandomBackground() {
    quoteCard.style.backgroundImage = "linear-gradient(rgba(182, 189, 219, 0.8),rgba(85, 85, 139, 0.8)), url('https://picsum.photos/2000')"
}

// Copies the Quote add in to the clipboard
function copyToClipboard() {
    const copytext = `${quoteText.innerText} ${quoteAuthor.innerText}`;
    navigator.clipboard.writeText(copytext).then(() => {
        alert("Quote copied to clipboard!")
    })

}

// It takes the quote directly to the Twitter post just have to hit post.
function shareOnTwitter() {
    const tweetUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(quoteText.innerText + " " + quoteAuthor.innerText)}`
    window.open(tweetUrl, '_blank')
}

// It saves a image of the quote
function exportImage() {
    html2canvas(quoteCard, { useCORS: true }).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "quote.png";
        link.click();
    });
}

// When ever we click new quote button it fires the feacthQuote and setRandomBackground function
newQuote.addEventListener('click', () => {
    fetchQuote()
    setRandomBackground()
})

// When ever browser loads the web page it fires the feacthQuote and setRandomBackground function
window.addEventListener("load", () => {
    fetchQuote()
    setRandomBackground()
});

// fires the copyToClipboard function
copy.addEventListener('click', copyToClipboard)

// fires the shareOnTwitter function
tweet.addEventListener('click', shareOnTwitter)

// fires the exportImage function
exportButton.addEventListener('click', exportImage)