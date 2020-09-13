
export const sortArraybyProperty = (array: any[], prop:string, isasc:boolean = true) => {
    if (isasc) return array.sort((a, b) => (a[prop] > b[prop] ? 1 : -1));
    else return array.sort((a, b) => (a[prop] < b[prop] ? 1 : -1));
};

export const convertObjToArray = (obj:any, zone_data:any[]) => {
    let objKeys = Object.keys(obj);
    let districtArray = [{}];

    objKeys.forEach((ele) => {
        obj[ele].district = ele;
        obj[ele].zone = zone_data.find((item) => item.district.toLowerCase() === ele.toLowerCase())
            ? zone_data.find((item) => item.district === ele).zone
            : '';
        districtArray.push(obj[ele]);
    });

    return districtArray;
};

export const convertObjectToArray = (obj:any, propertyKey:any) => {
    let objKeys = Object.keys(obj);
    let districtArray = [{}];

    objKeys.forEach((ele) => {
        if (typeof obj[ele] === 'object') {
            obj[ele][propertyKey] = ele;
            districtArray.push(obj[ele]);
        }
    });

    return districtArray;
};

export const getLastUpdateTime = (lastUpdateTime:string) =>{
    let date_time = lastUpdateTime.split(" ");
    let date_arr= date_time[0].split("/");
    let time_arr = date_time[1].split(":");

    let lastUpdatedDate = new Date(parseInt(date_arr[2]),parseInt(date_arr[1])-1,parseInt(date_arr[0]),parseInt(time_arr[0]),parseInt(time_arr[1]));

    let currentDateTime = new Date();

    let lastUpdatedMsg="Updated Just Now";
    if(currentDateTime.getMonth()-lastUpdatedDate.getMonth()>0)
    {
        let timeDiff = currentDateTime.getMonth() - lastUpdatedDate.getMonth();
        let timeUnit = timeDiff===1 ?"month" :"months";
        lastUpdatedMsg= `${currentDateTime.getMonth()-lastUpdatedDate.getMonth()} ${timeUnit} ago`;
        return lastUpdatedMsg;
    }
    if(currentDateTime.getDate() - lastUpdatedDate.getDate()>0)
    {
        let timeDiff = currentDateTime.getDate() - lastUpdatedDate.getDate();
        let timeUnit = timeDiff===1 ?"day" :"days";
        lastUpdatedMsg = `${currentDateTime.getDate() - lastUpdatedDate.getDate()} ${timeUnit} ago`;
        return lastUpdatedMsg;
    }
    if(currentDateTime.getHours() - lastUpdatedDate.getHours()>0)
    {
        let timeDiff = currentDateTime.getHours() - lastUpdatedDate.getHours();
        let timeUnit = timeDiff===1 ?"hour" :"hours";
        lastUpdatedMsg = `${currentDateTime.getHours() - lastUpdatedDate.getHours()} ${timeUnit} ago`;
        return lastUpdatedMsg;
    }
    if(currentDateTime.getMinutes() - lastUpdatedDate.getMinutes()>0)
    {
        let timeDiff = currentDateTime.getMinutes() - lastUpdatedDate.getMinutes();
        let timeUnit = timeDiff===1 ?"min" :"mins";
        lastUpdatedMsg = `${currentDateTime.getMinutes() - lastUpdatedDate.getMinutes()} ${timeUnit} ago`;
        return lastUpdatedMsg;
    }

    return lastUpdatedMsg;
}