document.addEventListener("DOMContentLoaded", () => {
    const quoteText = document.getElementById("quote")
    const quoteAuthor = document.getElementById("author")
    const quoteCard = document.getElementById("card")

    const newQuote = document.getElementById("newquote")
    const copy = document.getElementById("copy")
    const tweet = document.getElementById("tweet")
    const exportButton = document.getElementById("exportbutton")


    function displayQuote(obj) {
        quoteText.innerText = `"${obj.data.content}"`
        quoteAuthor.innerText = `- ${obj.data.author}`
    }

    async function fetchData() {
        fetch('https://api.freeapi.app/api/v1/public/quotes/quote/random')
            .then((response) => response.json())
            .then(displayQuote)
            .catch(() => {
                quoteText.innerText = `"can not fethch the content"`
            })
            .finally(console.log("end"))
    }

    

    function setRandomBackground(){
        quoteCard.style.backgroundImage = "linear-gradient(rgba(119, 127, 159, 0.8),rgba(122, 122, 126, 0.65)), url('https://picsum.photos/2000')"
    }

    function copyToClipboard() {
        const copytext = `${quoteText.innerText} ${quoteAuthor.innerText}`;
        navigator.clipboard.writeText(copytext).then(() => {
            alert("Quote copied to clipboard!")
        })

    }

    function shareOnTwitter() {
        const tweetUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(quoteText.innerText + " " + quoteAuthor.innerText)}`
        window.open(tweetUrl, '_blank')
    }



    function exportImage() {
        html2canvas(quoteCard, { useCORS: true }).then((canvas) => {
            const link = document.createElement("a");
            link.href = canvas.toDataURL("image/png");
            link.download = "quote.png";
            link.click();
        });
    }

    newQuote.addEventListener('click', () => {
        fetchData()
        setRandomBackground()
    })

    window.addEventListener("load", () => {
        fetchData()
        setRandomBackground()
    });

    copy.addEventListener('click', copyToClipboard)
    tweet.addEventListener('click', shareOnTwitter)
    exportButton.addEventListener('click', exportImage)
})