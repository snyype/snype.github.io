document.getElementById('downloadButton').addEventListener('click', function () {
    const selectedGame = document.getElementById('selectGame').value;
    if (selectedGame !== '') {
      let filename = 'autoexec.cfg'; // Set the filename to 'autoexec.cfg'
  
      // Fetch the content for each game's autoexec.cfg using GitHub API
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
      // Replace ":owner", ":repo", and ":path" with your GitHub repository details.
      // For example: https://api.github.com/repos/yourusername/yourrepository/contents/csgo/autoexec.cfg
      const url = `https://api.github.com/repos/snyype/snyype.github.io/contents/${game}/autoexec.cfg`;
  
      // Perform the AJAX request to fetch the file content.
      fetch(url)
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
  