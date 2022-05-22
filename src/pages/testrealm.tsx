import { useState, useEffect } from 'react';
import * as Realm from "realm-web"
const Testrealm = () => {
  const [parts, setParts] = useState([])
  useEffect(()=> {
    load()
  },[])
  async function load(){
    const REALM_APP_ID = "partsshop-iqmiv";
    const app = new Realm.App({id: REALM_APP_ID});
    const credentials = Realm.Credentials.anonymous()
    try{
        const user = await app.logIn(credentials);
        await setParts(await user.functions.getAllProducts());
        console.log(parts)
    } catch (error){
      console.error(error)
    }
  }
  const Render=() =>{
    console.log(parts)
    if(parts.length>0) {
      return (
        <div>{parts.map(part => {
              return <p>{part.category}</p>
            })}
        </div>
      );
    } else return <div>nie ma nic</div>
  }
  return (
      <div>
        {parts.length!=0 && <div><Render/></div>}
      </div>
      );
}
export default Testrealm