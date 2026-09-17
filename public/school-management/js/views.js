/* ─── Helper Utilities ────────────────────────────────────────────────────────── */
const fmt = {
  date: d => d ? new Date(d).toLocaleDateString('en-IN', {day:'2-digit',month:'short',year:'numeric'}) : '—',
  money: n => '₹' + Number(n).toLocaleString('en-IN'),
  pct:   n => Number(n).toFixed(1) + '%',
  initials: name => name.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2),
  age: dob => {
    const d = new Date(dob), now = new Date();
    let y = now.getFullYear() - d.getFullYear();
    if (now < new Date(now.getFullYear(), d.getMonth(), d.getDate())) y--;
    return y + ' yrs';
  }
};

function gradeClass(g) {
  if (!g) return '';
  const m = {'A+':'grade-ap','A':'grade-a','B+':'grade-bp','B':'grade-b','C':'grade-c','F':'grade-f'};
  return m[g] || 'grade-b';
}

function attColor(p) {
  if (p >= 95) return '#10b981';
  if (p >= 85) return '#3b82f6';
  if (p >= 75) return '#f59e0b';
  return '#ef4444';
}

function progressColor(p) {
  if (p >= 90) return 'green';
  if (p >= 75) return 'blue';
  if (p >= 60) return 'amber';
  return 'red';
}

/* ─── Dashboard View ─────────────────────────────────────────────────────────── */
function renderDashboard() {
  const students = DB.getStudents();
  const school   = DB.getSchool();
  const active   = students.filter(s => s.status === 'Active').length;
  const totalFee = students.reduce((acc, s) => acc + (s.feeHistory || []).reduce((a,f)=>a+f.annual,0), 0);
  const paidFee  = students.reduce((acc, s) => acc + (s.feeHistory || []).reduce((a,f)=>a+f.paid,0), 0);

  const recentStudents = [...students].sort((a,b) => new Date(b.enrollmentDate)-new Date(a.enrollmentDate)).slice(0,5);
  const topStudents = students.map(s => {
    const latest = (s.academicHistory||[]).slice(-1)[0];
    return { ...s, pct: latest ? latest.percentage : 0, rank: latest ? latest.rank : 99 };
  }).sort((a,b) => b.pct - a.pct).slice(0,4);

  return `
<div class="page-content">
  <!-- Welcome Banner -->
  <div style="background:linear-gradient(135deg,#1a3c6e,#2563a8);border-radius:14px;padding:24px 28px;color:#fff;margin-bottom:24px;display:flex;align-items:center;gap:20px;">
    <span style="font-size:48px;">${school.logo}</span>
    <div>
      <h2 style="font-size:20px;font-weight:800;">${school.name}</h2>
      <p style="opacity:.8;font-size:13px;margin-top:3px;">Est. ${school.established} &nbsp;|&nbsp; ${school.address}</p>
      <p style="opacity:.7;font-size:12px;margin-top:4px;">Principal: ${school.principal} &nbsp;|&nbsp; ${school.phone}</p>
    </div>
    <div style="margin-left:auto;text-align:right;">
      <div style="font-size:12px;opacity:.7;">Academic Year</div>
      <div style="font-size:22px;font-weight:800;">2023–24</div>
    </div>
  </div>

  <!-- Stats -->
  <div class="stats-grid" style="margin-bottom:24px;">
    <div class="stat-card">
      <div class="stat-icon blue">👨‍🎓</div>
      <div><div class="stat-num">${students.length}</div><div class="stat-label">Total Students</div></div>
    </div>
    <div class="stat-card">
      <div class="stat-icon green">✅</div>
      <div><div class="stat-num">${active}</div><div class="stat-label">Active Students</div></div>
    </div>
    <div class="stat-card">
      <div class="stat-icon amber">👨‍🏫</div>
      <div><div class="stat-num">${DB.getTeachers().length}</div><div class="stat-label">Teachers</div></div>
    </div>
    <div class="stat-card">
      <div class="stat-icon purple">💰</div>
      <div><div class="stat-num">${fmt.money(paidFee)}</div><div class="stat-label">Fee Collected</div></div>
    </div>
    <div class="stat-card">
      <div class="stat-icon red">⏳</div>
      <div><div class="stat-num">${fmt.money(totalFee - paidFee)}</div><div class="stat-label">Fee Pending</div></div>
    </div>
  </div>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:24px;">
    <!-- Top Performers -->
    <div class="card">
      <div class="card-header">
        <span class="card-title">🏆 Top Performers</span>
        <a onclick="navigate('students')" class="btn btn-outline btn-sm" style="cursor:pointer;">View All</a>
      </div>
      <div class="card-body" style="padding:0;">
        <table><thead><tr><th>#</th><th>Student</th><th>Class</th><th>Score</th></tr></thead><tbody>
        ${topStudents.map((s,i)=>`
          <tr onclick="navigate('student',{id:'${s.id}'})" style="cursor:pointer;">
            <td><span style="font-weight:800;color:#f59e0b;">${['🥇','🥈','🥉','4️⃣'][i]}</span></td>
            <td><div style="font-weight:600;">${s.name}</div><div style="font-size:11px;color:#64748b;">${s.admissionNo}</div></td>
            <td>${s.currentClass} ${s.currentSection}</td>
            <td><span class="badge ${s.pct>=90?'badge-success':s.pct>=75?'badge-info':'badge-warning'}">${fmt.pct(s.pct)}</span></td>
          </tr>`).join('')}
        </tbody></table>
      </div>
    </div>

    <!-- Recent Admissions -->
    <div class="card">
      <div class="card-header">
        <span class="card-title">🆕 Recent Admissions</span>
        <a onclick="navigate('add-student')" class="btn btn-primary btn-sm" style="cursor:pointer;">+ Admit</a>
      </div>
      <div class="card-body" style="padding:0;">
        <table><thead><tr><th>Student</th><th>Admitted</th><th>Class</th><th></th></tr></thead><tbody>
        ${recentStudents.map(s=>`
          <tr>
            <td>
              <div style="display:flex;align-items:center;gap:10px;">
                <div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#2563a8,#1a3c6e);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:11px;color:#fff;">${fmt.initials(s.name)}</div>
                <div><div style="font-weight:600;font-size:13px;">${s.name}</div></div>
              </div>
            </td>
            <td style="font-size:12px;">${fmt.date(s.enrollmentDate)}</td>
            <td>${s.currentClass}-${s.currentSection}</td>
            <td><a onclick="navigate('student',{id:'${s.id}'})" class="btn btn-outline btn-sm" style="cursor:pointer;">View</a></td>
          </tr>`).join('')}
        </tbody></table>
      </div>
    </div>
  </div>

  <!-- Quick Info -->
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;">
    <div class="card" style="padding:20px;">
      <div style="font-weight:700;color:var(--primary);margin-bottom:12px;">📊 Class Distribution</div>
      ${[...new Set(students.map(s=>s.currentClass))].map(c=>{
        const cnt = students.filter(s=>s.currentClass===c).length;
        return `<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
          <span style="width:50px;font-size:12px;font-weight:600;">${c}</span>
          <div style="flex:1;background:#e2e8f0;border-radius:4px;height:6px;overflow:hidden;">
            <div style="width:${(cnt/students.length*100)}%;height:100%;background:#2563a8;border-radius:4px;"></div>
          </div>
          <span style="font-size:12px;font-weight:700;width:20px;">${cnt}</span>
        </div>`;
      }).join('')}
    </div>
    <div class="card" style="padding:20px;">
      <div style="font-weight:700;color:var(--primary);margin-bottom:12px;">💳 Fee Status</div>
      <div style="text-align:center;margin-bottom:12px;">
        <div style="font-size:32px;font-weight:800;color:#10b981;">${Math.round(paidFee/totalFee*100)}%</div>
        <div style="font-size:12px;color:#64748b;">Collection Rate</div>
      </div>
      <div class="progress-bar-wrap"><div class="progress-bar green" style="width:${Math.round(paidFee/totalFee*100)}%"></div></div>
      <div style="display:flex;justify-content:space-between;font-size:12px;margin-top:8px;">
        <span style="color:#10b981;">Paid: ${fmt.money(paidFee)}</span>
        <span style="color:#ef4444;">Due: ${fmt.money(totalFee-paidFee)}</span>
      </div>
    </div>
    <div class="card" style="padding:20px;">
      <div style="font-weight:700;color:var(--primary);margin-bottom:12px;">👫 Gender Ratio</div>
      ${(()=>{
        const m = students.filter(s=>s.gender==='Male').length;
        const f = students.filter(s=>s.gender==='Female').length;
        return `
          <div style="display:flex;gap:10px;align-items:center;margin-bottom:12px;">
            <div style="flex:${m};height:18px;background:#3b82f6;border-radius:4px 0 0 4px;"></div>
            <div style="flex:${f};height:18px;background:#ec4899;border-radius:0 4px 4px 0;"></div>
          </div>
          <div style="display:flex;justify-content:space-between;">
            <span style="font-size:13px;">👦 Boys: <strong>${m}</strong></span>
            <span style="font-size:13px;">👧 Girls: <strong>${f}</strong></span>
          </div>`;
      })()}
    </div>
  </div>
</div>`;
}

