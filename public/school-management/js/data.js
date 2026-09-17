// ─── Seed Data ───────────────────────────────────────────────────────────────
const SEED_DATA = {
  school: {
    name: "Arkaserve Public School",
    established: "2005",
    principal: "Dr. Meena Iyer",
    address: "12 Sunrise Avenue, Hyderabad – 500032",
    phone: "+91 40 2345 6789",
    email: "admin@arkaserve.edu.in",
    logo: "🏫"
  },

  classes: ["Nursery","LKG","UKG","1st","2nd","3rd","4th","5th","6th","7th","8th","9th","10th","11th","12th"],
  sections: ["A","B","C","D"],
  subjects: {
    primary:   ["Mathematics","English","Hindi","Environmental Science","Drawing","Physical Education"],
    middle:    ["Mathematics","English","Hindi","Science","Social Studies","Computer","Physical Education"],
    secondary: ["Mathematics","English","Hindi","Physics","Chemistry","Biology","Social Science","Computer","Physical Education"],
    senior:    ["English","Physics","Chemistry","Mathematics","Biology","Computer Science","Physical Education"]
  },

  teachers: [
    { id:"T01", name:"Mrs. Ananya Sharma",   subject:"Mathematics",    phone:"+91 9876501001", email:"ananya@arkaserve.edu.in" },
    { id:"T02", name:"Mr. Ravi Kulkarni",    subject:"Science",        phone:"+91 9876501002", email:"ravi@arkaserve.edu.in" },
    { id:"T03", name:"Mrs. Deepa Nair",      subject:"English",        phone:"+91 9876501003", email:"deepa@arkaserve.edu.in" },
    { id:"T04", name:"Mr. Suresh Reddy",     subject:"Social Studies", phone:"+91 9876501004", email:"suresh@arkaserve.edu.in" },
    { id:"T05", name:"Mrs. Kavitha Menon",   subject:"Hindi",          phone:"+91 9876501005", email:"kavitha@arkaserve.edu.in" },
    { id:"T06", name:"Mr. Arun Pillai",      subject:"Computer",       phone:"+91 9876501006", email:"arun@arkaserve.edu.in" }
  ],

  students: [
    {
      id: "STU001",
      admissionNo: "ADM2018001",
      rollNo: "01",
      name: "Rahul Kumar",
      dob: "2009-03-15",
      gender: "Male",
      bloodGroup: "B+",
      enrollmentDate: "2018-06-01",
      currentClass: "9th",
      currentSection: "A",
      status: "Active",
      photo: null,
      contact: {
        phone: "+91 9876543210",
        email: "parent.rahul@gmail.com",
        address: "45 Lake View Colony, Hyderabad – 500034"
      },
      guardian: {
        fatherName: "Rajesh Kumar",
        fatherOccupation: "Software Engineer",
        motherName: "Priya Kumar",
        motherOccupation: "Teacher",
        emergencyContact: "+91 9876543211"
      },
      documents: [
        { name:"Birth Certificate",     date:"2018-06-01", status:"Verified" },
        { name:"Previous TC",           date:"2018-06-01", status:"Verified" },
        { name:"Aadhar Card",           date:"2018-06-05", status:"Verified" },
        { name:"Medical Certificate",   date:"2018-06-05", status:"Verified" },
        { name:"Passport Photo (4 nos)",date:"2018-06-01", status:"Verified" }
      ],
      academicHistory: [
        {
          year:"2018-19", class:"4th", section:"B", classTeacher:"Mrs. Ananya Sharma",
          subjects:[
            { name:"Mathematics",         total:100, obtained:88, grade:"A" },
            { name:"English",             total:100, obtained:76, grade:"B+" },
            { name:"Hindi",               total:100, obtained:72, grade:"B" },
            { name:"Environmental Science",total:100, obtained:84, grade:"A" },
            { name:"Drawing",             total:50,  obtained:42, grade:"A" },
            { name:"Physical Education",  total:50,  obtained:45, grade:"A+" }
          ],
          totalMarks:500, obtained:407, percentage:81.4, grade:"A", rank:3, result:"PASS",
          remarks:"Excellent performance. Shows great aptitude in Mathematics."
        },
        {
          year:"2019-20", class:"5th", section:"A", classTeacher:"Mrs. Deepa Nair",
          subjects:[
            { name:"Mathematics",         total:100, obtained:91, grade:"A+" },
            { name:"English",             total:100, obtained:80, grade:"A" },
            { name:"Hindi",               total:100, obtained:74, grade:"B+" },
            { name:"Environmental Science",total:100, obtained:87, grade:"A" },
            { name:"Drawing",             total:50,  obtained:44, grade:"A+" },
            { name:"Physical Education",  total:50,  obtained:46, grade:"A+" }
          ],
          totalMarks:500, obtained:422, percentage:84.4, grade:"A", rank:2, result:"PASS",
          remarks:"Consistent improvement. Active participant in class activities."
        },
        {
          year:"2020-21", class:"6th", section:"A", classTeacher:"Mr. Ravi Kulkarni",
          subjects:[
            { name:"Mathematics",    total:100, obtained:89, grade:"A" },
            { name:"English",        total:100, obtained:82, grade:"A" },
            { name:"Hindi",          total:100, obtained:70, grade:"B" },
            { name:"Science",        total:100, obtained:86, grade:"A" },
            { name:"Social Studies", total:100, obtained:78, grade:"B+" },
            { name:"Computer",       total:100, obtained:92, grade:"A+" },
            { name:"Physical Education",total:50, obtained:45, grade:"A+" }
          ],
          totalMarks:650, obtained:542, percentage:83.4, grade:"A", rank:4, result:"PASS",
          remarks:"Online mode due to COVID-19. Excellent adaptability shown."
        },
        {
          year:"2021-22", class:"7th", section:"B", classTeacher:"Mrs. Kavitha Menon",
          subjects:[
            { name:"Mathematics",    total:100, obtained:94, grade:"A+" },
            { name:"English",        total:100, obtained:85, grade:"A" },
            { name:"Hindi",          total:100, obtained:73, grade:"B+" },
            { name:"Science",        total:100, obtained:90, grade:"A+" },
            { name:"Social Studies", total:100, obtained:80, grade:"A" },
            { name:"Computer",       total:100, obtained:95, grade:"A+" },
            { name:"Physical Education",total:50, obtained:47, grade:"A+" }
          ],
          totalMarks:650, obtained:564, percentage:86.8, grade:"A+", rank:1, result:"PASS",
          remarks:"Outstanding student. School topper in Mathematics and Computer."
        },
        {
          year:"2022-23", class:"8th", section:"A", classTeacher:"Mr. Suresh Reddy",
          subjects:[
            { name:"Mathematics",    total:100, obtained:92, grade:"A+" },
            { name:"English",        total:100, obtained:83, grade:"A" },
            { name:"Hindi",          total:100, obtained:71, grade:"B" },
            { name:"Science",        total:100, obtained:88, grade:"A" },
            { name:"Social Studies", total:100, obtained:79, grade:"B+" },
            { name:"Computer",       total:100, obtained:96, grade:"A+" },
            { name:"Physical Education",total:50, obtained:46, grade:"A+" }
          ],
          totalMarks:650, obtained:555, percentage:85.4, grade:"A", rank:2, result:"PASS",
          remarks:"Excellent performance. Won district-level Math Olympiad."
        },
        {
          year:"2023-24", class:"9th", section:"A", classTeacher:"Mrs. Ananya Sharma",
          subjects:[
            { name:"Mathematics",    total:100, obtained:95, grade:"A+" },
            { name:"English",        total:100, obtained:86, grade:"A" },
            { name:"Hindi",          total:100, obtained:74, grade:"B+" },
            { name:"Physics",        total:100, obtained:89, grade:"A" },
            { name:"Chemistry",      total:100, obtained:84, grade:"A" },
            { name:"Biology",        total:100, obtained:80, grade:"A" },
            { name:"Computer",       total:100, obtained:97, grade:"A+" },
            { name:"Physical Education",total:50, obtained:46, grade:"A+" }
          ],
          totalMarks:750, obtained:651, percentage:86.8, grade:"A+", rank:1, result:"PASS",
          remarks:"Exceptional student. State-level Olympiad qualifier."
        }
      ],
      attendanceHistory: [
        { year:"2018-19", totalDays:220, present:198, absent:22, percentage:90.0, leaves:5 },
        { year:"2019-20", totalDays:218, present:205, absent:13, percentage:94.0, leaves:3 },
        { year:"2020-21", totalDays:160, present:155, absent:5,  percentage:96.9, leaves:1 },
        { year:"2021-22", totalDays:222, present:215, absent:7,  percentage:96.8, leaves:2 },
        { year:"2022-23", totalDays:225, present:218, absent:7,  percentage:96.9, leaves:2 },
        { year:"2023-24", totalDays:220, present:212, absent:8,  percentage:96.4, leaves:3 }
      ],
      feeHistory: [
        { year:"2018-19", annual:48000, paid:48000, pending:0, status:"Paid",
          payments:[
            { date:"2018-06-01", amount:24000, mode:"Cheque", receipt:"REC180001", for:"Term 1" },
            { date:"2018-11-05", amount:24000, mode:"Online", receipt:"REC180042", for:"Term 2" }
          ]
        },
        { year:"2019-20", annual:52000, paid:52000, pending:0, status:"Paid",
          payments:[
            { date:"2019-06-02", amount:26000, mode:"Online", receipt:"REC190010", for:"Term 1" },
            { date:"2019-11-08", amount:26000, mode:"Online", receipt:"REC190055", for:"Term 2" }
          ]
        },
        { year:"2020-21", annual:48000, paid:48000, pending:0, status:"Paid",
          payments:[
            { date:"2020-08-15", amount:48000, mode:"Online", receipt:"REC200015", for:"Full Year (COVID discount)" }
          ]
        },
        { year:"2021-22", annual:55000, paid:55000, pending:0, status:"Paid",
          payments:[
            { date:"2021-06-01", amount:27500, mode:"Online", receipt:"REC210008", for:"Term 1" },
            { date:"2021-11-03", amount:27500, mode:"Online", receipt:"REC210060", for:"Term 2" }
          ]
        },
        { year:"2022-23", annual:58000, paid:58000, pending:0, status:"Paid",
          payments:[
            { date:"2022-06-05", amount:29000, mode:"Online", receipt:"REC220012", for:"Term 1" },
            { date:"2022-11-10", amount:29000, mode:"Online", receipt:"REC220072", for:"Term 2" }
          ]
        },
        { year:"2023-24", annual:62000, paid:52000, pending:10000, status:"Partial",
          payments:[
            { date:"2023-06-01", amount:31000, mode:"Online", receipt:"REC230009", for:"Term 1" },
            { date:"2023-11-01", amount:21000, mode:"Online", receipt:"REC230061", for:"Term 2 (Partial)" }
          ]
        }
      ],
      extracurricular: [
        { year:"2018-19", activities:["Cricket","Drawing Club"],        achievements:["Participated in Annual Sports Day"] },
        { year:"2019-20", activities:["Cricket","Science Club"],        achievements:["Best Science Project – Silver Medal","School Cricket Team Member"] },
        { year:"2020-21", activities:["Online Quiz","Coding Club"],     achievements:["1st Place – Online Math Quiz (School Level)"] },
        { year:"2021-22", activities:["Cricket","Math Olympiad","Coding"],achievements:["School Topper in Math","District Cricket Runner-Up"] },
        { year:"2022-23", activities:["Math Olympiad","Coding","Debate"],achievements:["District Math Olympiad 1st Place","Best Debater Award"] },
        { year:"2023-24", activities:["Math Olympiad","Science Expo","Coding"],achievements:["State Math Olympiad Qualifier","Science Expo Gold Medal"] }
      ],
      disciplinary: [
        { date:"2019-09-12", incident:"Late arrival to school",    severity:"Minor",  action:"Verbal warning",         resolvedBy:"Class Teacher",  status:"Resolved" },
        { date:"2021-02-18", incident:"Missing homework thrice",   severity:"Minor",  action:"Parent meeting called",  resolvedBy:"Class Teacher",  status:"Resolved" }
      ],
      healthRecords: [
        { date:"2018-06-05", type:"Medical Check-up",  notes:"Healthy. Vision – 6/6. No allergies noted." },
        { date:"2019-06-03", type:"Annual Check-up",   notes:"Weight 32 kg, Height 135 cm. Good health." },
        { date:"2020-06-10", type:"Annual Check-up",   notes:"Weight 38 kg, Height 143 cm. Good health." },
        { date:"2021-06-07", type:"Annual Check-up",   notes:"Weight 44 kg, Height 152 cm. Minor myopia – glasses advised." },
        { date:"2022-06-06", type:"Annual Check-up",   notes:"Weight 50 kg, Height 160 cm. Good health." },
        { date:"2023-06-05", type:"Annual Check-up",   notes:"Weight 56 kg, Height 167 cm. Good health. Plays cricket regularly." }
      ],
      certificates: [
        { name:"Enrollment Certificate",        date:"2018-06-01", issuedBy:"Principal" },
        { name:"Best Science Project (Silver)", date:"2019-11-20", issuedBy:"Science Dept." },
        { name:"Math Olympiad District Winner", date:"2023-02-14", issuedBy:"State Board" },
        { name:"Science Expo Gold Medal",        date:"2024-01-22", issuedBy:"Principal" },
        { name:"State Math Olympiad Qualifier", date:"2024-03-10", issuedBy:"State Board" }
      ]
    },

    {
      id: "STU002",
      admissionNo: "ADM2019002",
      rollNo: "12",
      name: "Priya Sharma",
      dob: "2010-07-22",
      gender: "Female",
      bloodGroup: "O+",
      enrollmentDate: "2019-06-03",
      currentClass: "8th",
      currentSection: "B",
      status: "Active",
      photo: null,
      contact: {
        phone: "+91 9876543220",
        email: "parent.priya@gmail.com",
        address: "78 Green Park, Secunderabad – 500015"
      },
      guardian: {
        fatherName: "Vikram Sharma",
        fatherOccupation: "Doctor",
        motherName: "Sunita Sharma",
        motherOccupation: "Homemaker",
        emergencyContact: "+91 9876543221"
      },
      documents: [
        { name:"Birth Certificate",      date:"2019-06-03", status:"Verified" },
        { name:"Previous TC",            date:"2019-06-03", status:"Verified" },
        { name:"Aadhar Card",            date:"2019-06-10", status:"Verified" },
        { name:"Medical Certificate",    date:"2019-06-10", status:"Verified" },
        { name:"Passport Photo (4 nos)", date:"2019-06-03", status:"Verified" }
      ],
      academicHistory: [
        {
          year:"2019-20", class:"4th", section:"C", classTeacher:"Mrs. Deepa Nair",
          subjects:[
            { name:"Mathematics",          total:100, obtained:78, grade:"B+" },
            { name:"English",              total:100, obtained:92, grade:"A+" },
            { name:"Hindi",                total:100, obtained:85, grade:"A" },
            { name:"Environmental Science",total:100, obtained:80, grade:"A" },
            { name:"Drawing",              total:50,  obtained:47, grade:"A+" },
            { name:"Physical Education",   total:50,  obtained:44, grade:"A+" }
          ],
          totalMarks:500, obtained:426, percentage:85.2, grade:"A", rank:2, result:"PASS",
          remarks:"Excellent in English and Drawing. Very creative student."
        },
        {
          year:"2020-21", class:"5th", section:"B", classTeacher:"Mrs. Kavitha Menon",
          subjects:[
            { name:"Mathematics",          total:100, obtained:82, grade:"A" },
            { name:"English",              total:100, obtained:94, grade:"A+" },
            { name:"Hindi",                total:100, obtained:88, grade:"A" },
            { name:"Environmental Science",total:100, obtained:84, grade:"A" },
            { name:"Drawing",              total:50,  obtained:49, grade:"A+" },
            { name:"Physical Education",   total:50,  obtained:45, grade:"A+" }
          ],
          totalMarks:500, obtained:442, percentage:88.4, grade:"A+", rank:1, result:"PASS",
          remarks:"School topper. Exceptional creative and language skills."
        },
        {
          year:"2021-22", class:"6th", section:"A", classTeacher:"Mr. Ravi Kulkarni",
          subjects:[
            { name:"Mathematics",    total:100, obtained:85, grade:"A" },
            { name:"English",        total:100, obtained:96, grade:"A+" },
            { name:"Hindi",          total:100, obtained:89, grade:"A" },
            { name:"Science",        total:100, obtained:82, grade:"A" },
            { name:"Social Studies", total:100, obtained:90, grade:"A+" },
            { name:"Computer",       total:100, obtained:78, grade:"B+" },
            { name:"Physical Education",total:50, obtained:46, grade:"A+" }
          ],
          totalMarks:650, obtained:566, percentage:87.1, grade:"A+", rank:1, result:"PASS",
          remarks:"Outstanding in English and Social Studies. School topper."
        },
        {
          year:"2022-23", class:"7th", section:"A", classTeacher:"Mrs. Ananya Sharma",
          subjects:[
            { name:"Mathematics",    total:100, obtained:87, grade:"A" },
            { name:"English",        total:100, obtained:95, grade:"A+" },
            { name:"Hindi",          total:100, obtained:90, grade:"A+" },
            { name:"Science",        total:100, obtained:84, grade:"A" },
            { name:"Social Studies", total:100, obtained:92, grade:"A+" },
            { name:"Computer",       total:100, obtained:80, grade:"A" },
            { name:"Physical Education",total:50, obtained:47, grade:"A+" }
          ],
          totalMarks:650, obtained:575, percentage:88.5, grade:"A+", rank:1, result:"PASS",
          remarks:"Excellent student. Won state-level essay competition."
        },
        {
          year:"2023-24", class:"8th", section:"B", classTeacher:"Mrs. Deepa Nair",
          subjects:[
            { name:"Mathematics",    total:100, obtained:88, grade:"A" },
            { name:"English",        total:100, obtained:97, grade:"A+" },
            { name:"Hindi",          total:100, obtained:91, grade:"A+" },
            { name:"Science",        total:100, obtained:86, grade:"A" },
            { name:"Social Studies", total:100, obtained:93, grade:"A+" },
            { name:"Computer",       total:100, obtained:82, grade:"A" },
            { name:"Physical Education",total:50, obtained:47, grade:"A+" }
          ],
          totalMarks:650, obtained:584, percentage:89.8, grade:"A+", rank:1, result:"PASS",
          remarks:"Exceptional student. National essay competition finalist."
        }
      ],
      attendanceHistory: [
        { year:"2019-20", totalDays:218, present:214, absent:4, percentage:98.2, leaves:2 },
        { year:"2020-21", totalDays:160, present:158, absent:2, percentage:98.8, leaves:1 },
        { year:"2021-22", totalDays:222, present:220, absent:2, percentage:99.1, leaves:1 },
        { year:"2022-23", totalDays:225, present:220, absent:5, percentage:97.8, leaves:2 },
        { year:"2023-24", totalDays:220, present:217, absent:3, percentage:98.6, leaves:1 }
      ],
      feeHistory: [
        { year:"2019-20", annual:52000, paid:52000, pending:0, status:"Paid",
          payments:[{ date:"2019-06-03", amount:52000, mode:"DD", receipt:"REC190005", for:"Full Year" }] },
        { year:"2020-21", annual:48000, paid:48000, pending:0, status:"Paid",
          payments:[{ date:"2020-08-10", amount:48000, mode:"Online", receipt:"REC200010", for:"Full Year" }] },
        { year:"2021-22", annual:55000, paid:55000, pending:0, status:"Paid",
          payments:[
            { date:"2021-06-03", amount:27500, mode:"Online", receipt:"REC210003", for:"Term 1" },
            { date:"2021-11-01", amount:27500, mode:"Online", receipt:"REC210058", for:"Term 2" }
          ]
        },
        { year:"2022-23", annual:58000, paid:58000, pending:0, status:"Paid",
          payments:[
            { date:"2022-06-01", amount:29000, mode:"Online", receipt:"REC220003", for:"Term 1" },
            { date:"2022-11-02", amount:29000, mode:"Online", receipt:"REC220065", for:"Term 2" }
          ]
        },
        { year:"2023-24", annual:62000, paid:62000, pending:0, status:"Paid",
          payments:[
            { date:"2023-06-03", amount:31000, mode:"Online", receipt:"REC230003", for:"Term 1" },
            { date:"2023-11-05", amount:31000, mode:"Online", receipt:"REC230058", for:"Term 2" }
          ]
        }
      ],
      extracurricular: [
        { year:"2019-20", activities:["Art Club","Dance"],            achievements:["1st Place – Art Competition","Best Dancer Award"] },
        { year:"2020-21", activities:["Online Quiz","Creative Writing"],achievements:["School Topper","1st in Online Essay Competition"] },
        { year:"2021-22", activities:["Debate","Essay Writing","Dance"],achievements:["Best Debater","District Essay 1st Place"] },
        { year:"2022-23", activities:["Debate","Essay","Cultural"],    achievements:["State Essay Competition 1st Place","Best Cultural Performer"] },
        { year:"2023-24", activities:["Debate","Essay","NCC"],         achievements:["National Essay Finalist","NCC 'A' Certificate"] }
      ],
      disciplinary: [],
      healthRecords: [
        { date:"2019-06-10", type:"Medical Check-up",notes:"Healthy. No medical issues." },
        { date:"2020-06-12", type:"Annual Check-up", notes:"Weight 30 kg, Height 130 cm. Good health." },
        { date:"2021-06-08", type:"Annual Check-up", notes:"Weight 36 kg, Height 140 cm. Good health." },
        { date:"2022-06-07", type:"Annual Check-up", notes:"Weight 42 kg, Height 149 cm. Good health." },
        { date:"2023-06-06", type:"Annual Check-up", notes:"Weight 48 kg, Height 157 cm. Good health." }
      ],
      certificates: [
        { name:"Enrollment Certificate",           date:"2019-06-03", issuedBy:"Principal" },
        { name:"Art Competition 1st Place",         date:"2020-02-14", issuedBy:"Art Dept." },
        { name:"State Essay 1st Place",             date:"2023-01-26", issuedBy:"State Govt." },
        { name:"NCC 'A' Certificate",               date:"2024-02-01", issuedBy:"NCC Wing" },
        { name:"National Essay Competition Finalist",date:"2024-03-20", issuedBy:"CBSE" }
      ]
    },

    {
      id: "STU003",
      admissionNo: "ADM2017003",
      rollNo: "07",
      name: "Amit Patel",
      dob: "2008-11-08",
      gender: "Male",
      bloodGroup: "A+",
      enrollmentDate: "2017-06-05",
      currentClass: "10th",
      currentSection: "A",
      status: "Active",
      photo: null,
      contact: {
        phone: "+91 9876543230",
        email: "parent.amit@gmail.com",
        address: "22 Jubilee Hills, Hyderabad – 500033"
      },
      guardian: {
        fatherName: "Sunil Patel",
        fatherOccupation: "Businessman",
        motherName: "Rekha Patel",
        motherOccupation: "Doctor",
        emergencyContact: "+91 9876543231"
      },
      documents: [
        { name:"Birth Certificate",     date:"2017-06-05", status:"Verified" },
        { name:"Previous TC",           date:"2017-06-05", status:"Verified" },
        { name:"Aadhar Card",           date:"2017-06-10", status:"Verified" },
        { name:"Medical Certificate",   date:"2017-06-10", status:"Verified" },
        { name:"Passport Photo (4 nos)",date:"2017-06-05", status:"Verified" }
      ],
      academicHistory: [
        {
          year:"2017-18", class:"3rd", section:"A", classTeacher:"Mrs. Kavitha Menon",
          subjects:[
            { name:"Mathematics",          total:100, obtained:70, grade:"B" },
            { name:"English",              total:100, obtained:68, grade:"B" },
            { name:"Hindi",                total:100, obtained:65, grade:"B" },
            { name:"Environmental Science",total:100, obtained:72, grade:"B" },
            { name:"Drawing",              total:50,  obtained:38, grade:"B+" },
            { name:"Physical Education",   total:50,  obtained:42, grade:"A" }
          ],
          totalMarks:500, obtained:355, percentage:71.0, grade:"B+", rank:8, result:"PASS",
          remarks:"Average performance. Needs to focus more on studies."
        },
        {
          year:"2018-19", class:"4th", section:"B", classTeacher:"Mr. Suresh Reddy",
          subjects:[
            { name:"Mathematics",          total:100, obtained:75, grade:"B+" },
            { name:"English",              total:100, obtained:72, grade:"B" },
            { name:"Hindi",                total:100, obtained:68, grade:"B" },
            { name:"Environmental Science",total:100, obtained:78, grade:"B+" },
            { name:"Drawing",              total:50,  obtained:40, grade:"A" },
            { name:"Physical Education",   total:50,  obtained:46, grade:"A+" }
          ],
          totalMarks:500, obtained:379, percentage:75.8, grade:"B+", rank:6, result:"PASS",
          remarks:"Improved performance. Excellent in sports."
        },
        {
          year:"2019-20", class:"5th", section:"A", classTeacher:"Mrs. Ananya Sharma",
          subjects:[
            { name:"Mathematics",          total:100, obtained:82, grade:"A" },
            { name:"English",              total:100, obtained:75, grade:"B+" },
            { name:"Hindi",                total:100, obtained:70, grade:"B" },
            { name:"Environmental Science",total:100, obtained:80, grade:"A" },
            { name:"Drawing",              total:50,  obtained:42, grade:"A" },
            { name:"Physical Education",   total:50,  obtained:48, grade:"A+" }
          ],
          totalMarks:500, obtained:397, percentage:79.4, grade:"B+", rank:5, result:"PASS",
          remarks:"Good improvement in academics. Sports captain material."
        },
        {
          year:"2020-21", class:"6th", section:"C", classTeacher:"Mrs. Deepa Nair",
          subjects:[
            { name:"Mathematics",    total:100, obtained:85, grade:"A" },
            { name:"English",        total:100, obtained:78, grade:"B+" },
            { name:"Hindi",          total:100, obtained:72, grade:"B" },
            { name:"Science",        total:100, obtained:82, grade:"A" },
            { name:"Social Studies", total:100, obtained:75, grade:"B+" },
            { name:"Computer",       total:100, obtained:88, grade:"A" },
            { name:"Physical Education",total:50, obtained:49, grade:"A+" }
          ],
          totalMarks:650, obtained:529, percentage:81.4, grade:"A", rank:4, result:"PASS",
          remarks:"Good improvement. Sports Head Boy for the year."
        },
        {
          year:"2021-22", class:"7th", section:"A", classTeacher:"Mr. Ravi Kulkarni",
          subjects:[
            { name:"Mathematics",    total:100, obtained:88, grade:"A" },
            { name:"English",        total:100, obtained:80, grade:"A" },
            { name:"Hindi",          total:100, obtained:74, grade:"B+" },
            { name:"Science",        total:100, obtained:85, grade:"A" },
            { name:"Social Studies", total:100, obtained:78, grade:"B+" },
            { name:"Computer",       total:100, obtained:90, grade:"A+" },
            { name:"Physical Education",total:50, obtained:49, grade:"A+" }
          ],
          totalMarks:650, obtained:544, percentage:83.7, grade:"A", rank:3, result:"PASS",
          remarks:"Steady improvement. Cricket Team Captain."
        },
        {
          year:"2022-23", class:"8th", section:"B", classTeacher:"Mrs. Kavitha Menon",
          subjects:[
            { name:"Mathematics",    total:100, obtained:90, grade:"A+" },
            { name:"English",        total:100, obtained:82, grade:"A" },
            { name:"Hindi",          total:100, obtained:75, grade:"B+" },
            { name:"Science",        total:100, obtained:88, grade:"A" },
            { name:"Social Studies", total:100, obtained:80, grade:"A" },
            { name:"Computer",       total:100, obtained:92, grade:"A+" },
            { name:"Physical Education",total:50, obtained:49, grade:"A+" }
          ],
          totalMarks:650, obtained:556, percentage:85.5, grade:"A", rank:2, result:"PASS",
          remarks:"Excellent improvement. School Cricket Captain, State-level player."
        },
        {
          year:"2023-24", class:"9th", section:"A", classTeacher:"Mr. Suresh Reddy",
          subjects:[
            { name:"Mathematics",    total:100, obtained:91, grade:"A+" },
            { name:"English",        total:100, obtained:84, grade:"A" },
            { name:"Hindi",          total:100, obtained:76, grade:"B+" },
            { name:"Physics",        total:100, obtained:86, grade:"A" },
            { name:"Chemistry",      total:100, obtained:83, grade:"A" },
            { name:"Biology",        total:100, obtained:80, grade:"A" },
            { name:"Computer",       total:100, obtained:93, grade:"A+" },
            { name:"Physical Education",total:50, obtained:49, grade:"A+" }
          ],
          totalMarks:750, obtained:642, percentage:85.6, grade:"A", rank:2, result:"PASS",
          remarks:"Outstanding. State Cricket player, Academic excellence side by side."
        }
      ],
      attendanceHistory: [
        { year:"2017-18", totalDays:220, present:200, absent:20, percentage:90.9, leaves:4 },
        { year:"2018-19", totalDays:220, present:205, absent:15, percentage:93.2, leaves:5 },
        { year:"2019-20", totalDays:218, present:210, absent:8,  percentage:96.3, leaves:3 },
        { year:"2020-21", totalDays:160, present:152, absent:8,  percentage:95.0, leaves:2 },
        { year:"2021-22", totalDays:222, present:210, absent:12, percentage:94.6, leaves:4 },
        { year:"2022-23", totalDays:225, present:212, absent:13, percentage:94.2, leaves:4 },
        { year:"2023-24", totalDays:220, present:208, absent:12, percentage:94.5, leaves:3 }
      ],
      feeHistory: [
        { year:"2017-18", annual:45000, paid:45000, pending:0, status:"Paid",
          payments:[{ date:"2017-06-05", amount:45000, mode:"Cheque", receipt:"REC170002", for:"Full Year" }] },
        { year:"2018-19", annual:48000, paid:48000, pending:0, status:"Paid",
          payments:[{ date:"2018-06-05", amount:48000, mode:"Cheque", receipt:"REC180002", for:"Full Year" }] },
        { year:"2019-20", annual:52000, paid:52000, pending:0, status:"Paid",
          payments:[{ date:"2019-06-05", amount:52000, mode:"Online", receipt:"REC190008", for:"Full Year" }] },
        { year:"2020-21", annual:48000, paid:48000, pending:0, status:"Paid",
          payments:[{ date:"2020-08-20", amount:48000, mode:"Online", receipt:"REC200020", for:"Full Year" }] },
        { year:"2021-22", annual:55000, paid:55000, pending:0, status:"Paid",
          payments:[
            { date:"2021-06-05", amount:27500, mode:"Online", receipt:"REC210007", for:"Term 1" },
            { date:"2021-11-08", amount:27500, mode:"Online", receipt:"REC210062", for:"Term 2" }
          ]
        },
        { year:"2022-23", annual:58000, paid:58000, pending:0, status:"Paid",
          payments:[
            { date:"2022-06-08", amount:29000, mode:"Online", receipt:"REC220015", for:"Term 1" },
            { date:"2022-11-14", amount:29000, mode:"Online", receipt:"REC220075", for:"Term 2" }
          ]
        },
        { year:"2023-24", annual:62000, paid:62000, pending:0, status:"Paid",
          payments:[
            { date:"2023-06-05", amount:31000, mode:"Online", receipt:"REC230007", for:"Term 1" },
            { date:"2023-11-08", amount:31000, mode:"Online", receipt:"REC230062", for:"Term 2" }
          ]
        }
      ],
      extracurricular: [
        { year:"2017-18", activities:["Cricket","Drawing"],      achievements:["School Cricket Team Member"] },
        { year:"2018-19", activities:["Cricket","Athletics"],    achievements:["Best Athlete Award","Cricket U-12 Captain"] },
        { year:"2019-20", activities:["Cricket","Athletics"],    achievements:["District Cricket Champions","100m District Winner"] },
        { year:"2020-21", activities:["Cricket","Online Sports Quiz"],achievements:["1st – Online Sports Quiz"] },
        { year:"2021-22", activities:["Cricket","Athletics"],    achievements:["State Cricket U-14 Player","School Sports Head Boy"] },
        { year:"2022-23", activities:["Cricket","Athletics","NSS"],achievements:["State Cricket Captain U-16","NSS Best Volunteer"] },
        { year:"2023-24", activities:["Cricket","Athletics","NSS"],achievements:["State Cricket Team – National Qualifier","NSS Gold Certificate"] }
      ],
      disciplinary: [
        { date:"2018-03-10", incident:"Fighting with classmate", severity:"Medium", action:"Parents called, Counseling session",resolvedBy:"Principal", status:"Resolved" },
        { date:"2020-09-08", incident:"Irregular homework",      severity:"Minor",  action:"Written warning",                  resolvedBy:"Class Teacher",status:"Resolved" }
      ],
      healthRecords: [
        { date:"2017-06-10", type:"Medical Check-up",notes:"Healthy. Good stamina noted." },
        { date:"2018-06-08", type:"Annual Check-up", notes:"Weight 28 kg, Height 125 cm. Excellent health." },
        { date:"2019-06-06", type:"Annual Check-up", notes:"Weight 34 kg, Height 134 cm. Good health." },
        { date:"2020-06-15", type:"Annual Check-up", notes:"Weight 40 kg, Height 144 cm. Good health." },
        { date:"2021-06-09", type:"Annual Check-up", notes:"Weight 48 kg, Height 155 cm. Excellent fitness." },
        { date:"2022-06-08", type:"Annual Check-up", notes:"Weight 56 kg, Height 163 cm. Excellent fitness. Recommended for state sports." },
        { date:"2023-06-07", type:"Annual Check-up", notes:"Weight 62 kg, Height 170 cm. Excellent health. Elite sports nutrition advised." }
      ],
      certificates: [
        { name:"Enrollment Certificate",     date:"2017-06-05", issuedBy:"Principal" },
        { name:"Best Athlete Award",          date:"2018-12-15", issuedBy:"Sports Dept." },
        { name:"District Cricket Champions",  date:"2020-01-20", issuedBy:"District Board" },
        { name:"State Cricket U-14",          date:"2022-03-05", issuedBy:"State Cricket Board" },
        { name:"NSS Gold Certificate",        date:"2024-01-26", issuedBy:"NSS Wing" },
        { name:"National Cricket Qualifier",  date:"2024-03-15", issuedBy:"BCCI" }
      ]
    },

    {
      id: "STU004",
      admissionNo: "ADM2021004",
      rollNo: "18",
      name: "Sneha Reddy",
      dob: "2012-01-30",
      gender: "Female",
      bloodGroup: "AB+",
      enrollmentDate: "2021-06-07",
      currentClass: "6th",
      currentSection: "C",
      status: "Active",
      photo: null,
      contact: {
        phone: "+91 9876543240",
        email: "parent.sneha@gmail.com",
        address: "55 Banjara Hills, Hyderabad – 500034"
      },
      guardian: {
        fatherName: "Kishore Reddy",
        fatherOccupation: "IAS Officer",
        motherName: "Lakshmi Reddy",
        motherOccupation: "Professor",
        emergencyContact: "+91 9876543241"
      },
      documents: [
        { name:"Birth Certificate",     date:"2021-06-07", status:"Verified" },
        { name:"Previous TC",           date:"2021-06-07", status:"Verified" },
        { name:"Aadhar Card",           date:"2021-06-14", status:"Verified" },
        { name:"Medical Certificate",   date:"2021-06-14", status:"Verified" },
        { name:"Passport Photo (4 nos)",date:"2021-06-07", status:"Verified" }
      ],
      academicHistory: [
        {
          year:"2021-22", class:"3rd", section:"A", classTeacher:"Mrs. Ananya Sharma",
          subjects:[
            { name:"Mathematics",          total:100, obtained:95, grade:"A+" },
            { name:"English",              total:100, obtained:98, grade:"A+" },
            { name:"Hindi",                total:100, obtained:92, grade:"A+" },
            { name:"Environmental Science",total:100, obtained:94, grade:"A+" },
            { name:"Drawing",              total:50,  obtained:49, grade:"A+" },
            { name:"Physical Education",   total:50,  obtained:47, grade:"A+" }
          ],
          totalMarks:500, obtained:475, percentage:95.0, grade:"A+", rank:1, result:"PASS",
          remarks:"Exceptional student. Perfect scores in most subjects. Prodigy-level talent."
        },
        {
          year:"2022-23", class:"4th", section:"A", classTeacher:"Mrs. Deepa Nair",
          subjects:[
            { name:"Mathematics",          total:100, obtained:97, grade:"A+" },
            { name:"English",              total:100, obtained:99, grade:"A+" },
            { name:"Hindi",                total:100, obtained:94, grade:"A+" },
            { name:"Environmental Science",total:100, obtained:96, grade:"A+" },
            { name:"Drawing",              total:50,  obtained:50, grade:"A+" },
            { name:"Physical Education",   total:50,  obtained:48, grade:"A+" }
          ],
          totalMarks:500, obtained:484, percentage:96.8, grade:"A+", rank:1, result:"PASS",
          remarks:"Brilliant student. School topper with near-perfect scores."
        },
        {
          year:"2023-24", class:"5th", section:"B", classTeacher:"Mr. Arun Pillai",
          subjects:[
            { name:"Mathematics",          total:100, obtained:98, grade:"A+" },
            { name:"English",              total:100, obtained:99, grade:"A+" },
            { name:"Hindi",                total:100, obtained:95, grade:"A+" },
            { name:"Environmental Science",total:100, obtained:97, grade:"A+" },
            { name:"Drawing",              total:50,  obtained:50, grade:"A+" },
            { name:"Physical Education",   total:50,  obtained:48, grade:"A+" }
          ],
          totalMarks:500, obtained:487, percentage:97.4, grade:"A+", rank:1, result:"PASS",
          remarks:"Near-perfect student. National Science Talent Search qualifier."
        }
      ],
      attendanceHistory: [
        { year:"2021-22", totalDays:222, present:222, absent:0, percentage:100.0, leaves:0 },
        { year:"2022-23", totalDays:225, present:224, absent:1, percentage:99.6,  leaves:0 },
        { year:"2023-24", totalDays:220, present:220, absent:0, percentage:100.0, leaves:0 }
      ],
      feeHistory: [
        { year:"2021-22", annual:55000, paid:55000, pending:0, status:"Paid",
          payments:[{ date:"2021-06-07", amount:55000, mode:"Online", receipt:"REC210002", for:"Full Year" }] },
        { year:"2022-23", annual:58000, paid:58000, pending:0, status:"Paid",
          payments:[{ date:"2022-06-07", amount:58000, mode:"Online", receipt:"REC220002", for:"Full Year" }] },
        { year:"2023-24", annual:62000, paid:62000, pending:0, status:"Paid",
          payments:[{ date:"2023-06-07", amount:62000, mode:"Online", receipt:"REC230002", for:"Full Year" }] }
      ],
      extracurricular: [
        { year:"2021-22", activities:["Chess","Science Club","Dance"],achievements:["District Chess Champion U-10","Best Performer Annual Day"] },
        { year:"2022-23", activities:["Chess","Science Olympiad","Music"],achievements:["State Chess Runner-Up","Science Olympiad Gold","Best Singer Award"] },
        { year:"2023-24", activities:["Chess","Science Talent Search","Music"],achievements:["National Chess Qualifier","NTSE Stage 1 Cleared","State Classical Dance Award"] }
      ],
      disciplinary: [],
      healthRecords: [
        { date:"2021-06-14", type:"Medical Check-up",notes:"Excellent health. Good BMI. No medical issues." },
        { date:"2022-06-10", type:"Annual Check-up", notes:"Weight 22 kg, Height 118 cm. Excellent health." },
        { date:"2023-06-09", type:"Annual Check-up", notes:"Weight 28 kg, Height 128 cm. Excellent health." }
      ],
      certificates: [
        { name:"Enrollment Certificate",       date:"2021-06-07", issuedBy:"Principal" },
        { name:"District Chess Champion U-10", date:"2022-01-15", issuedBy:"District Board" },
        { name:"Science Olympiad Gold Medal",  date:"2023-02-20", issuedBy:"SOF" },
        { name:"NTSE Stage 1 Cleared",         date:"2024-01-20", issuedBy:"NCERT" },
        { name:"National Chess Qualifier",     date:"2024-03-01", issuedBy:"Chess Federation" }
      ]
    }
  ]
};

