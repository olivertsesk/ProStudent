var studentID = null;
var courseInfo = null;

export const setID = (i)=>{
    studentID = i;
    return
}

export const setInfo = (i)=>{
    courseInfo = i;
    return
}
export const getID = ()=>{
    return studentID;

}

export const getInfo = ()=>{
    return courseInfo;
}