/* ─── Students List View ─────────────────────────────────────────────────────── */
function renderStudents(query = '') {
  let students = DB.getStudents();
  if (query) {
    const q = query.toLowerCase();
    students = students.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.admissionNo.toLowerCase().includes(q) ||
      s.currentClass.toLowerCase().includes(q) ||
      s.id.toLowerCase().includes(q)
    );
  }

  return `
<div class="page-content">
  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:12px;">
    <div>
      <h2 style="font-size:18px;font-weight:800;color:var(--primary);">All Students</h2>
      <p style="font-size:12px;color:#64748b;">${students.length} student${students.length!==1?'s':''} found</p>
    </div>
    <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
      <div class="search-wrap">
        <span class="search-icon">🔍</span>
        <input type="text" id="studentSearch" placeholder="Search by name, class, ID…" value="${query}"
               oninput="searchStudents(this.value)" style="width:260px;">
      </div>
      <a onclick="navigate('add-student')" class="btn btn-primary" style="cursor:pointer;">+ New Admission</a>
    </div>
  </div>

  ${students.length === 0 ? `
    <div class="empty-state">
      <div class="icon">🔍</div>
      <p>No students found matching "<strong>${query}</strong>"</p>
      <a onclick="searchStudents('')" class="btn btn-outline" style="margin-top:12px;cursor:pointer;">Clear Search</a>
    </div>` : `
  <div class="student-grid">
    ${students.map(s => {
      const latest = (s.academicHistory||[]).slice(-1)[0];
      const pct = latest ? latest.percentage : null;
      const attLatest = (s.attendanceHistory||[]).slice(-1)[0];
      return `
      <div class="student-card" onclick="navigate('student',{id:'${s.id}'})">
        <div class="student-avatar">${fmt.initials(s.name)}</div>
        <h3>${s.name}</h3>
        <p style="color:#64748b;">${s.admissionNo} &nbsp;|&nbsp; ${s.gender}</p>
        <div class="student-meta">
          <span class="badge badge-info">${s.currentClass}-${s.currentSection}</span>
          <span class="badge ${s.status==='Active'?'badge-success':'badge-gray'}">${s.status}</span>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:14px;border-top:1px solid var(--border);padding-top:12px;">
          <div style="text-align:center;">
            <div style="font-size:16px;font-weight:800;color:${pct>=85?'#10b981':pct>=65?'#3b82f6':'#f59e0b'};">${pct ? fmt.pct(pct) : '—'}</div>
            <div style="font-size:10px;color:#64748b;">Last Year Score</div>
          </div>
          <div style="text-align:center;">
            <div style="font-size:16px;font-weight:800;color:${attLatest ? attColor(attLatest.percentage) : '#64748b'};">${attLatest ? fmt.pct(attLatest.percentage) : '—'}</div>
            <div style="font-size:10px;color:#64748b;">Attendance</div>
          </div>
        </div>
        <div style="text-align:center;margin-top:10px;">
          <span style="font-size:11px;color:#64748b;">Joined: ${fmt.date(s.enrollmentDate)}</span>
        </div>
      </div>`;
    }).join('')}
  </div>`}
</div>`;
}

