import { commonApi } from "./commonApi"
import { serverUrl } from "./serviceUrl"

//register request
export const requestApi= async(reqBody)=>{
    return await commonApi("POST",`${serverUrl}/register`,reqBody,"")
}
export const LogiApi = async(reqBody)=>{
    return await commonApi("POST",`${serverUrl}/login`,reqBody,"")
}
export const addProjectApi = async(reqBody,reqHeader)=>{
    return await commonApi("POST",`${serverUrl}/add-project`,reqBody,reqHeader)
}
export const homeprojects = async()=>{
    return await commonApi("GET",`${serverUrl}/home-projects`)
}
export const allProjectsapi = async(searchKey,reqHeader)=>{
    return await commonApi("GET",`${serverUrl}/all-projects?search=${searchKey}`,"",reqHeader)
}
export const userprojects = async(reqHeader)=>{
    return await commonApi("GET",`${serverUrl}/user-projects`,"",reqHeader)
}
export const deleteproject = async(id,reqHeader)=>{
    return await commonApi("DELETE",`${serverUrl}/remove-userproject/${id}`,{},reqHeader)
}

export const updateUserProject = async(id,reqBody,reqHeader)=>{
    return await commonApi("PUT",`${serverUrl}/update-project/${id}`,reqBody,reqHeader)
}
export const updateUserProfileApi=async(reqBody,reqHeader)=>{
    return await commonApi('PUT',`${serverUrl}/update-userprofile`,reqBody,reqHeader)
}