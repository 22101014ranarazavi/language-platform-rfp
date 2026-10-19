const TEACHERS = [
  {id:1, name:"آناهیتا رستگار", lang:"de", level:"A1–B2", type:["private","group"], price:450000, rating:4.9, reviews:38, years:6, initials:"آر",
   bio:"مدرس زبان آلمانی، فارغ‌التحصیل ادبیات آلمانی از دانشگاه تهران، دارای مدرک ÖSD C1 و ۶ سال تجربه تدریس آنلاین.",
   creds:["مدرک ÖSD C1","۶ سال تجربه تدریس","تدریس به بیش از ۲۰۰ زبان‌آموز"]},
  {id:2, name:"کیان ادیب", lang:"en", level:"B1–C1", type:["private"], price:520000, rating:4.8, reviews:52, years:8, initials:"کا",
   bio:"مدرس زبان انگلیسی با تمرکز بر مهارت مکالمه و آمادگی آیلتس، دارای مدرک CELTA و تجربه تدریس در آموزشگاه‌های بین‌المللی.",
   creds:["مدرک CELTA","آمادگی آزمون IELTS","۸ سال تجربه تدریس"]},
  {id:3, name:"نگار شریفی", lang:"de", level:"A1–A2", type:["group"], price:280000, rating:4.7, reviews:21, years:3, initials:"نش",
   bio:"مدرس زبان آلمانی برای مقاطع پایه، با رویکرد آموزش از طریق بازی و مکالمه، مناسب برای شروع از صفر.",
   creds:["کارشناسی زبان آلمانی","دوره تربیت مدرس گوته","۳ سال تجربه"]},
  {id:4, name:"رضا مهرآبادی", lang:"en", level:"A2–B2", type:["private","group"], price:390000, rating:4.6, reviews:29, years:5, initials:"رم",
   bio:"مدرس زبان انگلیسی عمومی و تجاری، با تجربه تدریس به کارمندان شرکت‌های بین‌المللی و آمادگی مصاحبه کاری.",
   creds:["مدرک TESOL","انگلیسی تجاری","۵ سال تجربه"]},
  {id:5, name:"سارا کمالی", lang:"de", level:"B1–C2", type:["private"], price:580000, rating:5.0, reviews:44, years:9, initials:"سک",
   bio:"مدرس زبان آلمانی سطوح پیشرفته، ساکن برلین، دارای مدرک C2 و تخصص در آمادگی آزمون تلک و مهاجرت تحصیلی.",
   creds:["مدرک C2 (Goethe)","آمادگی TestDaF","۹ سال تجربه"]},
  {id:6, name:"آرش نوری", lang:"en", level:"A1–B1", type:["group"], price:260000, rating:4.5, reviews:17, years:2, initials:"آن",
   bio:"مدرس زبان انگلیسی پایه برای نوجوانان و بزرگسالان، کلاس‌های گروهی پرانرژی با تمرکز بر تقویت مکالمه.",
   creds:["کارشناسی آموزش زبان","۲ سال تجربه تدریس گروهی"]}
];

const ARTICLES = [
  {id:1, title:"از کجا شروع کنیم؟ راهنمای انتخاب سطح زبان آلمانی", tag:"آلمانی", emoji:"🇩🇪", date:"۱۴۰۴/۰۷/۱۲", excerpt:"اگر تازه می‌خواهید آلمانی را شروع کنید، این راهنما به شما کمک می‌کند سطح مناسب خودتان را پیدا کنید."},
  {id:2, title:"۵ اشتباه رایج زبان‌آموزان انگلیسی در مکالمه", tag:"انگلیسی", emoji:"🇬🇧", date:"۱۴۰۴/۰۷/۰۵", excerpt:"بررسی خطاهای پرتکرار فارسی‌زبانان هنگام صحبت‌کردن به انگلیسی و راه‌حل هرکدام."},
  {id:3, title:"تفاوت کلاس خصوصی و گروهی؛ کدام برای شما بهتر است؟", tag:"راهنما", emoji:"📚", date:"۱۴۰۴/۰۶/۲۸", excerpt:"مقایسه مزایا و هزینه کلاس‌های خصوصی و گروهی برای کمک به انتخاب بهتر."},
  {id:4, title:"آمادگی آزمون تلک (TestDaF) در ۳ ماه، شدنی است؟", tag:"آلمانی", emoji:"📝", date:"۱۴۰۴/۰۶/۱۹", excerpt:"برنامه‌ریزی واقع‌بینانه برای آمادگی آزمون‌های بین‌المللی زبان آلمانی."},
  {id:5, title:"چرا یادگیری زبان با مدرس زنده سریع‌تر پیش می‌رود؟", tag:"راهنما", emoji:"💬", date:"۱۴۰۴/۰۶/۱۰", excerpt:"نگاهی به تفاوت یادگیری با محتوای ضبط‌شده در مقابل کلاس زنده با مدرس."},
  {id:6, title:"آیلتس از صفر؛ نقشه راه ۶ ماهه", tag:"انگلیسی", emoji:"🎯", date:"۱۴۰۴/۰۵/۳۰", excerpt:"یک برنامه گام‌به‌گام برای کسانی که می‌خواهند از پایه آیلتس را شروع کنند."}
];

