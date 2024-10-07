// Options script for Flight Flow Chrome Extension

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('optionsForm');
  const messageDiv = document.getElementById('message');

  // Load saved options
  chrome.storage.sync.get(['webhookUrl', 'theme'], function(items) {
    document.getElementById('webhookUrl').value = items.webhookUrl || '';
    document.getElementById('theme').value = items.theme || 'light';
  });

  // Save options
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const webhookUrl = document.getElementById('webhookUrl').value;
    const theme = document.getElementById('theme').value;

    chrome.storage.sync.set({
      webhookUrl: webhookUrl,
      theme: theme
    }, function() {
      messageDiv.textContent = 'Options saved successfully!';
      messageDiv.classList.add('text-green-500');
      setTimeout(() => {
        messageDiv.textContent = '';
        messageDiv.classList.remove('text-green-500');
      }, 3000);
    });
  });
});