/**
 * ============================================================
 * SYMPOLAR — GOOGLE APPS SCRIPT
 * Author: Vincent Gonzalez
 * © 2026 SymPolar LLC. All Rights Reserved.
 * Created: 2026-03-07  |  Updated: 2026-03-08
 *
 * Fix: Dual-path payload extraction —
 *   Path A: e.parameter.payload  (FormData POST — survives Google redirect)
 *   Path B: e.postData.contents  (raw JSON body — fallback)
 * If neither path yields valid JSON, logs full event object for debugging.
 * ============================================================
 */

var SHEET_ID        = '1TJr8XW9-P4XhamtOxoDZK2546lSru8rpnrBxZhlyFdU';
var DRIVE_FOLDER_ID = '1Dt1a6QoAxXgd7Rez9_X09yalJ1Ltbeta';
var NOTIFY_EMAIL    = 'sympolarllc@gmail.com';

var COLUMNS = [
  'Timestamp','Name','Phone','Email','Best_Contact_Time','Preferred_Contact',
  'Business_Name','Industry','Location','Years_In_Business','Tagline','Business_Description',
  'Current_Website','Address','Public_Phone','Public_Email','Hours','Service_Area',
  'Services_Menu','Show_Pricing','Age_Restriction','Pages','Brand_Colors','Style',
  'Inspiration','Avoid','Instagram','Facebook','Google_Business','Other_Social',
  'Owner_Bio','Owner_Display_Name','Years_Experience','Awards','Certifications',
  'Testimonials','Review_Links','Asset_Link','Media_Description','Brand_Tone',
  'Target_Audience','Key_Messages','Concerns','Extra_Notes','Files_Uploaded','Drive_Folder_Link'
];

