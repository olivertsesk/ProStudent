var studentID = null;
var courseInfo = null;
var courseID = null;

export const setID = (i)=>{
    studentID = i;
    return
}

export const setInfo = (i)=>{
    courseInfo = i;
    return
}

export const setCourseID = (i)=>{
    courseID = i;
}

export const getCourseID = ()=>{
    return courseID;

}


export const getID = ()=>{
    return studentID;

}

export const getInfo = ()=>{
    return courseInfo;
}