const BOOKINGS_STUDENT = [
  {teacher:"آناهیتا رستگار", lang:"de", date:"۱۴۰۴/۰۷/۲۲", time:"۱۸:۰۰", type:"خصوصی", status:"pending"},
  {teacher:"کیان ادیب", lang:"en", date:"۱۴۰۴/۰۷/۲۰", time:"۱۰:۳۰", type:"خصوصی", status:"done"},
  {teacher:"نگار شریفی", lang:"de", date:"۱۴۰۴/۰۷/۱۵", time:"۱۷:۰۰", type:"گروهی", status:"done"},
  {teacher:"کیان ادیب", lang:"en", date:"۱۴۰۴/۰۷/۱۰", time:"۱۰:۳۰", type:"خصوصی", status:"cancel"}
];

const BOOKINGS_TEACHER = [
  {student:"محمد یزدانی", date:"۱۴۰۴/۰۷/۲۳", time:"۱۹:۰۰", type:"خصوصی", amount:450000, status:"pending"},
  {student:"لیلا احمدی", date:"۱۴۰۴/۰۷/۲۱", time:"۱۱:۰۰", type:"خصوصی", amount:450000, status:"done"},
  {student:"گروه B1 (۴ نفر)", date:"۱۴۰۴/۰۷/۱۹", time:"۱۷:۰۰", type:"گروهی", amount:620000, status:"done"},
  {student:"پارسا کریمی", date:"۱۴۰۴/۰۷/۱۴", time:"۰۹:۳۰", type:"خصوصی", amount:450000, status:"cancel"}
];

const ADMIN_TEACHERS = [
  {name:"آناهیتا رستگار", lang:"آلمانی", students:38, revenue:12400000, status:"فعال"},
  {name:"کیان ادیب", lang:"انگلیسی", students:52, revenue:18650000, status:"فعال"},
  {name:"نگار شریفی", lang:"آلمانی", students:21, revenue:6200000, status:"فعال"},
  {name:"رضا مهرآبادی", lang:"انگلیسی", students:29, revenue:9800000, status:"غیرفعال"},
  {name:"سارا کمالی", lang:"آلمانی", students:44, revenue:17300000, status:"فعال"}
];

const ADMIN_BOOKINGS = [
  {student:"محمد یزدانی", teacher:"آناهیتا رستگار", date:"۱۴۰۴/۰۷/۲۳", amount:450000, status:"pending"},
  {student:"لیلا احمدی", teacher:"کیان ادیب", date:"۱۴۰۴/۰۷/۲۱", amount:520000, status:"done"},
  {student:"پارسا کریمی", teacher:"سارا کمالی", date:"۱۴۰۴/۰۷/۲۰", amount:580000, status:"done"},
  {student:"هستی رحیمی", teacher:"رضا مهرآبادی", date:"۱۴۰۴/۰۷/۱۸", amount:390000, status:"cancel"},
  {student:"امیر توکلی", teacher:"نگار شریفی", date:"۱۴۰۴/۰۷/۱۷", amount:280000, status:"done"}
];

function fmtToman(n){ return n.toLocaleString("fa-IR") + " تومان"; }
