// export const classes = [
//     { id: 1, name: "الصف الأول" },
//     { id: 2, name: "الصف الثاني" },
//     { id: 3, name: "الصف الثالث" },
//     { id: 4, name: "الصف الرابع" },
//     { id: 5, name: "الصف الخامس" },
//     { id: 6, name: "الصف السادس" },
//     { id: 7, name: "الصف السابع" },
//     { id: 8, name: "الصف الثامن" },
//     { id: 9, name: "الصف التاسع" },
// ];

// export const sections = [
   
   
//         { id: "A", name: "Section A" },
//         { id: "B", name: "Section B" },
//         { id: "C", name: "Section C" },
//         { id: "D", name: "Section D" },
//     ],


// export const examsMock = [
//     { id: 1, name: "السعي 1" },
//     { id: 2, name: "السعي 2" },
//     { id: 3, name: "السعي 3" },
//     { id: 4, name: "exaالسعيms 4" },
//     { id: 5, name: "امتحان الفصل الاول" },
//     { id: 6, name: "امتحان الفصل الثاني" },
// ];



// export const gradesMock = {
//   "1-A": {
//     students: [
//       {
//         id: 1,
//         studentNumber: "1001",
//         name: "علي حسن",
//         grades: {
//           1: {
//             1: 18,
//             2: 19,
//             3: 17,
//             4: 16,
//             5: 18,
//             6: 19,
//             7: 17,
//             8: 20,
//           },
//           2: {
//             1: 15,
//             2: 20,
//             3: 16,
//             4: 18,
//             5: 17,
//             6: 19,
//             7: 20,
//             8: 18,
//           },
//           3: {
//             1: 10,
//             2: 12,
//             3: 14,
//             4: 15,
//             5: 16,
//             6: 18,
//             7: 17,
//             8: 19,
//           },
//         },
//       },

//       {
//         id: 2,
//         studentNumber: "1002",
//         name: "سارة محمد",
//         grades: {
//           1: {
//             1: 20,
//             2: 17,
//             3: 18,
//             4: 19,
//             5: 16,
//             6: 18,
//             7: 17,
//             8: 20,
//           },
//           2: {
//             1: 19,
//             2: 18,
//             3: 20,
//             4: 17,
//             5: 18,
//             6: 19,
//             7: 16,
//             8: 20,
//           },
//           3: {
//             1: 15,
//             2: 14,
//             3: 16,
//             4: 18,
//             5: 17,
//             6: 19,
//             7: 20,
//             8: 18,
//           },
//         },
//       },
//     ],
//   },

//   "1-B": {
//     students: [
//       {
//         id: 3,
//         studentNumber: "1101",
//         name: "خالد محمود",
//         grades: {
//           1: {
//             1: 18,
//             2: 16,
//             3: 17,
//             4: 18,
//             5: 19,
//             6: 17,
//             7: 18,
//             8: 16,
//           },
//           2: {
//             1: 19,
//             2: 20,
//             3: 18,
//             4: 17,
//             5: 16,
//             6: 18,
//             7: 19,
//             8: 20,
//           },
//           3: {
//             1: 12,
//             2: 13,
//             3: 14,
//             4: 15,
//             5: 16,
//             6: 17,
//             7: 18,
//             8: 19,
//           },
//         },
//       },
//     ],
//   },

