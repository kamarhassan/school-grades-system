export const classesMock = [
    { id: 1, name: "الصف الأول" },
    { id: 2, name: "الصف الثاني" },
    { id: 3, name: "الصف الثالث" },
    { id: 4, name: "الصف الرابع" },
    { id: 5, name: "الصف الخامس" },
    { id: 6, name: "الصف السادس" },
    { id: 7, name: "الصف السابع" },
    { id: 8, name: "الصف الثامن" },
    { id: 9, name: "الصف التاسع" },
];

export const sectionsMock = {
    1: [
        { id: "A", name: "Section A" },
        { id: "B", name: "Section B" },
        { id: "C", name: "Section C" },
    ],

    2: [
        { id: "A", name: "Section A" },
        { id: "B", name: "Section B" },
        { id: "C", name: "Section C" },
        { id: "D", name: "Section D" },
    ],
};

export const examsMock = [
    { id: 1, name: "exams 1" },
    { id: 2, name: "exams 2" },
    { id: 3, name: "exams 3" },
    { id: 4, name: "exams 4" },
    { id: 5, name: "exams 5" },
];



export const gradesMock = {
    "1-A": {
        students: [
            {
                id: 1,
                studentNumber: "1001",
                name: "علي حسن",
                grades: {
                    1: 18,
                    2: 19,
                },
            },
            {
                id: 2,
                studentNumber: "1002",
                name: "سارة محمد",
                grades: {
                    1: 20,
                    2: 17,
                },
            },
            {
                id: 3,
                studentNumber: "1003",
                name: "محمد أحمد",
                grades: {
                    1: 16,
                    2: 18,
                },
            },
            {
                id: 4,
                studentNumber: "1004",
                name: "نور خالد",
                grades: {
                    1: 19,
                    2: 20,
                },
            },
            {
                id: 5,
                studentNumber: "1005",
                name: "يوسف علي",
                grades: {
                    1: 17,
                    2: 15,
                },
            },
        ],
    },

    "1-B": {
        students: [
            {
                id: 6,
                studentNumber: "1101",
                name: "رنا إبراهيم",
                grades: {
                    1: 18,
                    2: 16,
                },
            },
            {
                id: 7,
                studentNumber: "1102",
                name: "خالد محمود",
                grades: {
                    1: 20,
                    2: 19,
                },
            },
            {
                id: 8,
                studentNumber: "1103",
                name: "ليان أحمد",
                grades: {
                    1: 15,
                    2: 18,
                },
            },
        ],
    },

    "1-C": {
        students: [
            {
                id: 9,
                studentNumber: "1201",
                name: "حسن مصطفى",
                grades: {
                    1: 19,
                    2: 18,
                },
            },
            {
                id: 10,
                studentNumber: "1202",
                name: "مريم يوسف",
                grades: {
                    1: 17,
                    2: 20,
                },
            },
        ],
    },

    "2-A": {
        students: [
            {
                id: 11,
                studentNumber: "2001",
                name: "عمر خالد",
                grades: {
                    1: 18,
                    2: 17,
                },
            },
            {
                id: 12,
                studentNumber: "2002",
                name: "زينب علي",
                grades: {
                    1: 20,
                    2: 19,
                },
            },
            {
                id: 13,
                studentNumber: "2003",
                name: "أحمد سمير",
                grades: {
                    1: 16,
                    2: 18,
                },
            },
        ],
    },

    "2-B": {
        students: [
            {
                id: 14,
                studentNumber: "2101",
                name: "هبة محمود",
                grades: {
                    1: 19,
                    2: 20,
                },
            },
            {
                id: 15,
                studentNumber: "2102",
                name: "كريم حسن",
                grades: {
                    1: 17,
                    2: 16,
                },
            },
        ],
    },

    "2-C": {
        students: [
            {
                id: 16,
                studentNumber: "2201",
                name: "سليم أحمد",
                grades: {
                    1: 18,
                    2: 19,
                },
            },
            {
                id: 17,
                studentNumber: "2202",
                name: "لينا خالد",
                grades: {
                    1: 20,
                    2: 18,
                },
            },
            {
                id: 18,
                studentNumber: "2203",
                name: "نور الدين",
                grades: {
                    1: 15,
                    2: 17,
                },
            },
        ],
    },
};


export const curriculumMock = {
  1: {
    description: "الصف الأول",
    subjects: [
      {
        id: 1,
        name: "لغة عربية",
        maxMark: 60,
        hasSubSkills: true,
        subSkills: ["تواصل شفهي", "تواصل خطي"],
      },
      {
        id: 2,
        name: "لغة إنكليزية",
        maxMark: 40,
        hasSubSkills: true,
        subSkills: ["تواصل شفهي", "تواصل خطي"],
      },
      {
        id: 3,
        name: "رياضيات",
        maxMark: 60,
        hasSubSkills: false,
      },
      {
        id: 4,
        name: "علوم حياة",
        maxMark: 20,
        hasSubSkills: false,
      },
      {
        id: 5,
        name: "جغرافيا",
        maxMark: 20,
        hasSubSkills: false,
      },
      {
        id: 6,
        name: "تربية مدنية",
        maxMark: 20,
        hasSubSkills: false,
      },
      {
        id: 7,
        name: "فنون + تربية رياضية",
        maxMark: 10,
        hasSubSkills: false,
      },
      {
        id: 8,
        name: "معلوماتية",
        maxMark: 5,
        hasSubSkills: false,
      },
    ],
  },

  2: {
    description: "الصف الثاني",
    subjects: [], // سننسخ نفس مواد الصف الأول لاحقًا
  },

  3: {
    description: "الصف الثالث",
    subjects: [],
  },

  4: {
    description: "الصف الرابع",
    subjects: [],
  },

  5: {
    description: "الصف الخامس",
    subjects: [],
  },

  6: {
    description: "الصف السادس",
    subjects: [],
  },

  7: {
    description: "الصف السابع",
    subjects: [
      {
        id: 1,
        name: "لغة عربية",
        maxMark: 60,
        hasSubSkills: true,
        subSkills: ["تواصل شفهي", "تواصل خطي"],
      },
      {
        id: 2,
        name: "لغة إنكليزية",
        maxMark: 40,
        hasSubSkills: true,
        subSkills: ["تواصل شفهي", "تواصل خطي"],
      },
      {
        id: 3,
        name: "رياضيات",
        maxMark: 60,
        hasSubSkills: false,
      },
      {
        id: 4,
        name: "علوم حياة",
        maxMark: 20,
        hasSubSkills: false,
      },
      {
        id: 5,
        name: "فيزياء",
        maxMark: 20,
        hasSubSkills: false,
      },
      {
        id: 6,
        name: "كيمياء",
        maxMark: 20,
        hasSubSkills: false,
      },
      {
        id: 7,
        name: "جغرافيا",
        maxMark: 20,
        hasSubSkills: false,
      },
      {
        id: 8,
        name: "تربية مدنية",
        maxMark: 20,
        hasSubSkills: false,
      },
      {
        id: 9,
        name: "تاريخ",
        maxMark: 20,
        hasSubSkills: false,
      },
      {
        id: 10,
        name: "لغة فرنسية",
        maxMark: 5,
        hasSubSkills: false,
      },
      {
        id: 11,
        name: "فنون + تربية رياضية",
        maxMark: 10,
        hasSubSkills: false,
      },
      {
        id: 12,
        name: "معلوماتية",
        maxMark: 5,
        hasSubSkills: false,
      },
    ],
  },

  8: {
    description: "الصف الثامن",
    subjects: [],
  },

  9: {
    description: "الصف التاسع",
    subjects: [],
  },
};