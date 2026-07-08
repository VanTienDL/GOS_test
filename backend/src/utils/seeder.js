const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const Student = require('../models/student.model');

// Hàm bổ trợ: Nếu chuỗi rỗng hoặc undefined thì trả về null, ngược lại biến thành số Float
const parseScore = (value) => {
  if (!value || value.trim() === '') return null;
  const score = parseFloat(value);
  return isNaN(score) ? null : score;
};

async function seedData() {
  const filePath = path.join(__dirname, '../../data/diem_thi_thpt_2024.csv');
  
  // Kiểm tra file csv có tồn tại không
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Không tìm thấy file CSV tại đường dẫn: ${filePath}`);
    return;
  }

  return new Promise((resolve, reject) => {
    let chunk = [];
    const CHUNK_SIZE = 5000; // Gom 5000 dòng insert 1 lần
    let totalRows = 0;

    console.time('⏱️ Thời gian import');
    console.log('🚀 Bắt đầu đọc file CSV và import vào PostgreSQL...');

    const stream = fs.createReadStream(filePath).pipe(csv());

    stream.on('data', async (row) => {
      // Ánh xạ chuẩn theo các cột trong CSV của cậu
      const studentData = {
        sbd: row.sbd ? row.sbd.trim() : '',
        toan: parseScore(row.toan),
        ngu_van: parseScore(row.ngu_van), // Khớp với model mới
        ngoai_ngu: parseScore(row.ngoai_ngu),
        vat_li: parseScore(row.vat_li),   // Khớp với model mới
        hoa_hoc: parseScore(row.hoa_hoc),
        sinh_hoc: parseScore(row.sinh_hoc),
        lich_su: parseScore(row.lich_su),
        dia_li: parseScore(row.dia_li),   // Khớp với model mới
        gdcd: parseScore(row.gdcd),
        ma_ngoai_ngu: row.ma_ngoai_ngu ? row.ma_ngoai_ngu.trim() : null
        };

      // Thắt chặt logic: SBD phải có giá trị mới insert
      if (studentData.sbd) {
        chunk.push(studentData);
      }

      // Khi đạt đủ kích thước chunk, tạm dừng stream để ghi vào DB
      if (chunk.length === CHUNK_SIZE) {
        stream.pause(); // Tạm dừng đọc tiếp file để giải phóng bộ nhớ
        
        const currentChunk = [...chunk];
        chunk = []; // Reset chunk ngay lập tức

        try {
          await Student.bulkCreate(currentChunk);
          totalRows += currentChunk.length;
          console.log(`⏳ Đã import thành công: ${totalRows} thí sinh...`);
        } catch (err) {
          console.error('❌ Lỗi khi bulk insert cụm dữ liệu:', err.message);
        }

        stream.resume(); // Ghi xong thì đọc tiếp
      }
    });

    stream.on('end', async () => {
      // Insert nốt số lượng hàng còn dư lại ở chunk cuối cùng
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