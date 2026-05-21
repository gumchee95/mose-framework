// 核心设定
const SHEET_NAME = "Sheet1";

// ==========================================
// 1. Web App 路由 (前端展示)
// ==========================================
function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('UTAR Car Sticker Collection System')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

// ==========================================
// 2. 前端缓存同步 API (全量拉取)
// ==========================================
function getAllStudents() {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    if (!sheet) return { success: false, message: "Sheet1 not found!" };

    const data = sheet.getDataRange().getValues();
    if (data.length <= 1) return { success: true, data: [] };

    const headers = data[0];
    const colIdx = {
      id: headers.indexOf("Student ID"),
      name: headers.indexOf("Name"),
      vehicle: headers.indexOf("Vehicle Type"),
      vehicleNo: headers.indexOf("Vehicle No"),
      ballet: headers.indexOf("Ballet No"),
      serial: headers.indexOf("Serial Number"),
      trackingLog: headers.indexOf("Tracking Log")
    };

    if (colIdx.id === -1) return { success: false, message: "Column 'Student ID' not found in Sheet1." };

    let results = [];
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      if (String(row[colIdx.id]).trim() === "") continue; 
      
      results.push({
        rowIndex: i + 1, 
        studentId: String(row[colIdx.id]).trim().toUpperCase(),
        name: row[colIdx.name] || "N/A",
        vehicleType: row[colIdx.vehicle] || "N/A",
        vehicleNo: row[colIdx.vehicleNo] || "N/A",
        balletNo: row[colIdx.ballet] || "N/A",
        serialNumber: colIdx.serial !== -1 ? (row[colIdx.serial] ? String(row[colIdx.serial]) : "") : "",
        trackingLog: colIdx.trackingLog !== -1 ? (row[colIdx.trackingLog] ? String(row[colIdx.trackingLog]) : "") : ""
      });
    }
    return { success: true, data: results };
  } catch (err) {
    return { success: false, message: "System error: " + err.message };
  }
}

// ==========================================
// 3. 自动生成 Tracking Log (异步回写)
// ==========================================
function markAsCollected(rowIndex, studentId, serialNumber) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const trackingLogIdx = headers.indexOf("Tracking Log");
    const serialIdx = headers.indexOf("Serial Number");
    
    if (trackingLogIdx === -1 || serialIdx === -1) return { success: false, message: "Tracking Log or Serial Number column not found." };
    
    // 防错机制：检查 rowIndex 对应的是否真的是这个学生 (防止中间有人增删行导致错位)
    const currentId = String(sheet.getRange(rowIndex, headers.indexOf("Student ID") + 1).getValue()).trim().toUpperCase();
    if (currentId !== studentId) {
      // 如果行数对不上，重新执行一次全局搜索
      const data = sheet.getDataRange().getValues();
      let found = false;
      for (let i = 1; i < data.length; i++) {
        if (String(data[i][headers.indexOf("Student ID")]).trim().toUpperCase() === studentId) {
          rowIndex = i + 1;
          found = true;
          break;
        }
      }
      if (!found) return { success: false, message: "Student not found during write-back." };
    }

    // 写入精确到秒的 Timestamp 和 Serial Number
    const timestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm:ss");
    sheet.getRange(rowIndex, serialIdx + 1).setValue(serialNumber);
    sheet.getRange(rowIndex, trackingLogIdx + 1).setValue(timestamp);
    
    return { success: true, timestamp: timestamp, serialNumber: serialNumber };
  } catch(e) {
    return { success: false, message: e.message };
  }
}

// ==========================================
// 4. 后端自定义选单与流水发信逻辑
// ==========================================
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('🚗 Sticker System')
    .addItem('⚙️ Setup Sheet (Initialize)', 'setupSheet')
    .addSeparator()
    .addItem('📊 Generate & Email Report', 'generateAndSendReport')
    .addToUi();
}



// ==========================================
// 5. 生成与发送报告 (基于 Tracking Log 人性化判断)
// ==========================================
function generateAndSendReport() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet) return;

  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return;

  const headers = data[0];
  const trackingLogIdx = headers.indexOf("Tracking Log");

  if (trackingLogIdx === -1) {
    SpreadsheetApp.getUi().alert("Error: Missing 'Tracking Log' column.");
    return;
  }

  let collectedCount = 0;
  let notCollectedCount = 0;
  let totalCount = 0;

  for (let i = 1; i < data.length; i++) {
    if (data[i].join("").trim() === "") continue;
    
    totalCount++;
    const trackingLogVal = String(data[i][trackingLogIdx]).trim();
    
    // 逻辑：Tracking Log 为空代表没有来拿
    if (trackingLogVal !== "") {
      collectedCount++;
    } else {
      notCollectedCount++; 
    }
  }

  const reportText = `Sticker Collection Report:\n\n` +
                     `Total Records: ${totalCount}\n` +
                     `✅ Collected (已领取): ${collectedCount}\n` +
                     `❌ Not Collected (未领取): ${notCollectedCount}\n` +
                     `\nCollection Rate: ${totalCount > 0 ? ((collectedCount / totalCount) * 100).toFixed(1) : 0}%`;

  SpreadsheetApp.getUi().alert("Report Generated", reportText, SpreadsheetApp.getUi().ButtonSet.OK);

  const adminEmail = Session.getActiveUser().getEmail();
  if (adminEmail) {
    try {
      MailApp.sendEmail({
        to: adminEmail,
        subject: "📊 Daily Sticker Collection Report",
        body: reportText + "\n\nThis is an automated report generated from the UTAR Sticker System."
      });
      SpreadsheetApp.getActiveSpreadsheet().toast("Report sent to " + adminEmail, "Success");
    } catch (e) {}
  }
}

// ==========================================
// 6. 初始化与配置 Sheet
// ==========================================
function setupSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  
  const headers = [
    "No", 
    "Student ID", 
    "Name", 
    "Vehicle Type", 
    "Vehicle No",
    "Ballet No", 
    "Serial Number", 
    "Tracking Log" // 用 Tracking Log 替代原本冗余的 Status
  ];
  
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
  sheet.setFrozenRows(1);
  
  SpreadsheetApp.getUi().alert("Sheet initialized successfully!\nHeaders have been set in '" + SHEET_NAME + "'.");
}
