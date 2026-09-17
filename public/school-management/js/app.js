/* ─── Router ─────────────────────────────────────────────────────────────────── */
let currentRoute  = 'dashboard';
let currentParams = {};
let searchTimer   = null;

function navigate(route, params = {}) {
  currentRoute  = route;
  currentParams = params;
  renderApp();
  window.scrollTo(0, 0);
}

function scrollToYear(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function switchTab(name, btn) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  const panel = document.getElementById('tab-' + name);
  if (panel) panel.classList.add('active');
  if (btn)  btn.classList.add('active');
}

function searchStudents(q) {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    document.getElementById('main-content').innerHTML = renderStudents(q);
  }, 250);
}

function submitAdmission(e) {
  e.preventDefault();
  const fd = new FormData(e.target);
  const v  = Object.fromEntries(fd.entries());

  const student = {
    name:            v.name.trim(),
    dob:             v.dob,
    gender:          v.gender,
    bloodGroup:      v.bloodGroup || '—',
    enrollmentDate:  v.enrollmentDate,
    currentClass:    v.currentClass,
    currentSection:  v.currentSection,
    rollNo:          v.rollNo || '—',
    status:          'Active',
    photo:           null,
    contact: {
      phone:   v.phone,
      email:   v.email   || '',
      address: v.address
    },
    guardian: {
      fatherName:        v.fatherName,
      fatherOccupation:  v.fatherOccupation || '',
      motherName:        v.motherName       || '',
      motherOccupation:  v.motherOccupation || '',
      emergencyContact:  v.emergencyContact || v.phone
    },
    documents:        [],
    academicHistory:  [],
    attendanceHistory:[],
    feeHistory:       [],
    extracurricular:  [],
    disciplinary:     [],
    healthRecords:    [],
    certificates:     []
  };

  const saved = DB.addStudent(student);
  const alertEl = document.getElementById('formAlert');
  alertEl.innerHTML = `<div class="alert alert-success">✅ Student admitted successfully! Admission No: <strong>${saved.admissionNo}</strong> &nbsp;|&nbsp; ID: <strong>${saved.id}</strong>
    <a onclick="navigate('student',{id:'${saved.id}'})" style="margin-left:12px;font-weight:700;color:#065f46;text-decoration:underline;cursor:pointer;">View Profile →</a>
  </div>`;
  e.target.reset();
  document.getElementById('formAlert').scrollIntoView({ behavior: 'smooth' });
}

/* ─── Render ─────────────────────────────────────────────────────────────────── */
function renderApp() {
  const content = document.getElementById('main-content');
  const title   = document.getElementById('page-title');
  const subtitle= document.getElementById('page-subtitle');

  // Update nav active state
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.dataset.route === currentRoute);
  });

  switch (currentRoute) {
    case 'dashboard':
      title.textContent    = 'Dashboard';
      subtitle.textContent = 'Overview of school activities';
      content.innerHTML    = renderDashboard();
      break;
    case 'students':
      title.textContent    = 'Students';
      subtitle.textContent = 'Manage all student records';
      content.innerHTML    = renderStudents();
      break;
    case 'student':
      title.textContent    = 'Student Profile';
      subtitle.textContent = 'Complete history & records';
      content.innerHTML    = renderStudentDetail(currentParams.id);
      break;
    case 'add-student':
      title.textContent    = 'New Admission';
      subtitle.textContent = 'Register a new student';
      content.innerHTML    = renderAddStudent();
      break;
    case 'reports':
      title.textContent    = 'Reports';
      subtitle.textContent = 'Analytics & summaries';
      content.innerHTML    = renderReports();
      break;
    case 'teachers':
      title.textContent    = 'Teachers';
      subtitle.textContent = 'Teaching staff directory';
      content.innerHTML    = renderTeachers();
      break;
    default:
      content.innerHTML = `<div class="page-content"><div class="empty-state"><div class="icon">🚧</div><p>Page not found.</p></div></div>`;
  }
}

/* ─── Sidebar Toggle (Mobile) ────────────────────────────────────────────────── */
function toggleSidebar() {
  document.querySelector('.sidebar').classList.toggle('open');
  document.querySelector('.overlay').classList.toggle('open');
}

/* ─── Boot ───────────────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  DB.init();

  // Fill school info
  const school = DB.getSchool();
  document.getElementById('school-name').textContent = school.name;
  document.getElementById('school-sub').textContent  = 'Est. ' + school.established;
  document.title = school.name + ' – SMS';

  // Nav click delegation
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navigate(link.dataset.route);
      // Close sidebar on mobile
      document.querySelector('.sidebar').classList.remove('open');
      document.querySelector('.overlay').classList.remove('open');
    });
  });

  // Overlay click
  document.querySelector('.overlay').addEventListener('click', toggleSidebar);

  // Hamburger
  document.querySelector('.hamburger').addEventListener('click', toggleSidebar);

  // Initial render
  renderApp();
});
