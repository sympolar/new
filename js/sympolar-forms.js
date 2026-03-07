/**
 * SYMPOLAR FORMS
 *
 * SETUP — do this ONE time, takes 2 minutes:
 *
 *   1. On your phone or computer, go to:
 *      https://script.google.com/create
 *
 *   2. You'll see a blank code editor. Delete everything in it.
 *
 *   3. Open the file called GOOGLE_SCRIPT.js (included in this folder)
 *      and copy ALL of it. Paste it into that editor.
 *
 *   4. Click the blue "Deploy" button (top right)
 *      → "New deployment"
 *      → click the gear icon next to "Type" → pick "Web app"
 *      → "Execute as" = Me
 *      → "Who has access" = Anyone
 *      → click Deploy
 *      → click "Authorize access" and sign in with sympolarllc@gmail.com
 *      → copy the URL it shows you (starts with https://script.google.com/macros...)
 *
 *   5. Paste that URL below, replacing the placeholder text.
 *
 * That's it. Forms will email you AND save to Google Sheets.
 */

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbysVU1uv90wsNCAW-5LHw9xPZZb1ZTthRSDtClNoEsdVi9L_PJdQsw9Wh45qp6wqEkMfQ/exec';

// ── FILE UPLOAD ZONE ──────────────────────────────────────────
function initUploadZone(zoneId, inputId, listId) {
  const zone  = document.getElementById(zoneId);
  const input = document.getElementById(inputId);
  const list  = document.getElementById(listId);
  if (!zone || !input || !list) return;
  zone.addEventListener('dragover',  e => { e.preventDefault(); zone.classList.add('drag-over'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
  zone.addEventListener('drop', e => {
    e.preventDefault();
    zone.classList.remove('drag-over');
    addFiles(e.dataTransfer.files, input, list);
  });
  input.addEventListener('change', () => addFiles(input.files, input, list));
}

function addFiles(newFiles, input, list) {
  const dt = new DataTransfer();
  if (input._staged) input._staged.forEach(f => dt.items.add(f));
  Array.from(newFiles).forEach(f => dt.items.add(f));
  input._staged = Array.from(dt.files);
  renderFileList(input._staged, input, list);
}

function removeFile(index, inputId, listId) {
  const input = document.getElementById(inputId);
  const list  = document.getElementById(listId);
  input._staged.splice(index, 1);
  renderFileList(input._staged, input, list);
}

function renderFileList(files, input, list) {
  list.innerHTML = '';
  files.forEach((f, i) => {
    const chip = document.createElement('div');
    chip.className = 'file-chip';
    chip.innerHTML = `
      <span style="font-size:15px;">${fileIcon(f.name)}</span>
      <span class="fname">${f.name}</span>
      <span class="fsize">${fmtSize(f.size)}</span>
      <span class="fremove" onclick="removeFile(${i},'${input.id}','${list.id}')" title="Remove">✕</span>`;
    list.appendChild(chip);
  });
}

function fileIcon(n) {
  const e = n.split('.').pop().toLowerCase();
  if (['jpg','jpeg','png','gif','webp','svg','heic'].includes(e)) return '🖼';
  if (e === 'pdf') return '📄';
  if (['ai','eps','psd'].includes(e)) return '🎨';
  if (['doc','docx','txt'].includes(e)) return '📝';
  if (['zip','rar'].includes(e)) return '📦';
  return '📎';
}

function fmtSize(b) {
  if (b < 1024) return b + ' B';
  if (b < 1048576) return (b/1024).toFixed(1) + ' KB';
  return (b/1048576).toFixed(1) + ' MB';
}

// ── COLLECT FIELDS ────────────────────────────────────────────
function collectFields(formId) {
  const data = {};
  document.getElementById(formId).querySelectorAll('input,select,textarea').forEach(el => {
    if (!el.name || el.type === 'file') return;
    if (el.type === 'radio' && !el.checked) return;
    if (el.type === 'checkbox') {
      if (el.checked) data[el.name] = data[el.name] ? data[el.name] + ', ' + el.value : el.value;
      return;
    }
    if (el.value.trim()) data[el.name] = el.value.trim();
  });
  return data;
}

// ── COLLECT FILES ─────────────────────────────────────────────
async function collectFiles(...ids) {
  const all = [];
  for (const id of ids) {
    const input = document.getElementById(id);
    if (!input) continue;
    for (const file of (input._staged || [])) {
      try {
        const b64 = await new Promise((res, rej) => {
          const r = new FileReader();
          r.onload  = () => res(r.result.split(',')[1]);
          r.onerror = rej;
          r.readAsDataURL(file);
        });
        all.push({ name: file.name, type: file.type || 'application/octet-stream', data: b64 });
      } catch(e) { console.warn('skipped file', file.name); }
    }
  }
  return all;
}

// ── SUBMIT ────────────────────────────────────────────────────
async function submitToSympolar(formType, fields, files, btnId, progWrapId, progFillId, statusId, formBodyId, successId) {
  const btn    = document.getElementById(btnId);
  const wrap   = document.getElementById(progWrapId);
  const fill   = document.getElementById(progFillId);
  const status = document.getElementById(statusId);

  if (GOOGLE_SCRIPT_URL === 'PASTE_THE_URL_FROM_STEP_4_HERE') {
    alert('Almost ready! Open js/sympolar-forms.js and paste your Google Script URL at the top. See SETUP instructions inside that file.');
    return;
  }

  btn.disabled = true;
  btn.textContent = 'Sending…';
  wrap.style.display = 'block';
  status.style.display = 'block';
  status.textContent = files.length ? `Uploading ${files.length} file(s)…` : 'Saving…';

  let pct = 0;
  const tick = setInterval(() => { pct = Math.min(pct + (files.length ? 1.5 : 6), 88); fill.style.width = pct + '%'; }, 100);

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ formType, fields, files })
    });
    clearInterval(tick);
    fill.style.width = '100%';
    status.textContent = 'Sent ✓';
    setTimeout(() => {
      document.getElementById(formBodyId).style.display = 'none';
      document.getElementById(successId).style.display  = 'block';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 400);
  } catch(err) {
    clearInterval(tick);
    btn.disabled = false;
    btn.textContent = 'Try Again →';
    fill.style.width = '0%';
    fill.style.background = 'var(--coral)';
    status.textContent = 'Connection error — check your internet and try again.';
  }
}
