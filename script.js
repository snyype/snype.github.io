// JavaScript with updated GitHub API URL
document.getElementById('downloadButton').addEventListener('click', function () {
    const selectedGame = document.getElementById('selectGame').value;
    if (selectedGame !== '') {
      let filename = 'autoexec.cfg';
  
      // Fetch the content for each game's autoexec.cfg using the GitHub API
      fetchFileContent(selectedGame)
        .then((fileContent) => {
          downloadFile(filename, fileContent);
  
          // Update the text to show the selected game
          const selectedGameText = document.getElementById('selectedGameText');
          selectedGameText.textContent = `Selected Game: ${selectedGame.toUpperCase()}`;
        })
        .catch((error) => {
          console.error(error);
        });
    }
  });
  
  function fetchFileContent(game) {
    return new Promise((resolve, reject) => {
      // Replace 'snyype' with your GitHub username and 'snyype.github.io' with your repository name
      const apiUrl = `https://api.github.com/repos/snyype/snyype.github.io/contents/${game}/autoexec.cfg`;
  
      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error('File not found or server error');
          }
          return response.json();
        })
        .then((data) => {
          // The file content will be encoded in base64, so decode it.
          const decodedContent = atob(data.content);
          resolve(decodedContent);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  
  function downloadFile(filename, text) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
  

  // launch options

  // JavaScript with updated code to show launch options for each game
document.getElementById('showButton').addEventListener('click', function () {
    const selectedGame = document.getElementById('selectGameLaunchOption').value;
    if (selectedGame !== '') {
      // Fetch the launch options for the selected game
      const launchOptions = getLaunchOptions(selectedGame);
  
      // Display the launch options in the <p> tag
      const selectedGameLaunchOption = document.getElementById('selectedGameLaunchOption');
      selectedGameLaunchOption.textContent = `Launch Options for ${selectedGame.toUpperCase()}:  ${launchOptions}`;
    }
  });
  
  function getLaunchOptions(game) {
    // Replace the following object with the launch options for each game
    const launchOptionsMap = {
      csgo: "-novid -high -refresh 144 +exec autoexec.cfg",
      valorant: "N/A",
      dota: "-dx11 -console -refresh 144"
    };
  
    return launchOptionsMap[game] || "No launch options available for this game.";
  }
  