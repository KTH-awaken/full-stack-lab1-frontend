




export const getDisplayName = (users: string[], currentUser:string ):string =>
 currentUser === users[0] ? users[1]: users[0];


export const uid = () => {
    const S4 = () =>  (((1+Math.random())*0x10000)|0).toString(16).substring(1);   
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

