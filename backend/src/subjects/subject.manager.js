const Subject = require('./subject.base');

// Sử dụng tính chất kế thừa và đa hình của OOP
class MathSubject extends Subject { constructor() { super('Toán', 'toan'); } }
class LiteratureSubject extends Subject { constructor() { super('Ngữ Văn', 'ngu_van'); } }
class ForeignLanguageSubject extends Subject { constructor() { super('Ngoại Ngữ', 'ngoai_ngu'); } }
class PhysicsSubject extends Subject { constructor() { super('Vật Lý', 'vat_li'); } }
class ChemistrySubject extends Subject { constructor() { super('Hóa Học', 'hoa_hoc'); } }
class BiologySubject extends Subject { constructor() { super('Sinh Học', 'sinh_hoc'); } }
class HistorySubject extends Subject { constructor() { super('Lịch Sử', 'lich_su'); } }
class GeographySubject extends Subject { constructor() { super('Địa Lý', 'dia_li'); } }
class CivicEducationSubject extends Subject { constructor() { super('GDCD', 'gdcd'); } }

// Gom toàn bộ các môn học vào một danh sách quản lý tập trung
const availableSubjects = [
  new MathSubject(),
  new LiteratureSubject(),
  new ForeignLanguageSubject(),
  new PhysicsSubject(),
  new ChemistrySubject(),
  new BiologySubject(),
  new HistorySubject(),
  new GeographySubject(),
  new CivicEducationSubject()
];

module.exports = { availableSubjects };