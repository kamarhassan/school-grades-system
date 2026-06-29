import { API_ROUTES } from "../api/apiRoutes";

export async function getSections(classId) {
    // console.log(API_ROUTES.sections(classId));
    
  const res = await fetch(API_ROUTES.sections(classId));
 

  if (!res.ok) {
    throw new Error("Failed to fetch sections");
  }

  return  await res.json();
//   console.log(data.data);
  
//   return data.data; // لأن API غالبًا يرجع {success, data}
}