/* ─── Student Detail View ────────────────────────────────────────────────────── */
function renderStudentDetail(id) {
  const s = DB.getStudent(id);
  if (!s) return `<div class="page-content"><div class="empty-state"><div class="icon">❌</div><p>Student not found.</p></div></div>`;

  const yearsActive = new Date().getFullYear() - new Date(s.enrollmentDate).getFullYear() + 1;
  const latestAcad  = (s.academicHistory||[]).slice(-1)[0];
  const latestAtt   = (s.attendanceHistory||[]).slice(-1)[0];
  const feeStatus   = (s.feeHistory||[]).slice(-1)[0];
  const totalCerts  = (s.certificates||[]).length;

  return `
<div class="page-content">
  <!-- Breadcrumb -->
  <div class="breadcrumb">
    <a onclick="navigate('students')" style="cursor:pointer;">Students</a>
    <span>›</span>
    <span>${s.name}</span>
  </div>

  <!-- Hero -->
  <div class="detail-hero">
    <div class="hero-avatar">${fmt.initials(s.name)}</div>
    <div class="hero-info">
      <h2>${s.name}</h2>
      <p>${s.admissionNo} &nbsp;|&nbsp; Class ${s.currentClass}-${s.currentSection} &nbsp;|&nbsp; Roll No. ${s.rollNo}</p>
      <div class="hero-tags">
        <span class="hero-tag">${s.gender}</span>
        <span class="hero-tag">DOB: ${fmt.date(s.dob)}</span>
        <span class="hero-tag">Blood: ${s.bloodGroup}</span>
        <span class="hero-tag" style="background:${s.status==='Active'?'rgba(16,185,129,.3)':'rgba(239,68,68,.3)'}">● ${s.status}</span>
      </div>
    </div>
    <div class="hero-stats">
      <div class="hero-stat">
        <div class="num">${yearsActive}</div>
        <div class="lbl">Years Here</div>
      </div>
      <div class="hero-stat">
        <div class="num">${latestAcad ? fmt.pct(latestAcad.percentage) : '—'}</div>
        <div class="lbl">Latest Score</div>
      </div>
      <div class="hero-stat">
        <div class="num">${latestAtt ? fmt.pct(latestAtt.percentage) : '—'}</div>
        <div class="lbl">Attendance</div>
      </div>
      <div class="hero-stat">
        <div class="num">${totalCerts}</div>
        <div class="lbl">Certificates</div>
      </div>
    </div>
  </div>

  <!-- Tabs -->
  <div class="tabs-bar" id="detailTabs">
    <button class="tab-btn active" onclick="switchTab('overview',this)">📋 Overview</button>
    <button class="tab-btn" onclick="switchTab('academic',this)">📚 Academics</button>
    <button class="tab-btn" onclick="switchTab('attendance',this)">📅 Attendance</button>
    <button class="tab-btn" onclick="switchTab('fees',this)">💰 Fee History</button>
    <button class="tab-btn" onclick="switchTab('activities',this)">🏆 Activities</button>
    <button class="tab-btn" onclick="switchTab('health',this)">🏥 Health</button>
    <button class="tab-btn" onclick="switchTab('documents',this)">📄 Documents</button>
    <button class="tab-btn" onclick="switchTab('timeline',this)">🕐 Journey</button>
  </div>

  <!-- Tab Panels -->
  <div id="tab-overview" class="tab-panel active">${tabOverview(s)}</div>
  <div id="tab-academic" class="tab-panel">${tabAcademic(s)}</div>
  <div id="tab-attendance" class="tab-panel">${tabAttendance(s)}</div>
  <div id="tab-fees" class="tab-panel">${tabFees(s)}</div>
  <div id="tab-activities" class="tab-panel">${tabActivities(s)}</div>
  <div id="tab-health" class="tab-panel">${tabHealth(s)}</div>
  <div id="tab-documents" class="tab-panel">${tabDocuments(s)}</div>
  <div id="tab-timeline" class="tab-panel">${tabTimeline(s)}</div>
</div>`;
}

