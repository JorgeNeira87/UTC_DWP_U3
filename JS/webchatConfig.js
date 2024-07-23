fetch('https://mediafiles.botpress.cloud/69094edc-b20c-42f5-baf0-91145170a7e1/webchat/v2/theme.json')
.then(response => response.json())
.then(data => {
  window.botpress.init({
  "theme": data,
  "clientId": "acb1928f-fc43-4974-9b3d-52d765dedc1b",
  "botId": "69094edc-b20c-42f5-baf0-91145170a7e1",
  "style": "https://mediafiles.botpress.cloud/69094edc-b20c-42f5-baf0-91145170a7e1/webchat/v2/style.css",
  "configuration": {
    "botDescription": "Te puedo ayudar",
    "botName": "Web Coffe",
    "composerPlaceholder": "Hablame "
  }
});
})
.catch(e => {
  window.botpress.init({
  "clientId": "acb1928f-fc43-4974-9b3d-52d765dedc1b",
  "botId": "69094edc-b20c-42f5-baf0-91145170a7e1",
  "style": "https://mediafiles.botpress.cloud/69094edc-b20c-42f5-baf0-91145170a7e1/webchat/v2/style.css",
  "configuration": {
    "botDescription": "Te puedo ayudar",
    "botName": "Web Coffe",
    "composerPlaceholder": "Hablame "
  }
});
  console.error(e);
});
