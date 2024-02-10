const prettyDate = (strDate) => {
    if(!strDate){return null;}
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Seb', 'Oct', 'Nov', 'Dec'];
    const arrDate = strDate.split('-');
    return months[Number(arrDate[1]) - 1] + ' ' + arrDate[2] + ', ' + arrDate[0];
} 

export default prettyDate;