/* ── Tab: Overview ── */
function tabOverview(s) {
  const latestAcad = (s.academicHistory||[]).slice(-1)[0];
  const latestAtt  = (s.attendanceHistory||[]).slice(-1)[0];
  const feeRec     = (s.feeHistory||[]).slice(-1)[0];
  return `
<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;">
  <div class="card">
    <div class="card-header"><span class="card-title">👤 Personal Information</span></div>
    <div class="card-body">
      <div class="info-grid">
        <div class="info-item"><label>Full Name</label><span>${s.name}</span></div>
        <div class="info-item"><label>Date of Birth</label><span>${fmt.date(s.dob)}</span></div>
        <div class="info-item"><label>Age</label><span>${fmt.age(s.dob)}</span></div>
        <div class="info-item"><label>Gender</label><span>${s.gender}</span></div>
        <div class="info-item"><label>Blood Group</label><span>${s.bloodGroup}</span></div>
        <div class="info-item"><label>Enrollment Date</label><span>${fmt.date(s.enrollmentDate)}</span></div>
        <div class="info-item"><label>Admission No.</label><span>${s.admissionNo}</span></div>
        <div class="info-item"><label>Roll No.</label><span>${s.rollNo}</span></div>
        <div class="info-item"><label>Current Class</label><span>${s.currentClass}-${s.currentSection}</span></div>
        <div class="info-item"><label>Status</label><span><span class="badge ${s.status==='Active'?'badge-success':'badge-gray'}">${s.status}</span></span></div>
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header"><span class="card-title">👨‍👩‍👦 Guardian & Contact</span></div>
    <div class="card-body">
      <div class="info-grid">
        <div class="info-item"><label>Father's Name</label><span>${s.guardian.fatherName}</span></div>
        <div class="info-item"><label>Father's Occupation</label><span>${s.guardian.fatherOccupation}</span></div>
        <div class="info-item"><label>Mother's Name</label><span>${s.guardian.motherName}</span></div>
        <div class="info-item"><label>Mother's Occupation</label><span>${s.guardian.motherOccupation}</span></div>
        <div class="info-item"><label>Contact Phone</label><span>${s.contact.phone}</span></div>
        <div class="info-item"><label>Email</label><span>${s.contact.email}</span></div>
        <div class="info-item"><label>Emergency Contact</label><span>${s.guardian.emergencyContact}</span></div>
        <div class="info-item" style="grid-column:1/-1"><label>Address</label><span>${s.contact.address}</span></div>
      </div>
    </div>
  </div>
</div>

<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;">
  <div class="card" style="padding:18px;">
    <div style="font-size:12px;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:.04em;">Latest Academic</div>
    ${latestAcad ? `
      <div style="margin-top:10px;font-size:28px;font-weight:800;color:${latestAcad.percentage>=85?'#10b981':'#3b82f6'};">${fmt.pct(latestAcad.percentage)}</div>
      <div style="font-size:12px;color:#64748b;">${latestAcad.year} • ${latestAcad.class} • Rank #${latestAcad.rank}</div>
      <div style="margin-top:6px;"><span class="badge ${latestAcad.result==='PASS'?'badge-success':'badge-danger'}">${latestAcad.result}</span></div>
    ` : '<div style="color:#94a3b8;margin-top:8px;">No records</div>'}
  </div>
  <div class="card" style="padding:18px;">
    <div style="font-size:12px;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:.04em;">Attendance</div>
    ${latestAtt ? `
      <div style="margin-top:10px;font-size:28px;font-weight:800;color:${attColor(latestAtt.percentage)};">${fmt.pct(latestAtt.percentage)}</div>
      <div style="font-size:12px;color:#64748b;">${latestAtt.year} • ${latestAtt.present}/${latestAtt.totalDays} days</div>
      <div style="margin-top:8px;" class="progress-bar-wrap"><div class="progress-bar ${progressColor(latestAtt.percentage)}" style="width:${latestAtt.percentage}%"></div></div>
    ` : '<div style="color:#94a3b8;margin-top:8px;">No records</div>'}
  </div>
  <div class="card" style="padding:18px;">
    <div style="font-size:12px;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:.04em;">Fee Status (Latest)</div>
    ${feeRec ? `
      <div style="margin-top:10px;font-size:28px;font-weight:800;color:${feeRec.status==='Paid'?'#10b981':'#f59e0b'};">${feeRec.status}</div>
      <div style="font-size:12px;color:#64748b;">${feeRec.year} • Paid: ${fmt.money(feeRec.paid)}</div>
      ${feeRec.pending > 0 ? `<div style="font-size:12px;color:#ef4444;margin-top:4px;">Pending: ${fmt.money(feeRec.pending)}</div>` : ''}
    ` : '<div style="color:#94a3b8;margin-top:8px;">No records</div>'}
  </div>
  <div class="card" style="padding:18px;">
    <div style="font-size:12px;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:.04em;">Disciplinary</div>
    <div style="margin-top:10px;font-size:28px;font-weight:800;color:${(s.disciplinary||[]).length===0?'#10b981':'#f59e0b'};">${(s.disciplinary||[]).length}</div>
    <div style="font-size:12px;color:#64748b;">Incident${(s.disciplinary||[]).length!==1?'s':''} recorded</div>
    <div style="margin-top:6px;"><span class="badge ${(s.disciplinary||[]).length===0?'badge-success':'badge-warning'}">${(s.disciplinary||[]).length===0?'Clean Record':'Review'}</span></div>
  </div>
</div>`;
}

/* ── Tab: Academics ── */
function tabAcademic(s) {
  const history = s.academicHistory || [];
  if (!history.length) return `<div class="empty-state"><div class="icon">📚</div><p>No academic records found.</p></div>`;

  return `
<div style="display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap;">
  ${history.map(y=>`<span class="chip" style="cursor:pointer;" onclick="scrollToYear('ay-${y.year.replace('/','-')}')">${y.year}</span>`).join('')}
</div>
${history.slice().reverse().map(yr=>`
  <div class="card" style="margin-bottom:16px;" id="ay-${yr.year.replace('/','-')}">
    <div class="card-header">
      <div>
        <span class="card-title">📅 ${yr.year} &nbsp;—&nbsp; Class ${yr.class}-${yr.section}</span>
        <div style="font-size:12px;color:#64748b;margin-top:2px;">Class Teacher: ${yr.classTeacher}</div>
      </div>
      <div style="text-align:right;">
        <span class="badge ${yr.result==='PASS'?'badge-success':'badge-danger'}" style="font-size:13px;padding:5px 12px;">${yr.result}</span>
        <div style="font-size:22px;font-weight:800;color:${yr.percentage>=85?'#10b981':'#3b82f6'};margin-top:4px;">${fmt.pct(yr.percentage)}</div>
        <div style="font-size:11px;color:#64748b;">Rank #${yr.rank} &nbsp;|&nbsp; Grade: ${yr.grade}</div>
      </div>
    </div>
    <div class="card-body">
      <div class="marks-grid">
        ${yr.subjects.map(sub=>{
          const pct = Math.round(sub.obtained/sub.total*100);
          return `<div class="marks-row">
            <div class="marks-subject">${sub.name}</div>
            <div class="marks-bar-wrap">
              <div class="progress-bar-wrap"><div class="progress-bar ${progressColor(pct)}" style="width:${pct}%"></div></div>
            </div>
            <div class="marks-score">${sub.obtained}<span style="color:#94a3b8;font-size:10px;">/${sub.total}</span></div>
            <div style="width:36px;"><span class="badge ${gradeClass(sub.grade)}" style="font-size:10px;">${sub.grade}</span></div>
          </div>`;
        }).join('')}
      </div>
      ${yr.remarks ? `<div style="margin-top:14px;padding:10px 14px;background:#f8fafc;border-radius:8px;border-left:3px solid #2563a8;font-size:13px;color:#475569;">
        <strong style="color:#1e293b;">Teacher's Remarks:</strong> ${yr.remarks}
      </div>` : ''}
    </div>
  </div>`).join('')}`;
}

