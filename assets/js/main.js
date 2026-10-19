function toggleMobileMenu(){
  document.getElementById('mobileMenu').classList.toggle('open');
}

function toast(msg){
  const t = document.getElementById('toast');
  if(!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'), 2200);
}

function toggleFaq(el){
  const open = el.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(f=>f.classList.remove('open'));
  if(!open) el.classList.add('open');
}

function starString(rating){
  const full = Math.round(rating);
  return '★★★★★'.slice(0,full) + '☆☆☆☆☆'.slice(0, 5-full);
}

function langTagHtml(lang){
  return lang === 'de'
    ? '<span class="tag lang-de">🇩🇪 آلمانی</span>'
    : '<span class="tag lang-en">🇬🇧 انگلیسی</span>';
}

function statusTagHtml(status){
  const map = {
    done: '<span class="tag status-done">برگزار شده</span>',
    pending: '<span class="tag status-pending">در انتظار</span>',
    cancel: '<span class="tag status-cancel">لغو شده</span>'
  };
  return map[status] || status;
}

/* ---------------- teachers listing ---------------- */
function renderTeachers(){
  const wrap = document.getElementById('teacherGrid');
  if(!wrap) return;
  const lang = document.getElementById('fLang')?.value || 'all';
  const type = document.getElementById('fType')?.value || 'all';
  const sort = document.getElementById('fSort')?.value || 'rating';
  const q = (document.getElementById('fSearch')?.value || '').trim().toLowerCase();

  let list = TEACHERS.filter(t=>{
    if(lang !== 'all' && t.lang !== lang) return false;
    if(type !== 'all' && !t.type.includes(type)) return false;
    if(q && !t.name.toLowerCase().includes(q) && !t.bio.toLowerCase().includes(q)) return false;
    return true;
  });

  list.sort((a,b)=>{
    if(sort === 'price-asc') return a.price - b.price;
    if(sort === 'price-desc') return b.price - a.price;
    return b.rating - a.rating;
  });

  document.getElementById('resultCount').textContent = list.length;

  wrap.innerHTML = list.map(t => `
    <a href="teacher.html?id=${t.id}" class="teacher-card">
      <div class="head">
        <div class="avatar md">${t.initials}</div>
        <div>
          <div class="name">${t.name}</div>
          <div class="sub">${t.years} سال تجربه · <span class="stars">${starString(t.rating)}</span> ${t.rating} (${t.reviews})</div>
        </div>
      </div>
      <div class="tags">
        ${langTagHtml(t.lang)}
        <span class="tag">سطح ${t.level}</span>
        <span class="tag">${t.type.includes('private') ? 'خصوصی' : ''}${t.type.length>1?' · ':''}${t.type.includes('group') ? 'گروهی' : ''}</span>
      </div>
      <div class="bio">${t.bio}</div>
      <div class="foot">
        <div class="price">${fmtToman(t.price)} <span>/ هر جلسه</span></div>
        <span class="btn btn-sm btn-outline">مشاهده پروفایل</span>
      </div>
    </a>
  `).join('') || '<p style="color:var(--ink-faint);padding:40px 0;text-align:center">مدرسی با این فیلتر پیدا نشد.</p>';
}

/* ---------------- teacher profile + booking ---------------- */
let bookingState = { type:'private', date:null, time:null };

function getTeacherFromQuery(){
  const id = parseInt(new URLSearchParams(location.search).get('id') || '1', 10);
  return TEACHERS.find(t=>t.id===id) || TEACHERS[0];
}

function renderTeacherProfile(){
  const el = document.getElementById('teacherProfile');
  if(!el) return;
  const t = getTeacherFromQuery();
  document.title = t.name + ' · آکادمی زبان‌لرن';
  el.innerHTML = `
    <div class="head" style="gap:20px">
      <div class="avatar lg">${t.initials}</div>
      <div>
        <h1 style="font-size:24px;margin-bottom:4px">${t.name}</h1>
        <div class="sub">${t.years} سال تجربه تدریس · <span class="stars">${starString(t.rating)}</span> ${t.rating} از ${t.reviews} نظر</div>
        <div class="tags" style="margin-top:12px">
          ${langTagHtml(t.lang)}
          <span class="tag">سطح ${t.level}</span>
          ${t.type.includes('private') ? '<span class="tag">کلاس خصوصی</span>' : ''}
          ${t.type.includes('group') ? '<span class="tag">کلاس گروهی</span>' : ''}
        </div>
      </div>
    </div>
    <p style="margin-top:20px;color:var(--ink-soft)">${t.bio}</p>
    <h3 style="font-size:15px;margin-top:22px">سوابق و مدارک</h3>
    <ul style="display:flex;flex-direction:column;gap:8px">
      ${t.creds.map(c=>`<li style="color:var(--ink-soft);font-size:14px">✅ ${c}</li>`).join('')}
    </ul>
  `;
  document.getElementById('priceBox').innerHTML = `
    <div class="price" style="font-size:22px">${fmtToman(t.price)} <span style="font-size:13px">/ هر جلسه ۶۰ دقیقه</span></div>
  `;
}

function selectBookingType(type, el){
  bookingState.type = type;
  document.querySelectorAll('.pill[data-booking-type]').forEach(p=>p.classList.remove('active'));
  el.classList.add('active');
}

function selectTime(el){
  if(el.classList.contains('disabled')) return;
  document.querySelectorAll('.time-slot').forEach(s=>s.classList.remove('selected'));
  el.classList.add('selected');
  bookingState.time = el.textContent.trim();
}

function goStep(n){
  document.querySelectorAll('.booking-step').forEach(s=>s.style.display='none');
  document.getElementById('step'+n).style.display='block';
  document.querySelectorAll('.stepper .s').forEach((s,i)=>{
    s.classList.remove('active','done');
    if(i+1 < n) s.classList.add('done');
    if(i+1 === n) s.classList.add('active');
  });
  if(n===3){
    const t = getTeacherFromQuery();
    document.getElementById('summaryBox').innerHTML = `
      <div style="display:flex;justify-content:space-between;margin-bottom:10px"><span>مدرس</span><b>${t.name}</b></div>
      <div style="display:flex;justify-content:space-between;margin-bottom:10px"><span>نوع کلاس</span><b>${bookingState.type==='private'?'خصوصی':'گروهی'}</b></div>
      <div style="display:flex;justify-content:space-between;margin-bottom:10px"><span>زمان</span><b>${bookingState.time || 'انتخاب‌نشده'}</b></div>
      <div class="divider" style="margin:14px 0"></div>
      <div style="display:flex;justify-content:space-between;font-size:17px"><span>مبلغ قابل پرداخت</span><b style="color:var(--primary-dark)">${fmtToman(t.price)}</b></div>
    `;
  }
}

function confirmPayment(){
  goStep(4);
}

/* ---------------- admin / dashboard tables ---------------- */
function renderTable(data, containerId, rowFn){
  const el = document.getElementById(containerId);
  if(!el) return;
  el.innerHTML = data.map(rowFn).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderTeachers();
  renderTeacherProfile();

  const sb = document.getElementById('bkStudentBody');
  if(sb) renderTable(BOOKINGS_STUDENT, 'bkStudentBody', b => `
    <tr><td>${langTagHtml(b.lang)} ${b.teacher}</td><td>${b.date}</td><td>${b.time}</td><td>${b.type}</td><td>${statusTagHtml(b.status)}</td></tr>
  `);

  const tb = document.getElementById('bkTeacherBody');
  if(tb) renderTable(BOOKINGS_TEACHER, 'bkTeacherBody', b => `
    <tr><td>${b.student}</td><td>${b.date}</td><td>${b.time}</td><td>${b.type}</td><td>${fmtToman(b.amount)}</td><td>${statusTagHtml(b.status)}</td></tr>
  `);

  const at = document.getElementById('adminTeacherBody');
  if(at) renderTable(ADMIN_TEACHERS, 'adminTeacherBody', t => `
    <tr><td>${t.name}</td><td>${t.lang}</td><td>${t.students}</td><td>${fmtToman(t.revenue)}</td><td><span class="tag ${t.status==='فعال'?'status-done':'status-cancel'}">${t.status}</span></td>
    <td><button class="btn btn-ghost btn-sm">ویرایش</button></td></tr>
  `);

  const ab = document.getElementById('adminBookingBody');
  if(ab) renderTable(ADMIN_BOOKINGS, 'adminBookingBody', b => `
    <tr><td>${b.student}</td><td>${b.teacher}</td><td>${b.date}</td><td>${fmtToman(b.amount)}</td><td>${statusTagHtml(b.status)}</td></tr>
  `);

  const ar = document.getElementById('articleGrid');
  if(ar) ar.innerHTML = ARTICLES.map(a => `
    <a href="article.html?id=${a.id}" class="article-card">
      <div class="thumb">${a.emoji}</div>
      <div class="body">
        <span class="tag">${a.tag}</span>
        <h3 style="margin-top:10px">${a.title}</h3>
        <p style="color:var(--ink-soft);font-size:13.5px;margin-top:8px">${a.excerpt}</p>
        <div class="meta">${a.date}</div>
      </div>
    </a>
  `).join('');

  const single = document.getElementById('articleSingle');
  if(single){
    const id = parseInt(new URLSearchParams(location.search).get('id') || '1', 10);
    const a = ARTICLES.find(x=>x.id===id) || ARTICLES[0];
    document.title = a.title + ' · مقالات';
    single.innerHTML = `
      <span class="tag">${a.tag}</span>
      <h1 style="font-size:28px;margin:16px 0 8px">${a.title}</h1>
      <div class="meta" style="color:var(--ink-faint);font-size:13.5px;margin-bottom:24px">${a.date} · زمان مطالعه ۴ دقیقه</div>
      <div class="thumb" style="height:220px;border-radius:14px;margin-bottom:28px">${a.emoji}</div>
      <p>${a.excerpt}</p>
      <p>یادگیری یک زبان خارجی فرآیندی پلکانی است؛ هر سطح پایه‌ای برای سطح بعدی می‌سازد. بهترین نتیجه زمانی حاصل می‌شود که تمرین منظم هفتگی را با بازخورد مستقیم یک مدرس ترکیب کنید.</p>
      <p>در آکادمی زبان‌لرن، هر زبان‌آموز پیش از شروع، یک ارزیابی سطح رایگان دریافت می‌کند تا مدرس و برنامه مناسب برای او انتخاب شود.</p>
    `;
  }
});
