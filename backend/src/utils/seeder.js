const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const Student = require('../models/student.model');

// If score is empty string or null, return null; else parseFloat
const parseScore = (value) => {
  if (!value || value.trim() === '') return null;
  const score = parseFloat(value);
  return isNaN(score) ? null : score;
};

async function seedData() {
  const filePath = path.join(__dirname, '../../data/diem_thi_thpt_2024.csv');
  
  // Check CSV
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Không tìm thấy file CSV tại đường dẫn: ${filePath}`);
    return;
  }

  return new Promise((resolve, reject) => {
    let chunk = [];
    const CHUNK_SIZE = 5000; // Insert 5000 rows at a time
    let totalRows = 0;

    console.time('⏱️ Thời gian import');
    console.log('🚀 Bắt đầu đọc file CSV và import vào PostgreSQL...');

    const stream = fs.createReadStream(filePath).pipe(csv());

    stream.on('data', async (row) => {
      const studentData = {
        sbd: row.sbd ? row.sbd.trim() : '',
        toan: parseScore(row.toan),
        ngu_van: parseScore(row.ngu_van),
        ngoai_ngu: parseScore(row.ngoai_ngu),
        vat_li: parseScore(row.vat_li),
        hoa_hoc: parseScore(row.hoa_hoc),
        sinh_hoc: parseScore(row.sinh_hoc),
        lich_su: parseScore(row.lich_su),
        dia_li: parseScore(row.dia_li),
        gdcd: parseScore(row.gdcd),
        ma_ngoai_ngu: row.ma_ngoai_ngu ? row.ma_ngoai_ngu.trim() : null
        };

      //SBD validate
      if (studentData.sbd) {
        chunk.push(studentData);
      }

      //When chunk reaches CHUNK_SIZE, bulk insert and reset chunk
      if (chunk.length === CHUNK_SIZE) {
        stream.pause(); // Pause reading to avoid memory overload
        
        const currentChunk = [...chunk];
        chunk = []; // Reset chunk

        try {
          await Student.bulkCreate(currentChunk);
          totalRows += currentChunk.length;
          console.log(`⏳ Đã import thành công: ${totalRows} thí sinh...`);
        } catch (err) {
          console.error('❌ Lỗi khi bulk insert cụm dữ liệu:', err.message);
        }

        stream.resume(); // Resume reading after bulk insert
      }
    });

    stream.on('end', async () => {
      // Insert the remaining rows in the last chunk
      if (chunk.length > 0) {
        try {
          await Student.bulkCreate(chunk);
          totalRows += chunk.length;
        } catch (err) {
          console.error('❌ Lỗi khi bulk insert cụm dữ liệu cuối:', err.message);
        }
      }
      console.log(`\n✅ HOÀN THÀNH! Tổng số thí sinh đã import: ${totalRows}`);
      console.timeEnd('⏱️ Thời gian import');
      resolve();
    });

    stream.on('error', (err) => {
      console.error('❌ Lỗi trong quá trình đọc file:', err);
      reject(err);
    });
  });
}

module.exports = { seedData };