/* ── Tab: Attendance ── */
function tabAttendance(s) {
  const history = s.attendanceHistory || [];
  if (!history.length) return `<div class="empty-state"><div class="icon">📅</div><p>No attendance records found.</p></div>`;

  const avgAtt = (history.reduce((a,h)=>a+h.percentage,0)/history.length).toFixed(1);
  return `
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:14px;margin-bottom:20px;">
  <div class="card" style="padding:18px;text-align:center;">
    <div style="font-size:12px;color:#64748b;font-weight:600;text-transform:uppercase;">Overall Avg</div>
    <div style="font-size:36px;font-weight:800;color:${attColor(avgAtt)};margin-top:6px;">${avgAtt}%</div>
    <div style="font-size:12px;color:#64748b;">${history.length} year${history.length!==1?'s':''} of data</div>
  </div>
  ${history.map(h=>`
  <div class="card" style="padding:18px;text-align:center;">
    <div style="font-size:12px;color:#64748b;font-weight:600;">${h.year}</div>
    <div style="font-size:30px;font-weight:800;color:${attColor(h.percentage)};margin:6px 0;">${fmt.pct(h.percentage)}</div>
    <div class="progress-bar-wrap" style="margin-bottom:6px;"><div class="progress-bar ${progressColor(h.percentage)}" style="width:${h.percentage}%"></div></div>
    <div style="font-size:11px;color:#64748b;">Present: <strong>${h.present}</strong> / ${h.totalDays}</div>
    <div style="font-size:11px;color:#ef4444;margin-top:2px;">Absent: <strong>${h.absent}</strong></div>
  </div>`).join('')}
</div>
<div class="card">
  <div class="card-header"><span class="card-title">📊 Year-wise Attendance Summary</span></div>
  <div class="table-wrap">
    <table>
      <thead><tr><th>Year</th><th>Total Days</th><th>Present</th><th>Absent</th><th>Leaves</th><th>Percentage</th><th>Status</th></tr></thead>
      <tbody>
        ${history.map(h=>`
          <tr>
            <td><strong>${h.year}</strong></td>
            <td>${h.totalDays}</td>
            <td style="color:#10b981;font-weight:600;">${h.present}</td>
            <td style="color:#ef4444;font-weight:600;">${h.absent}</td>
            <td>${h.leaves}</td>
            <td>
              <div style="display:flex;align-items:center;gap:8px;">
                <div style="flex:1;max-width:80px;" class="progress-bar-wrap"><div class="progress-bar ${progressColor(h.percentage)}" style="width:${h.percentage}%"></div></div>
                <strong style="color:${attColor(h.percentage)};">${fmt.pct(h.percentage)}</strong>
              </div>
            </td>
            <td><span class="badge ${h.percentage>=90?'badge-success':h.percentage>=75?'badge-info':'badge-warning'}">${h.percentage>=90?'Excellent':h.percentage>=75?'Good':'Needs Improvement'}</span></td>
          </tr>`).join('')}
      </tbody>
    </table>
  </div>
</div>`;
}

/* ── Tab: Fees ── */
function tabFees(s) {
  const history = s.feeHistory || [];
  if (!history.length) return `<div class="empty-state"><div class="icon">💰</div><p>No fee records found.</p></div>`;

  const totalPaid    = history.reduce((a,f)=>a+f.paid,0);
  const totalPending = history.reduce((a,f)=>a+f.pending,0);
  const totalAnnual  = history.reduce((a,f)=>a+f.annual,0);

  return `
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:14px;margin-bottom:20px;">
  <div class="stat-card">
    <div class="stat-icon blue">💵</div>
    <div><div class="stat-num" style="font-size:20px;">${fmt.money(totalAnnual)}</div><div class="stat-label">Total Billed</div></div>
  </div>
  <div class="stat-card">
    <div class="stat-icon green">✅</div>
    <div><div class="stat-num" style="font-size:20px;">${fmt.money(totalPaid)}</div><div class="stat-label">Total Paid</div></div>
  </div>
  <div class="stat-card">
    <div class="stat-icon red">⏳</div>
    <div><div class="stat-num" style="font-size:20px;">${fmt.money(totalPending)}</div><div class="stat-label">Outstanding</div></div>
  </div>
</div>
${history.slice().reverse().map(f=>`
  <div class="fee-year-card" style="margin-bottom:14px;">
    <div class="fee-year-header">
      <div>
        <span style="font-size:15px;font-weight:700;color:var(--primary);">📅 ${f.year}</span>
        <span style="font-size:12px;color:#64748b;margin-left:10px;">Annual Fee: ${fmt.money(f.annual)}</span>
      </div>
      <span class="badge ${f.status==='Paid'?'badge-success':f.status==='Partial'?'badge-warning':'badge-danger'}" style="font-size:12px;">${f.status}</span>
    </div>
    <div style="display:flex;gap:20px;margin-bottom:12px;flex-wrap:wrap;">
      <div><span style="font-size:11px;color:#64748b;text-transform:uppercase;">Paid</span><br><strong style="color:#10b981;">${fmt.money(f.paid)}</strong></div>
      ${f.pending>0 ? `<div><span style="font-size:11px;color:#64748b;text-transform:uppercase;">Pending</span><br><strong style="color:#ef4444;">${fmt.money(f.pending)}</strong></div>` : ''}
    </div>
    <div class="progress-bar-wrap" style="margin-bottom:12px;"><div class="progress-bar ${progressColor(f.paid/f.annual*100)}" style="width:${f.paid/f.annual*100}%"></div></div>
    <div style="font-size:12px;color:#64748b;font-weight:600;margin-bottom:8px;">Payment Transactions</div>
    ${f.payments.map(p=>`
      <div class="fee-payment-row">
        <span style="font-size:18px;">💳</span>
        <div style="flex:1;">
          <div style="font-weight:600;font-size:13px;">${p.for}</div>
          <div style="font-size:11px;color:#64748b;">${fmt.date(p.date)} &nbsp;•&nbsp; ${p.mode} &nbsp;•&nbsp; Receipt: ${p.receipt}</div>
        </div>
        <div style="font-size:14px;font-weight:700;color:#10b981;">${fmt.money(p.amount)}</div>
      </div>`).join('')}
  </div>`).join('')}`;
}

