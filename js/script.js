// I have created this extension because of the many times I have forgoten to click All Assignments which has caused
// me to skip over tests and quizzes. If you're reading this Pearson, 
// please give us an option to choose this by default. Thanks :)

const checkStoredSettings = (storedSettings) => {
    if (storedSettings.enabled == null) {
        browser.storage.local.set({
            enabled: true
        });
    }
}

const gettingStoredSettings = browser.storage.local.get();
gettingStoredSettings.then(checkStoredSettings, (e) => console.log(e));

// wait half a ms for storage to update :)

setTimeout(function () {
    browser.storage.local.get().then(settings => {
        console.log(settings);
        // Query the dropdown
        const dropdown = document.getElementById('All_Assignments');
        // Check to see if the dropdown exists
        if (dropdown != null && settings.enabled) {
            dropdown.click();
    
            // Get all the a tags
            const a_tags = document.querySelectorAll('a');
            // loop through them
            a_tags.forEach(a => {
                // check to see if this a tag has a label and if it does, assign it to the variable
                const label = ((a.hasAttribute('aria-label')) ? a.getAttribute('aria-label') : null);
    
                // Check to see if the label is defined and it starts w/ "All Assignments"
                if (label && label.startsWith('All Assignments')) {
                    a.click();
                }
            });
    
            dropdown.click();
        }
    }).catch(e => {
        console.log(e);
    });
}, 500);

