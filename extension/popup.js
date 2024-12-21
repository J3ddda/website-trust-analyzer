document.getElementById('analyzeButton').addEventListener('click', async () => {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = "Analyzing... Please wait.";

    try {
        // Get the current active tab
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        const url = tab.url;

        console.log("Tab URL:", url); // Debugging log

        // Send the URL to the backend for analysis
        const response = await fetch("http://127.0.0.1:5000/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url }),
        });

        console.log("Response status:", response.status); // Debugging log

        if (!response.ok) {
            throw new Error(`Server responded with status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Response data:", data); // Debugging log

        resultsDiv.innerHTML = `<h2>Trust Score: ${data.score}</h2>
                                <p>${data.message}</p>`;
    } catch (error) {
        console.error("Error:", error); // Debugging log
        resultsDiv.innerHTML = `<p style="color:red;">Error analyzing the website. Please try again.</p>`;
    }
});