/* ── Tab: Activities ── */
function tabActivities(s) {
  const activities = s.extracurricular || [];
  const certs      = s.certificates    || [];
  const disc       = s.disciplinary    || [];

  return `
<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
  <div>
    <div class="card" style="margin-bottom:16px;">
      <div class="card-header"><span class="card-title">🏆 Extra-Curricular History</span></div>
      <div class="card-body" style="padding:0;">
        ${activities.length ? activities.slice().reverse().map(a=>`
          <div style="padding:14px 18px;border-bottom:1px solid var(--border);">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
              <strong style="color:var(--primary);">${a.year}</strong>
            </div>
            <div style="margin-bottom:6px;">
              ${a.activities.map(act=>`<span class="chip" style="margin:2px;">${act}</span>`).join('')}
            </div>
            <div>
              ${a.achievements.map(ach=>`<div style="font-size:12px;padding:3px 0;color:#047857;">🏅 ${ach}</div>`).join('')}
            </div>
          </div>`).join('') : `<div style="padding:20px;text-align:center;color:#94a3b8;">No activities recorded</div>`}
      </div>
    </div>
    <div class="card">
      <div class="card-header"><span class="card-title">⚠️ Disciplinary Records</span></div>
      <div class="card-body" style="padding:0;">
        ${disc.length ? disc.map(d=>`
          <div style="padding:14px 18px;border-bottom:1px solid var(--border);">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px;">
              <span style="font-weight:600;font-size:13px;">${d.incident}</span>
              <span class="badge ${d.severity==='Minor'?'badge-warning':'badge-danger'}">${d.severity}</span>
            </div>
            <div style="font-size:12px;color:#64748b;">${fmt.date(d.date)} &nbsp;•&nbsp; By: ${d.resolvedBy}</div>
            <div style="font-size:12px;color:#1e293b;margin-top:4px;">Action: ${d.action}</div>
            <div style="margin-top:4px;"><span class="badge badge-success">${d.status}</span></div>
          </div>`).join('') :
          `<div style="padding:24px;text-align:center;">
            <div style="font-size:32px;">✅</div>
            <div style="color:#10b981;font-weight:700;margin-top:6px;">Clean Discipline Record</div>
            <div style="font-size:12px;color:#64748b;margin-top:4px;">No incidents recorded</div>
          </div>`}
      </div>
    </div>
  </div>

  <div class="card">
    <div class="card-header"><span class="card-title">🎓 Certificates & Awards</span></div>
    <div class="card-body" style="padding:0;">
      ${certs.length ? certs.map((c,i)=>`
        <div style="display:flex;align-items:center;gap:12px;padding:12px 18px;border-bottom:1px solid var(--border);">
          <div style="width:36px;height:36px;border-radius:50%;background:${['#fef3c7','#d1fae5','#dbeafe','#ede9fe','#fce7f3'][i%5]};display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;">🏅</div>
          <div style="flex:1;">
            <div style="font-weight:600;font-size:13px;">${c.name}</div>
            <div style="font-size:11px;color:#64748b;">${fmt.date(c.date)} &nbsp;•&nbsp; ${c.issuedBy}</div>
          </div>
        </div>`).join('') : `<div style="padding:20px;text-align:center;color:#94a3b8;">No certificates yet</div>`}
    </div>
  </div>
</div>`;
}

/* ── Tab: Health ── */
function tabHealth(s) {
  const records = s.healthRecords || [];
  return `
<div class="card">
  <div class="card-header"><span class="card-title">🏥 Health Records</span></div>
  <div class="table-wrap">
    <table>
      <thead><tr><th>Date</th><th>Type</th><th>Notes</th></tr></thead>
      <tbody>
        ${records.length ? records.slice().reverse().map(r=>`
          <tr>
            <td><strong>${fmt.date(r.date)}</strong></td>
            <td><span class="badge badge-info">${r.type}</span></td>
            <td style="font-size:13px;color:#475569;">${r.notes}</td>
          </tr>`).join('') :
          `<tr><td colspan="3" style="text-align:center;padding:24px;color:#94a3b8;">No health records found</td></tr>`}
      </tbody>
    </table>
  </div>
</div>`;
}

/* ── Tab: Documents ── */
function tabDocuments(s) {
  const docs = s.documents || [];
  return `
<div class="card">
  <div class="card-header">
    <span class="card-title">📄 Submitted Documents</span>
    <span class="badge badge-success">${docs.filter(d=>d.status==='Verified').length}/${docs.length} Verified</span>
  </div>
  <div class="table-wrap">
    <table>
      <thead><tr><th>Document</th><th>Submitted On</th><th>Status</th></tr></thead>
      <tbody>
        ${docs.map(d=>`
          <tr>
            <td>
              <div style="display:flex;align-items:center;gap:10px;">
                <span style="font-size:20px;">📋</span>
                <span style="font-weight:600;">${d.name}</span>
              </div>
            </td>
            <td>${fmt.date(d.date)}</td>
            <td><span class="badge ${d.status==='Verified'?'badge-success':'badge-warning'}">${d.status}</span></td>
          </tr>`).join('')}
      </tbody>
    </table>
  </div>
</div>`;
}

