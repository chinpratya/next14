const listProvinces = [
  {
    ProvinceID: 10,
    ProvinceThai: 'กรุงเทพมหานคร',
    ProvinceEng: 'Bangkok',
    Region: 'ภาคกลาง',
  },
  {
    ProvinceID: 11,
    ProvinceThai: 'สมุทรปราการ',
    ProvinceEng: 'Samut Prakan',
    Region: 'ภาคกลาง',
  },
  {
    ProvinceID: 12,
    ProvinceThai: 'นนทบุรี',
    ProvinceEng: 'Nonthaburi',
    Region: 'ภาคกลาง',
  },
  {
    ProvinceID: 13,
    ProvinceThai: 'ปทุมธานี',
    ProvinceEng: 'Pathum Thani',
    Region: 'ภาคกลาง',
  },
  {
    ProvinceID: 14,
    ProvinceThai: 'พระนครศรีอยุธยา',
    ProvinceEng: 'Phra Nakhon Si Ayutthaya',
    Region: 'ภาคกลาง',
  },
  {
    ProvinceID: 15,
    ProvinceThai: 'อ่างทอง',
    ProvinceEng: 'Ang Thong',
    Region: 'ภาคกลาง',
  },
  {
    ProvinceID: 16,
    ProvinceThai: 'ลพบุรี',
    ProvinceEng: 'Lop Buri',
    Region: 'ภาคกลาง',
  },
  {
    ProvinceID: 17,
    ProvinceThai: 'สิงห์บุรี',
    ProvinceEng: 'Sing Buri',
    Region: 'ภาคกลาง',
  },
  {
    ProvinceID: 18,
    ProvinceThai: 'ชัยนาท',
    ProvinceEng: 'Chai Nat',
    Region: 'ภาคกลาง',
  },
  {
    ProvinceID: 19,
    ProvinceThai: 'สระบุรี',
    ProvinceEng: 'Saraburi',
    Region: 'ภาคกลาง',
  },
  {
    ProvinceID: 20,
    ProvinceThai: 'ชลบุรี',
    ProvinceEng: 'Chon Buri',
    Region: 'ภาคตะวันออก',
  },
  {
    ProvinceID: 21,
    ProvinceThai: 'ระยอง',
    ProvinceEng: 'Rayong',
    Region: 'ภาคตะวันออก',
  },
  {
    ProvinceID: 22,
    ProvinceThai: 'จันทบุรี',
    ProvinceEng: 'Chanthaburi',
    Region: 'ภาคตะวันออก',
  },
  {
    ProvinceID: 23,
    ProvinceThai: 'ตราด',
    ProvinceEng: 'Trat',
    Region: 'ภาคตะวันออก',
  },
  {
    ProvinceID: 24,
    ProvinceThai: 'ฉะเชิงเทรา',
    ProvinceEng: 'Chachoengsao',
    Region: 'ภาคตะวันออก',
  },
  {
    ProvinceID: 25,
    ProvinceThai: 'ปราจีนบุรี',
    ProvinceEng: 'Prachin Buri',
    Region: 'ภาคตะวันออก',
  },
  {
    ProvinceID: 26,
    ProvinceThai: 'นครนายก',
    ProvinceEng: 'Nakhon Nayok',
    Region: 'ภาคกลาง',
  },
  {
    ProvinceID: 27,
    ProvinceThai: 'สระแก้ว',
    ProvinceEng: 'Sa kaeo',
    Region: 'ภาคตะวันออก',
  },
  {
    ProvinceID: 30,
    ProvinceThai: 'นครราชสีมา',
    ProvinceEng: 'Nakhon Ratchasima',
    Region: 'ภาคตะวันออกเฉียงเหนือ',
  },
  {
    ProvinceID: 31,
    ProvinceThai: 'บุรีรัมย์',
    ProvinceEng: 'Buri Ram',
    Region: 'ภาคตะวันออกเฉียงเหนือ',
  },
  {
    ProvinceID: 32,
    ProvinceThai: 'สุรินทร์',
    ProvinceEng: 'Surin',
    Region: 'ภาคตะวันออกเฉียงเหนือ',
  },
  {
    ProvinceID: 33,
    ProvinceThai: 'ศรีสะเกษ',
    ProvinceEng: 'Si Sa Ket',
    Region: 'ภาคตะวันออกเฉียงเหนือ',
  },
  {
    ProvinceID: 34,
    ProvinceThai: 'อุบลราชธานี',
    ProvinceEng: 'Ubon Ratchathani',
    Region: 'ภาคตะวันออกเฉียงเหนือ',
  },
  {
    ProvinceID: 35,
    ProvinceThai: 'ยโสธร',
    ProvinceEng: 'Yasothon',
    Region: 'ภาคตะวันออกเฉียงเหนือ',
  },
  {
    ProvinceID: 36,
    ProvinceThai: 'ชัยภูมิ',
    ProvinceEng: 'Chaiyaphum',
    Region: 'ภาคตะวันออกเฉียงเหนือ',
  },
  {
    ProvinceID: 37,
    ProvinceThai: 'อำนาจเจริญ',
    ProvinceEng: 'Amnat Charoen',
    Region: 'ภาคตะวันออกเฉียงเหนือ',
  },
  {
    ProvinceID: 38,
    ProvinceThai: 'บึงกาฬ',
    ProvinceEng: 'Bueng Kan',
    Region: 'ภาคตะวันออกเฉียงเหนือ',
  },
  {
    ProvinceID: 39,
    ProvinceThai: 'หนองบัวลำภู',
    ProvinceEng: 'Nong Bua Lam Phu',
    Region: 'ภาคตะวันออกเฉียงเหนือ',
  },
  {
    ProvinceID: 40,
    ProvinceThai: 'ขอนแก่น',
    ProvinceEng: 'Khon Kaen',
    Region: 'ภาคตะวันออกเฉียงเหนือ',
  },
  {
    ProvinceID: 41,
    ProvinceThai: 'อุดรธานี',
    ProvinceEng: 'Udon Thani',
    Region: 'ภาคตะวันออกเฉียงเหนือ',
  },
  {
    ProvinceID: 42,
    ProvinceThai: 'เลย',
    ProvinceEng: 'Loei',
    Region: 'ภาคตะวันออกเฉียงเหนือ',
  },
  {
    ProvinceID: 43,
    ProvinceThai: 'หนองคาย',
    ProvinceEng: 'Nong Khai',
    Region: 'ภาคตะวันออกเฉียงเหนือ',
  },
  {
    ProvinceID: 44,
    ProvinceThai: 'มหาสารคาม',
    ProvinceEng: 'Maha Sarakham',
    Region: 'ภาคตะวันออกเฉียงเหนือ',
  },
  {
    ProvinceID: 45,
    ProvinceThai: 'ร้อยเอ็ด',
    ProvinceEng: 'Roi Et',
    Region: 'ภาคตะวันออกเฉียงเหนือ',
  },
  {
    ProvinceID: 46,
    ProvinceThai: 'กาฬสินธุ์',
    ProvinceEng: 'Kalasin',
    Region: 'ภาคตะวันออกเฉียงเหนือ',
  },
  {
    ProvinceID: 47,
    ProvinceThai: 'สกลนคร',
    ProvinceEng: 'Sakon Nakhon',
    Region: 'ภาคตะวันออกเฉียงเหนือ',
  },
  {
    ProvinceID: 48,
    ProvinceThai: 'นครพนม',
    ProvinceEng: 'Nakhon Phanom',
    Region: 'ภาคตะวันออกเฉียงเหนือ',
  },
  {
    ProvinceID: 49,
    ProvinceThai: 'มุกดาหาร',
    ProvinceEng: 'Mukdahan',
    Region: 'ภาคตะวันออกเฉียงเหนือ',
  },
  {
    ProvinceID: 50,
    ProvinceThai: 'เชียงใหม่',
    ProvinceEng: 'Chiang Mai',
    Region: 'ภาคเหนือ',
  },
  {
    ProvinceID: 51,
    ProvinceThai: 'ลำพูน',
    ProvinceEng: 'Lamphun',
    Region: 'ภาคเหนือ',
  },
  {
    ProvinceID: 52,
    ProvinceThai: 'ลำปาง',
    ProvinceEng: 'Lampang',
    Region: 'ภาคเหนือ',
  },
  {
    ProvinceID: 53,
    ProvinceThai: 'อุตรดิตถ์',
    ProvinceEng: 'Uttaradit',
    Region: 'ภาคเหนือ',
  },
  {
    ProvinceID: 54,
    ProvinceThai: 'แพร่',
    ProvinceEng: 'Phrae',
    Region: 'ภาคเหนือ',
  },
  {
    ProvinceID: 55,
    ProvinceThai: 'น่าน',
    ProvinceEng: 'Nan',
    Region: 'ภาคเหนือ',
  },
  {
    ProvinceID: 56,
    ProvinceThai: 'พะเยา',
    ProvinceEng: 'Phayao',
    Region: 'ภาคเหนือ',
  },
  {
    ProvinceID: 57,
    ProvinceThai: 'เชียงราย',
    ProvinceEng: 'Chiang Rai',
    Region: 'ภาคเหนือ',
  },
  {
    ProvinceID: 58,
    ProvinceThai: 'แม่ฮ่องสอน',
    ProvinceEng: 'Mae Hong Son',
    Region: 'ภาคเหนือ',
  },
  {
    ProvinceID: 60,
    ProvinceThai: 'นครสวรรค์',
    ProvinceEng: 'Nakhon Sawan',
    Region: 'ภาคกลาง',
  },
  {
    ProvinceID: 61,
    ProvinceThai: 'อุทัยธานี',
    ProvinceEng: 'Uthai Thani',
    Region: 'ภาคกลาง',
  },
  {
    ProvinceID: 62,
    ProvinceThai: 'กำแพงเพชร',
    ProvinceEng: 'Kamphaeng Phet',
    Region: 'ภาคกลาง',
  },
  {
    ProvinceID: 63,
    ProvinceThai: 'ตาก',
    ProvinceEng: 'Tak',
    Region: 'ภาคตะวันตก',
  },
  {
    ProvinceID: 64,
    ProvinceThai: 'สุโขทัย',
    ProvinceEng: 'Sukhothai',
    Region: 'ภาคกลาง',
  },
  {
    ProvinceID: 65,
    ProvinceThai: 'พิษณุโลก',
    ProvinceEng: 'Phitsanulok',
    Region: 'ภาคกลาง',
  },
  {
    ProvinceID: 66,
    ProvinceThai: 'พิจิตร',
    ProvinceEng: 'Phichit',
    Region: 'ภาคกลาง',
  },
  {
    ProvinceID: 67,
    ProvinceThai: 'เพชรบูรณ์',
    ProvinceEng: 'Phetchabun',
    Region: 'ภาคกลาง',
  },
  {
    ProvinceID: 70,
    ProvinceThai: 'ราชบุรี',
    ProvinceEng: 'Ratchaburi',
    Region: 'ภาคตะวันตก',
  },
  {
    ProvinceID: 71,
    ProvinceThai: 'กาญจนบุรี',
    ProvinceEng: 'Kanchanaburi',
    Region: 'ภาคตะวันตก',
  },
  {
    ProvinceID: 72,
    ProvinceThai: 'สุพรรณบุรี',
    ProvinceEng: 'Suphan Buri',
    Region: 'ภาคกลาง',
  },
  {
    ProvinceID: 73,
    ProvinceThai: 'นครปฐม',
    ProvinceEng: 'Nakhon Pathom',
    Region: 'ภาคกลาง',
  },
  {
    ProvinceID: 74,
    ProvinceThai: 'สมุทรสาคร',
    ProvinceEng: 'Samut Sakhon',
    Region: 'ภาคกลาง',
  },
  {
    ProvinceID: 75,
    ProvinceThai: 'สมุทรสงคราม',
    ProvinceEng: 'Samut Songkhram',
    Region: 'ภาคกลาง',
  },
  {
    ProvinceID: 76,
    ProvinceThai: 'เพชรบุรี',
    ProvinceEng: 'Phetchaburi',
    Region: 'ภาคตะวันตก',
  },
  {
    ProvinceID: 77,
    ProvinceThai: 'ประจวบคีรีขันธ์',
    ProvinceEng: 'Prachuap Khiri Khan',
    Region: 'ภาคตะวันตก',
  },
  {
    ProvinceID: 80,
    ProvinceThai: 'นครศรีธรรมราช',
    ProvinceEng: 'Nakhon Si Thammarat',
    Region: 'ภาคใต้',
  },
  {
    ProvinceID: 81,
    ProvinceThai: 'กระบี่',
    ProvinceEng: 'Krabi',
    Region: 'ภาคใต้',
  },
  {
    ProvinceID: 82,
    ProvinceThai: 'พังงา',
    ProvinceEng: 'Phangnga',
    Region: 'ภาคใต้',
  },
  {
    ProvinceID: 83,
    ProvinceThai: 'ภูเก็ต',
    ProvinceEng: 'Phuket',
    Region: 'ภาคใต้',
  },
  {
    ProvinceID: 84,
    ProvinceThai: 'สุราษฎร์ธานี',
    ProvinceEng: 'Surat Thani',
    Region: 'ภาคใต้',
  },
  {
    ProvinceID: 85,
    ProvinceThai: 'ระนอง',
    ProvinceEng: 'Ranong',
    Region: 'ภาคใต้',
  },
  {
    ProvinceID: 86,
    ProvinceThai: 'ชุมพร',
    ProvinceEng: 'Chumphon',
    Region: 'ภาคใต้',
  },
  {
    ProvinceID: 90,
    ProvinceThai: 'สงขลา',
    ProvinceEng: 'Songkhla',
    Region: 'ภาคใต้',
  },
  {
    ProvinceID: 91,
    ProvinceThai: 'สตูล',
    ProvinceEng: 'Satun',
    Region: 'ภาคใต้',
  },
  {
    ProvinceID: 92,
    ProvinceThai: 'ตรัง',
    ProvinceEng: 'Trang',
    Region: 'ภาคใต้',
  },
  {
    ProvinceID: 93,
    ProvinceThai: 'พัทลุง',
    ProvinceEng: 'Phatthalung',
    Region: 'ภาคใต้',
  },
  {
    ProvinceID: 94,
    ProvinceThai: 'ปัตตานี',
    ProvinceEng: 'Pattani',
    Region: 'ภาคใต้',
  },
  {
    ProvinceID: 95,
    ProvinceThai: 'ยะลา',
    ProvinceEng: 'Yala',
    Region: 'ภาคใต้',
  },
  {
    ProvinceID: 96,
    ProvinceThai: 'นราธิวาส',
    ProvinceEng: 'Narathiwat',
    Region: 'ภาคใต้',
  },
];

export const address = { listProvinces };
