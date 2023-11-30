// Steg 1. Gör en fetch till 'https://api.sr.se/api/v2/channels/?format=json'

// Steg 2. loopa med tex forEach över data.channels - ta ut data och visa på html-sidan.

// Steg 3. ta ut liveaudio.url från varje kanal och lägg i en audio tagg.
// <audio controls>
//   <source src="" type="audio/mpeg" />
// </audio>

document.addEventListener('DOMContentLoaded', function () {
//Denna kod säkerställer att JavaScript bara körs efter att HTML-dokumentet har laddats helt.
  const apiUrl = 'http://api.sr.se/api/v2/channels?format=json&size=100';
  //Denna variabel innehåller URL:en till Sveriges Radios API-slutpunkt.

  // Hämta data från Sveriges Radios API
  fetch(apiUrl)  //Initierar en nätverksbegäran till den angivna URL:en.
    .then(response => response.json())  //Kedjer ett löfte om att hantera JSON-tolkningen av svaret. Metoden response.json() returnerar ett löfte.
    .then(data => {  //Hanterar data som erhålls från API:t efter att den har hämtats.
      
      //Tar de första 10 kanalerna från data för bearbetning.
      const channels = data.channels.slice(0, 10);
      /*const channels = data.channel; // Koden läser alla channelen  */

      // Loopen itererar genom varje kanal i kanalarrayen.
      channels.forEach(channel => {
        const channelCard = createChannelCard(channel);  //För att anropar createChannelCard-funktionen för att generera ett kanalkort baserat på kanaldata.
        document.getElementById('channels').appendChild(channelCard); //För att lägga till det skapade kanalkortet till HTML-dokumentets brödtext.
      });
    })
    .catch(error => console.error('Error fetching data:', error));

  // Denna funktion är ansvarig för att skapa ett kanalkort baserat på den tillhandahållna kanaldata.
  function createChannelCard(channel) {      
    const channelCard = document.createElement('div');  // För att skapa ett nytt <div>-element för att representera ett kanalkort.
    channelCard.className = 'channel-card';  //För att ställa in klassattributet för kanalkortet för att tillämpa stilar definierade i CSS.

    // För att skapa ett nytt <img>-element för att visa kanalbilden.
    const channelImage = document.createElement('img');
    channelImage.src = channel.image;   //För att ställa in källattributet för bilden till den URL som anges i kanaldata.
    channelImage.alt = channel.name;  //För att ställa in den alternativa texten i bilden till kanalnamnet.
    channelImage.className = 'channel-image';  //För att ställa in klassattributet för bilden för styling.

    // För att skapa ett nytt <div>-element för att hålla kanalinformation.
    const channelInfo = document.createElement('div');
    // För att ställa in klassattributet för kanalinformationen.
    channelInfo.className = 'channel-info';

    // För att skapa ett nytt <div>-element för att visa kanalnamnet.
    const channelName = document.createElement('div');
    // För att ställa in klassattributet för kanalnamnet.
    channelName.className = 'channel-name';
    // För att ställa in textinnehållet i kanalnamnet till det namn som anges i kanaldata.
    channelName.textContent = channel.name;

    // För att skapa ett nytt <audio>-element för liveljudströmmen.
    const audioTag = document.createElement('audio');
    audioTag.controls = true;  //För att ställa in kontrollernas attribut för att visa ljudkontroller.
    audioTag.src = channel.liveaudio.url;  // För att ställa in källattributet för ljudelementet till webbadressen för liveljudström.
    audioTag.className = 'audio-tag';   //För att ställa in klassattributet för styling.

    // Lägg till kanalnamnet och ljudtaggen till kanalinformationen
    channelInfo.appendChild(channelName);  //För att lägga till kanalnamnet till kanalinformationen.
    channelInfo.appendChild(audioTag);   //För att lägga till ljudtaggen till kanalinformationen.

    // Lägg till kanalbilden och kanalinformationen till kanalkortet
    channelCard.appendChild(channelImage);  //För att lägga till kanalbilden till kanalkortet.
    channelCard.appendChild(channelInfo);  //För att lägga till kanalinformationen till kanalkortet.

    // Returnera det skapade kanalkortet
    return channelCard;
    }
    
  });
  