/* ── Tab: Journey Timeline ── */
function tabTimeline(s) {
  // Build flat event list sorted by date
  const events = [];
  events.push({ date: s.enrollmentDate, type:'enrollment', label:'Enrolled in School', detail:`Joined ${DB.getSchool().name} as Class ${s.academicHistory[0]?.class||''}`, dot:'green' });

  (s.academicHistory||[]).forEach(y=>{
    events.push({ date:`${y.year.split('-')[1]}-03-31`, type:'academic', label:`Passed ${y.class} — ${y.year}`, detail:`${fmt.pct(y.percentage)} | Grade: ${y.grade} | Rank #${y.rank} | ${y.result}`, dot: y.percentage>=85?'green':'blue' });
  });
  (s.extracurricular||[]).forEach(a=>{
    (a.achievements||[]).forEach(ach=>{
      events.push({ date:`${a.year.split('-')[1]}-01-15`, type:'achievement', label:ach, detail:`Extra-curricular — ${a.year}`, dot:'amber' });
    });
  });
  (s.disciplinary||[]).forEach(d=>{
    events.push({ date:d.date, type:'disciplinary', label:d.incident, detail:`Action: ${d.action} (${d.status})`, dot:'red' });
  });
  (s.certificates||[]).forEach(c=>{
    events.push({ date:c.date, type:'certificate', label:`Awarded: ${c.name}`, detail:`By ${c.issuedBy}`, dot:'amber' });
  });

  events.sort((a,b)=>new Date(b.date)-new Date(a.date));

  const icons = { enrollment:'🏫', academic:'📚', achievement:'🏆', disciplinary:'⚠️', certificate:'🎓' };

  return `
<div class="card">
  <div class="card-header"><span class="card-title">🕐 Student Journey at ${DB.getSchool().name}</span></div>
  <div class="card-body">
    <div class="timeline">
      ${events.map(e=>`
        <div class="timeline-item">
          <div class="timeline-dot ${e.dot}"></div>
          <div class="timeline-year">${fmt.date(e.date)}</div>
          <div class="timeline-card">
            <div style="display:flex;align-items:flex-start;gap:10px;">
              <span style="font-size:20px;">${icons[e.type]||'📌'}</span>
              <div>
                <div style="font-weight:700;font-size:13px;color:var(--primary);">${e.label}</div>
                <div style="font-size:12px;color:#64748b;margin-top:2px;">${e.detail}</div>
              </div>
            </div>
          </div>
        </div>`).join('')}
    </div>
  </div>
</div>`;
}

