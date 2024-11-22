// Testing only
function sampleFunction() {
    console.log("Sample!")
}

// Get all months + years in videos
function getMonthsYears(videos) {
    var availableDates = []
    for (var i = 0, l = videos.length; i < l; i++) {
        var date = videos[i].date.split("-");

        // turns string date (mm-dd-yyyy to date object (f))
        var f = new Date(date[2], date[0] - 1, date[1]);

        // Pushes "mm-yyyy" as string into availableDates
        availableDates.push((f.getMonth() + 1).toString() + " " + f.getFullYear().toString())
        return availableDates
    }
}

// Group dates into Month, Year
function groupDates(videos) {
    const groupedDates = {};
    for (var z = 0, c = videos.length; z < c; z++) {
        const [month, day, year] = videos[z].date.split("-"); // Extract year, month, and day
        const key = `${month}-${year}`; // Create a unique month-year key

        if (!groupedDates[key]) {
            groupedDates[key] = { month, year, dates: [] }; // Initialize group
        }
        groupedDates[key].dates.push(videos[z]); // Add full date to the group
    }

    return groupedDates
}

// Function to search and return an array of videos given the array of all videos and a search query for names
function searchVidtags(videos, splitQuery) {
    const resultVideos = videos.filter((item) =>
        item.tags.length === splitQuery.length && // Ensure the number of tags is the same
        splitQuery.every((splitQuery) =>
            item.tags.some((tag) => tag.trim().toLowerCase().includes(splitQuery.trim().toLowerCase())) // Partial match after trimming spaces
        ) &&
        item.tags.every((tag) => splitQuery.some((splitQuery) => splitQuery.trim().toLowerCase().includes(tag.trim().toLowerCase()))) // Ensure only tags from searchTags are present after trimming spaces
    );
    return resultVideos
}

// Returns array of starring names from URL
function getStarringParams() {

    const queryString = window.location.search;
    console.log(queryString);

    const urlParams = new URLSearchParams(queryString);

    const searchQuery = urlParams.get('starring');
    console.log("searchQuery = " + searchQuery)

    const splitQuery = searchQuery.split(" ")
    splitQuery.pop()
    console.log(splitQuery)

    return splitQuery
}

// Returns game name from URL
function getGameURL() {

    const queryString = window.location.search;
    console.log(queryString);

    const urlParams = new URLSearchParams(queryString);

    const searchQuery = urlParams.get('game');
    console.log("searchQuery = " + searchQuery)

    return searchQuery
}

// Function that sorts videos to descending date
function sortDescending(videos) {
    // Sort videos by descending date
    videos.sort((a, b) => {
        //console.log("Sorting videos by descending date")
        return new Date(b.date) - new Date(a.date); // descending
    })
}

// Function that goes through videos and returns an array of unique games
function getGames(videos) {
    const games = [];
    const gameCount = {};

    videos.forEach(video => {
        const game = video.game; // Assuming the game is stored in the 'game' property

        if (game) {
            if (!gameCount[game]) {
                gameCount[game] = 1;  // If the game is encountered for the first time, initialize its count
                games.push({ game, count: gameCount[game] });
            } else {
                gameCount[game]++;  // Increment the count if the game is already encountered
                // Update the count in the existing game object in 'games' array
                games.forEach(item => {
                    if (item.game === game) {
                        item.count = gameCount[game];
                    }
                });
            }
        }
    });
    return games.sort((a, b) => b.count - a.count);;
}

// Displays games when passed an array of object {game, count}, arranged by count by default
function displayGames(games) {

    // Adds div to draw games in
    var addContainer = document.createElement("div")
    addContainer.className = "videoContainer"
    addContainer.class = "container"
    document.body.appendChild(addContainer)

    // Creating new row
    var newRow = document.createElement('row')
    newRow.className = 'row row-cols-auto'
    videoContainer.appendChild(newRow)

    // Loop through all games
    for (var p = 0, s = games.length; p < s; p++) {

        // Create the "a href" bit
        const newLink = document.createElement('a');
        newLink.href = "viewgame.html?game=" + games[p].game + ""

        // Create the div element for the video card
        const gameCard = document.createElement('div');
        gameCard.classList.add('game-card');
        newLink.appendChild(gameCard)

        // Create Col
        var newCol = document.createElement('div')
        newCol.className = 'col'

        // Create and add the image element (you can replace this with actual game images or a placeholder)
        const gameImage = document.createElement('img');
        gameImage.src = "gameart/" + games[p].game + "box.jpg";
        gameImage.alt = games[p].game;
        gameImage.classList.add('game-image');
        gameCard.appendChild(gameImage);

        // Create and add the title (game name)
        const title = document.createElement('h3');
        title.classList.add('game-title');
        title.textContent = games[p].game;
        gameCard.appendChild(title);

        // Create and add the viewers count
        const videosCount = document.createElement('p');
        videosCount.classList.add('game-count');
        videosCount.textContent = games[p].count + " videos";
        gameCard.appendChild(videosCount);

        // Append the new video card to the body (or another container)
        newCol.appendChild(newLink)
        newRow.appendChild(newCol);
    }
}