//   "2-A": {
//     students: [
//       {
//         id: 4,
//         studentNumber: "2001",
//         name: "عمر خالد",
//         grades: {
//           1: {
//             1: 18,
//             2: 19,
//             3: 20,
//             4: 17,
//             5: 16,
//             6: 18,
//             7: 19,
//             8: 17,
//           },
//           2: {
//             1: 17,
//             2: 18,
//             3: 19,
//             4: 20,
//             5: 18,
//             6: 16,
//             7: 17,
//             8: 19,
//           },
//           3: {
//             1: 14,
//             2: 15,
//             3: 16,
//             4: 17,
//             5: 18,
//             6: 19,
//             7: 20,
//             8: 18,
//           },
//         },
//       },
//     ],
//   },
// };
// export const curriculumMock = {
//   1: {
//     description: "الصف الأول",
//     subjects: [
//       {
//         id: 1,
//         name: "لغة عربية",
//         maxMark: 60,
//         hasSubSkills: true,
//         subSkills: ["تواصل شفهي", "تواصل خطي"],
//       },
//       {
//         id: 2,
//         name: "لغة إنكليزية",
//         maxMark: 40,
//         hasSubSkills: true,
//         subSkills: ["تواصل شفهي", "تواصل خطي"],
//       },
//       {
//         id: 3,
//         name: "رياضيات",
//         maxMark: 60,
//         hasSubSkills: false,
//       },
//       {
//         id: 4,
//         name: "علوم حياة",
//         maxMark: 20,
//         hasSubSkills: false,
//       },
//       {
//         id: 5,
//         name: "جغرافيا",
//         maxMark: 20,
//         hasSubSkills: false,
//       },
//       {
//         id: 6,
//         name: "تربية مدنية",
//         maxMark: 20,
//         hasSubSkills: false,
//       },
//       {
//         id: 7,
//         name: "فنون + تربية رياضية",
//         maxMark: 10,
//         hasSubSkills: false,
//       },
//       {
//         id: 8,
//         name: "معلوماتية",
//         maxMark: 5,
//         hasSubSkills: false,
//       },
//     ],
//   },

//   2: {
//     description: "الصف الثاني",
//     subjects: [], // سننسخ نفس مواد الصف الأول لاحقًا
//   },

//   3: {
//     description: "الصف الثالث",
//     subjects: [],
//   },

//   4: {
//     description: "الصف الرابع",
//     subjects: [],
//   },

//   5: {
//     description: "الصف الخامس",
//     subjects: [],
//   },

//   6: {
//     description: "الصف السادس",
//     subjects: [],
//   },

//   7: {
//     description: "الصف السابع",
//     subjects: [
//       {
//         id: 1,
//         name: "لغة عربية",
//         maxMark: 60,
//         hasSubSkills: true,
//         subSkills: ["تواصل شفهي", "تواصل خطي"],
//       },
//       {
//         id: 2,
//         name: "لغة إنكليزية",
//         maxMark: 40,
//         hasSubSkills: true,
//         subSkills: ["تواصل شفهي", "تواصل خطي"],
//       },
//       {
//         id: 3,
//         name: "رياضيات",
//         maxMark: 60,
//         hasSubSkills: false,
//       },
//       {
//         id: 4,
//         name: "علوم حياة",
//         maxMark: 20,
//         hasSubSkills: false,
//       },
//       {
//         id: 5,
//         name: "فيزياء",
//         maxMark: 20,
//         hasSubSkills: false,
//       },
//       {
//         id: 6,
//         name: "كيمياء",
//         maxMark: 20,
//         hasSubSkills: false,
//       },
//       {
//         id: 7,
//         name: "جغرافيا",
//         maxMark: 20,
//         hasSubSkills: false,
//       },
//       {
//         id: 8,
//         name: "تربية مدنية",
//         maxMark: 20,
//         hasSubSkills: false,
//       },
//       {
//         id: 9,
//         name: "تاريخ",
//         maxMark: 20,
//         hasSubSkills: false,
//       },
//       {
//         id: 10,
//         name: "لغة فرنسية",
//         maxMark: 5,
//         hasSubSkills: false,
//       },
//       {
//         id: 11,
//         name: "فنون + تربية رياضية",
//         maxMark: 10,
//         hasSubSkills: false,
//       },
//       {
//         id: 12,
//         name: "معلوماتية",
//         maxMark: 5,
//         hasSubSkills: false,
//       },
//     ],
//   },

//   8: {
//     description: "الصف الثامن",
//     subjects: [],
//   },

//   9: {
//     description: "الصف التاسع",
//     subjects: [],
//   },
// };