/* ─── Add Student View ───────────────────────────────────────────────────────── */
function renderAddStudent() {
  return `
<div class="page-content">
  <div class="breadcrumb">
    <a onclick="navigate('students')" style="cursor:pointer;">Students</a>
    <span>›</span><span>New Admission</span>
  </div>
  <div style="max-width:900px;">
    <div class="card">
      <div class="card-header">
        <span class="card-title">📝 New Student Admission Form</span>
        <span class="badge badge-info">2024-25</span>
      </div>
      <div class="card-body">
        <div id="formAlert"></div>
        <form id="admissionForm" onsubmit="submitAdmission(event)">
          <div class="form-section">Personal Information</div>
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">Full Name *</label>
              <input class="form-control" name="name" required placeholder="Student's full name">
            </div>
            <div class="form-group">
              <label class="form-label">Date of Birth *</label>
              <input class="form-control" type="date" name="dob" required>
            </div>
            <div class="form-group">
              <label class="form-label">Gender *</label>
              <select class="form-control" name="gender" required>
                <option value="">Select</option>
                <option>Male</option><option>Female</option><option>Other</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Blood Group</label>
              <select class="form-control" name="bloodGroup">
                <option value="">Select</option>
                ${['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(b=>`<option>${b}</option>`).join('')}
              </select>
            </div>
          </div>

          <div class="form-section">Admission Details</div>
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">Admission Date *</label>
              <input class="form-control" type="date" name="enrollmentDate" required value="${new Date().toISOString().split('T')[0]}">
            </div>
            <div class="form-group">
              <label class="form-label">Class *</label>
              <select class="form-control" name="currentClass" required>
                <option value="">Select Class</option>
                ${SEED_DATA.classes.map(c=>`<option>${c}</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Section *</label>
              <select class="form-control" name="currentSection" required>
                <option value="">Select Section</option>
                ${SEED_DATA.sections.map(s=>`<option>${s}</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Roll No.</label>
              <input class="form-control" name="rollNo" placeholder="e.g. 01">
            </div>
          </div>

          <div class="form-section">Guardian Information</div>
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">Father's Name *</label>
              <input class="form-control" name="fatherName" required placeholder="Father's full name">
            </div>
            <div class="form-group">
              <label class="form-label">Father's Occupation</label>
              <input class="form-control" name="fatherOccupation" placeholder="e.g. Engineer">
            </div>
            <div class="form-group">
              <label class="form-label">Mother's Name</label>
              <input class="form-control" name="motherName" placeholder="Mother's full name">
            </div>
            <div class="form-group">
              <label class="form-label">Mother's Occupation</label>
              <input class="form-control" name="motherOccupation" placeholder="e.g. Teacher">
            </div>
          </div>

          <div class="form-section">Contact Details</div>
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">Phone *</label>
              <input class="form-control" name="phone" required placeholder="+91 XXXXX XXXXX">
            </div>
            <div class="form-group">
              <label class="form-label">Email</label>
              <input class="form-control" type="email" name="email" placeholder="parent@email.com">
            </div>
            <div class="form-group">
              <label class="form-label">Emergency Contact</label>
              <input class="form-control" name="emergencyContact" placeholder="+91 XXXXX XXXXX">
            </div>
            <div class="form-group" style="grid-column:1/-1">
              <label class="form-label">Address *</label>
              <input class="form-control" name="address" required placeholder="Full residential address">
            </div>
          </div>

          <div style="display:flex;gap:10px;margin-top:24px;">
            <button type="submit" class="btn btn-primary">✅ Submit Admission</button>
            <button type="reset" class="btn btn-outline">↺ Reset Form</button>
            <a onclick="navigate('students')" class="btn btn-outline" style="cursor:pointer;">✕ Cancel</a>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>`;
}

/* ─── Reports View ───────────────────────────────────────────────────────────── */
function renderReports() {
  const students = DB.getStudents();
  const allAcad  = students.flatMap(s=>(s.academicHistory||[]).map(a=>({...a, studentName:s.name, studentId:s.id})));
  const topAcad  = [...allAcad].sort((a,b)=>b.percentage-a.percentage).slice(0,10);
  const feeReport = students.map(s=>{
    const total   = (s.feeHistory||[]).reduce((a,f)=>a+f.annual,0);
    const paid    = (s.feeHistory||[]).reduce((a,f)=>a+f.paid,0);
    const pending = (s.feeHistory||[]).reduce((a,f)=>a+f.pending,0);
    return { ...s, totalFee:total, paidFee:paid, pendingFee:pending };
  });

  return `
<div class="page-content">
  <h2 style="font-size:18px;font-weight:800;color:var(--primary);margin-bottom:20px;">📊 Reports & Analytics</h2>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:24px;">
    <!-- Fee Summary -->
    <div class="card">
      <div class="card-header"><span class="card-title">💰 Fee Collection Report</span></div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Student</th><th>Class</th><th>Total</th><th>Paid</th><th>Pending</th><th>Status</th></tr></thead>
          <tbody>
            ${feeReport.map(s=>`
              <tr onclick="navigate('student',{id:'${s.id}'})" style="cursor:pointer;">
                <td><strong>${s.name}</strong></td>
                <td>${s.currentClass}</td>
                <td>${fmt.money(s.totalFee)}</td>
                <td style="color:#10b981;">${fmt.money(s.paidFee)}</td>
                <td style="color:${s.pendingFee>0?'#ef4444':'#10b981'};">${fmt.money(s.pendingFee)}</td>
                <td><span class="badge ${s.pendingFee===0?'badge-success':'badge-warning'}">${s.pendingFee===0?'Cleared':'Pending'}</span></td>
              </tr>`).join('')}
            <tr style="background:#f8fafc;font-weight:700;">
              <td colspan="2">Total</td>
              <td>${fmt.money(feeReport.reduce((a,s)=>a+s.totalFee,0))}</td>
              <td style="color:#10b981;">${fmt.money(feeReport.reduce((a,s)=>a+s.paidFee,0))}</td>
              <td style="color:#ef4444;">${fmt.money(feeReport.reduce((a,s)=>a+s.pendingFee,0))}</td>
              <td>—</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Top Academic -->
    <div class="card">
      <div class="card-header"><span class="card-title">🏆 Top Academic Performances (All Years)</span></div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>#</th><th>Student</th><th>Year</th><th>Class</th><th>Score</th><th>Grade</th></tr></thead>
          <tbody>
            ${topAcad.map((a,i)=>`
              <tr onclick="navigate('student',{id:'${a.studentId}'})" style="cursor:pointer;">
                <td>${i<3?['🥇','🥈','🥉'][i]:i+1}</td>
                <td><strong>${a.studentName}</strong></td>
                <td>${a.year}</td>
                <td>${a.class}</td>
                <td><span class="badge ${a.percentage>=90?'badge-success':'badge-info'}">${fmt.pct(a.percentage)}</span></td>
                <td><span class="badge ${gradeClass(a.grade)}">${a.grade}</span></td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Attendance Summary -->
  <div class="card">
    <div class="card-header"><span class="card-title">📅 Attendance Summary (Latest Year)</span></div>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Student</th><th>Class</th><th>Year</th><th>Present</th><th>Absent</th><th>Attendance %</th><th>Status</th></tr></thead>
        <tbody>
          ${students.map(s=>{
            const att = (s.attendanceHistory||[]).slice(-1)[0];
            if (!att) return '';
            return `<tr onclick="navigate('student',{id:'${s.id}'})" style="cursor:pointer;">
              <td><strong>${s.name}</strong></td>
              <td>${s.currentClass}-${s.currentSection}</td>
              <td>${att.year}</td>
              <td style="color:#10b981;">${att.present}</td>
              <td style="color:#ef4444;">${att.absent}</td>
              <td>
                <div style="display:flex;align-items:center;gap:8px;">
                  <div class="progress-bar-wrap" style="flex:1;max-width:80px;"><div class="progress-bar ${progressColor(att.percentage)}" style="width:${att.percentage}%"></div></div>
                  <strong style="color:${attColor(att.percentage)};">${fmt.pct(att.percentage)}</strong>
                </div>
              </td>
              <td><span class="badge ${att.percentage>=90?'badge-success':att.percentage>=75?'badge-info':'badge-warning'}">${att.percentage>=90?'Excellent':att.percentage>=75?'Good':'Needs Attention'}</span></td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>
  </div>
</div>`;
}

/* ─── Teachers View ──────────────────────────────────────────────────────────── */
function renderTeachers() {
  const teachers = DB.getTeachers();
  return `
<div class="page-content">
  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;">
    <div><h2 style="font-size:18px;font-weight:800;color:var(--primary);">Teaching Staff</h2>
    <p style="font-size:12px;color:#64748b;">${teachers.length} staff members</p></div>
  </div>
  <div class="student-grid">
    ${teachers.map(t=>`
      <div class="student-card" style="cursor:default;">
        <div class="student-avatar" style="background:linear-gradient(135deg,#059669,#10b981);">${fmt.initials(t.name)}</div>
        <h3>${t.name}</h3>
        <p>${t.id}</p>
        <div class="student-meta"><span class="badge badge-success">${t.subject}</span></div>
        <div style="margin-top:12px;font-size:12px;color:#64748b;text-align:center;">
          <div>${t.phone}</div>
          <div>${t.email}</div>
        </div>
      </div>`).join('')}
  </div>
</div>`;
}
