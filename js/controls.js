const button = document.querySelector('button');

const checkStoredSettings = (storedSettings) => {
    if (storedSettings.enabled == null) {
      browser.storage.local.set({
          enabled: true
      });
      button.innerText = 'Disable';
    } else if (storedSettings.enabled) {
        button.innerText = 'Disable';
    } else if (!storedSettings.enabled) {
        button.innerText = 'Enable';
    } else {
        console.error('Enabled setting is not true.');
        button.innerText = `Error (value: ${storedSettings.enabled})`;
    }
}
  
const gettingStoredSettings = browser.storage.local.get();
gettingStoredSettings.then(checkStoredSettings, (e) => console.log(e));

button.addEventListener('click', () => {
    browser.storage.local.get().then(settings => {
        browser.storage.local.set({
            enabled: !settings.enabled
        });
        if (!settings.enabled == true) {
            button.innerText = 'Disable';
        } else {
            button.innerText = 'Enable';
        }
    });
});  

