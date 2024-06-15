import { createContext ,useState ,useCallback } from "react";


export const AppContext=createContext();


export function ContextWrapper({children}){

    const [user,setUser]=useState(null);
    console.log("hello");
    const getUser = useCallback( async ()=>{
    const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
          // 'Content-Type' header is not necessary for a GET request
        },
      });
    
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    
      const data = await response.json(); 
      //console.log(data.user);
      if(data?.user){
      setUser(data.user);
      }
     // console.log(user)f
    } catch (error) {
      console.error('Fetch error:', error);
    }
	},[]);
    return (
     <AppContext.Provider value={{user,setUser,getUser}}>
       {children}
     </AppContext.Provider>
    )
}