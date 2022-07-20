import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Context";
import { useContext } from 'react';
// {
//   "user": {
//     "email": "string",
//     "password": "string"
//   }
// }
const Login = ()=> {
    const { token, setToken } = useAuth()
    const navigate = useNavigate();

    const [data,setData] = useState(
        {
            // valid: false,
            form:{
                email:'',
                password:''
            }
        }
    )
  // useEffect(() => {
  //     // 使用瀏覽器 API 更新文件標題
  //     const _url = "https://todoo.5xcamp.us/users";
  //     fetch(_url,{
  //         method: 'POST',
  //         data: JSON.stringify(data.form)
  //     })
  //     .then(res=>res.json())
  //     .then(res=>{
  //         console.log(res)
  //     })
  //   },[data.valid]);
  const loginValue = (e)=>{
      const {value,name} = e.target
      let thisData = Object.assign({},data);
      thisData.form[name] = value;
      setData(thisData);
      console.log(thisData);
  }
  
  const onLogin = (e)=>{
    let thisData = Object.assign({},data);
    // thisData.valid = true;
    setData(thisData);
    // 使用瀏覽器 API 更新文件標題
    const _url = "https://todoo.5xcamp.us/users/sign_in";
    console.log({
        user: data.form
    });
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    fetch(_url,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: data.form
        })
    })
    .then(res=>{
        console.log(res.headers.get("authorization"));
        // localStorage.setItem("token",res.headers.get("authorization"));
        setToken(res.headers.get("authorization"));
        console.log("token:::",token);
        return res.json()
    })
    .then(res=>{
        navigate('/todo');
    })
  }
  
  return (
    <main>
     <div className="form-control">
         <label htmlFor="email">Email:</label>
         <input type="text" onChange={loginValue} name="email" id="email" />
     </div>
     
     <div className="form-control">
         <label htmlFor="password">密碼:</label>
         <input type="password" onChange={loginValue} name="password" id="password" />
     </div>
     {/* <div className="form-control">
         <label htmlFor="passwordConfirm">再次輸入密碼:</label>
         <input type="password" onBlur={checkPasword} name="passwordConfirm" id="passwordConfirm" />
     </div> */}

     <div className="form-control">
         <input type="button" value="登入" onClick={onLogin} />
     </div>
    </main>
  );
}

export default Login;