// ─── Data Manager ─────────────────────────────────────────────────────────────
const DB = {
  init() {
    if (!localStorage.getItem('sms_initialized')) {
      localStorage.setItem('sms_students',  JSON.stringify(SEED_DATA.students));
      localStorage.setItem('sms_school',    JSON.stringify(SEED_DATA.school));
      localStorage.setItem('sms_teachers',  JSON.stringify(SEED_DATA.teachers));
      localStorage.setItem('sms_initialized', 'true');
    }
  },
  getSchool()        { return JSON.parse(localStorage.getItem('sms_school'))    || SEED_DATA.school; },
  getStudents()      { return JSON.parse(localStorage.getItem('sms_students'))  || []; },
  getTeachers()      { return JSON.parse(localStorage.getItem('sms_teachers'))  || []; },
  getStudent(id)     { return this.getStudents().find(s => s.id === id); },
  saveStudents(arr)  { localStorage.setItem('sms_students', JSON.stringify(arr)); },
  addStudent(s) {
    const all = this.getStudents();
    s.id = 'STU' + String(all.length + 1).padStart(3, '0');
    s.admissionNo = 'ADM' + new Date().getFullYear() + String(all.length + 1).padStart(3, '0');
    all.push(s);
    this.saveStudents(all);
    return s;
  },
  updateStudent(updated) {
    const all = this.getStudents().map(s => s.id === updated.id ? updated : s);
    this.saveStudents(all);
  },
  deleteStudent(id) {
    this.saveStudents(this.getStudents().filter(s => s.id !== id));
  }
};