// ── MAIN HANDLER ─────────────────────────────────────────────────────────────
function doPost(e) {
  try {

    // ── DUAL-PATH PAYLOAD EXTRACTION ─────────────────────────────────────────
    // Path A — FormData POST (primary): the HTML sends payload as a FormData
    // field named "payload". This survives Google's 302 redirect because the
    // browser re-encodes the FormData on the redirected destination.
    // Path B — Raw JSON body (fallback): catches any future callers that send
    // a plain application/json body instead of FormData.
    var raw = null;

    if (e.parameter && e.parameter.payload) {
      // Path A: FormData field
      raw = e.parameter.payload;
      console.log('Payload source: FormData (e.parameter.payload)');
    } else if (e.postData && e.postData.contents) {
      // Path B: Raw JSON body
      raw = e.postData.contents;
      console.log('Payload source: raw body (e.postData.contents)');
    } else {
      // Neither path worked — dump everything we have for diagnosis
      console.error('No payload found. Full event dump:');
      console.error('e.parameter: '  + JSON.stringify(e.parameter));
      console.error('e.postData: '   + JSON.stringify(e.postData));
      console.error('e.parameters: ' + JSON.stringify(e.parameters));
      throw new Error('No payload received. Check browser network tab and Apps Script logs.');
    }

    // Log the first 300 chars so we can confirm shape without overwhelming logs
    console.log('Raw payload preview: ' + raw.substring(0, 300));

    // ── PARSE ─────────────────────────────────────────────────────────────────
    var data   = JSON.parse(raw);
    var fields = data.fields   || {};
    var files  = data.files    || [];
    var form   = data.formType || 'Signup';

    // ── 1. CREATE CLIENT DRIVE FOLDER ─────────────────────────────────────────
    var clientName   = fields.Name || fields.Business_Name || 'Unknown_Client';
    var timestamp    = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd_HH-mm');
    var folderName   = clientName.replace(/[^a-zA-Z0-9 _-]/g, '').trim() + ' — ' + timestamp;
    var parentFolder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
    var clientFolder = parentFolder.createFolder(folderName);
    var folderLink   = clientFolder.getUrl();

    // ── 2. SAVE UPLOADED FILES ────────────────────────────────────────────────
    var savedFiles = [];
    for (var i = 0; i < files.length; i++) {
      try {
        var f       = files[i];
        var decoded = Utilities.base64Decode(f.data);
        var blob    = Utilities.newBlob(decoded, f.type, f.name);
        clientFolder.createFile(blob);
        savedFiles.push(f.name);
        console.log('Saved file: ' + f.name + ' (' + f.type + ')');
      } catch (fileErr) {
        // Log the error but don't let one bad file kill the whole submission
        savedFiles.push(f.name + ' (error: ' + fileErr.message + ')');
        console.error('File save error for ' + f.name + ': ' + fileErr.message);
      }
    }

    // ── 3. WRITE HEADER ROW IF SHEET IS EMPTY ────────────────────────────────
    var sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(COLUMNS);
      var headerRange = sheet.getRange(1, 1, 1, COLUMNS.length);
      headerRange.setBackground('#060f1a');
      headerRange.setFontColor('#87ceeb');
      headerRange.setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    // ── 4. BUILD AND APPEND DATA ROW ──────────────────────────────────────────
    var row = COLUMNS.map(function(col) {
      if (col === 'Timestamp')         return new Date();
      if (col === 'Files_Uploaded')    return savedFiles.length > 0 ? savedFiles.join(', ') : 'None';
      if (col === 'Drive_Folder_Link') return folderLink;
      return fields[col] || '';
    });
    sheet.appendRow(row);

    // Auto-resize columns only on early rows to keep performance reasonable
    if (sheet.getLastRow() <= 5) {
      sheet.autoResizeColumns(1, COLUMNS.length);
    }

    // ── 5. SEND NOTIFICATION EMAIL ────────────────────────────────────────────
    sendNotification(fields, savedFiles, folderLink, form);

    console.log('SUCCESS — row written for: ' + clientName + ' | files: ' + savedFiles.length);

    // Return JSON even though no-cors mode means the browser won't read it —
    // this is useful for testDoPost() and any future non-browser callers.
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok', folder: folderLink }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    // Log everything — visible in Apps Script → Executions log
    console.error('doPost ERROR: ' + err.message);
    console.error('Stack: ' + err.stack);
    console.error('e.parameter dump: '  + JSON.stringify(e.parameter));
    console.error('e.postData dump: '   + (e.postData ? e.postData.contents : 'none'));

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ── GET HANDLER ───────────────────────────────────────────────────────────────
// Useful for confirming the script is deployed and reachable
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status:    'ok',
      message:   'Sympolar form endpoint is live.',
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── EMAIL NOTIFICATION ────────────────────────────────────────────────────────
function sendNotification(fields, savedFiles, folderLink, formType) {
  try {
    var name     = fields.Name              || '(not provided)';
    var phone    = fields.Phone             || '(not provided)';
    var email    = fields.Email             || '(not provided)';
    var bestTime = fields.Best_Contact_Time || '(not provided)';
    var bizName  = fields.Business_Name     || '(not provided)';
    var industry = fields.Industry          || '(not provided)';
    var location = fields.Location          || '(not provided)';

    var subject = '🐻‍❄️ New Sympolar Signup — ' + name +
                  (bizName !== '(not provided)' ? ' · ' + bizName : '');

    var body = [
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      'NEW CLIENT SIGNUP — SYMPOLAR',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      '',
      '👤  NAME:      ' + name,
      '📞  PHONE:     ' + phone,
      '📧  EMAIL:     ' + email,
      '⏰  BEST TIME: ' + bestTime,
      '',
      '🏢  BUSINESS:  ' + bizName,
      '🏭  INDUSTRY:  ' + industry,
      '📍  LOCATION:  ' + location,
      '',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    ];

    var optionals = [
      ['Tagline','Tagline'],['Services_Menu','Services'],['Pages','Pages Wanted'],
      ['Style','Style'],['Brand_Tone','Brand Tone'],['Instagram','Instagram'],
      ['Facebook','Facebook'],['Owner_Bio','Bio'],['Awards','Awards'],
      ['Testimonials','Testimonials'],['Target_Audience','Target Audience'],['Concerns','Concerns'],
    ];
    optionals.forEach(function(pair) {
      if (fields[pair[0]] && fields[pair[0]].trim()) {
        body.push(pair[1] + ': ' + fields[pair[0]].substring(0, 200));
      }
    });

    body.push('');
    body.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    body.push('📁  FILES:  ' + (savedFiles.length > 0 ? savedFiles.join(', ') : 'None'));
    body.push('🔗  FOLDER: ' + folderLink);
    body.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    body.push('');
    body.push('sympolar.com · sympolarllc@gmail.com');
    body.push('© 2026 SymPolar LLC. All Rights Reserved.');

    MailApp.sendEmail({ to: NOTIFY_EMAIL, subject: subject, body: body.join('\n') });
    console.log('Notification email sent to: ' + NOTIFY_EMAIL);

  } catch (mailErr) {
    // Email failure is non-fatal — data is already in the sheet
    console.error('Email notification failed: ' + mailErr.message);
  }
}

// ── TEST FUNCTIONS ────────────────────────────────────────────────────────────
// Run testSetup() first to confirm Sheet ID and Drive folder are accessible.
function testSetup() {
  try {
    var sheet  = SpreadsheetApp.openById(SHEET_ID);
    var folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
    Logger.log('✓ Sheet found: '       + sheet.getName());
    Logger.log('✓ Drive folder found: ' + folder.getName());
    Logger.log('✓ Notify email: '      + NOTIFY_EMAIL);
    Logger.log('✓ Setup looks good.');
  } catch (err) {
    Logger.log('✗ Error: ' + err.message);
  }
}

// Run testDoPost() to simulate a full form submission without a browser.
// Check Apps Script → Executions to see the result.
function testDoPost() {
  var fakeEvent = {
    parameter: {
      payload: JSON.stringify({
        formType: 'Signup',
        fields: {
          Name:              'Test User',
          Phone:             '555-1234',
          Email:             'test@test.com',
          Best_Contact_Time: 'Morning (8am–12pm)',
          Business_Name:     'Test Biz LLC',
          Industry:          'Testing'
        },
        files: []
      })
    },
    postData: null
  };
  var result = doPost(fakeEvent);
  Logger.log('testDoPost result: ' + result.getContent());
}
