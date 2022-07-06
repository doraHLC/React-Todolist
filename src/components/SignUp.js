import { useState } from 'react';
import { useNavigate } from "react-router-dom";
function SignUp() {
    const navigate = useNavigate();
    const [data,setData] = useState(
        {
            valid: false,
            passwordConfirm: '',
            form:{
                email:'',
                nickname:'',
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
    const signUpValue = (e)=>{
        const {value,name} = e.target
        let thisData = Object.assign({},data);
        thisData.form[name] = value;
        setData(thisData);
        console.log(thisData);
    }
    const checkPasword = (e)=>{
        const {value} = e.target
        let thisData = Object.assign({},data);
        thisData.passwordConfirm = value;
        setData(thisData);
    }
    const onSignUp = (e)=>{
        if(data.form.password===data.passwordConfirm){
            console.log("密碼一致");
            let thisData = Object.assign({},data);
            thisData.valid = true;
            setData(thisData);
            // 使用瀏覽器 API 更新文件標題
            const _url = "https://todoo.5xcamp.us/users";
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
                localStorage.setItem("token",res.headers.get("authorization"));
                return res.json()
            })
            .then(res=>{
                navigate('/todo')
            })
        }else{
            console.log("密碼不一致");
        }
    }
    
    return (
      <main>
       <div className="form-control">
           <label htmlFor="email">Email:</label>
           <input type="text" onChange={signUpValue} name="email" id="email" />
       </div>
       <div className="form-control">
           <label htmlFor="nickName">暱稱:</label>
           <input type="text" onChange={signUpValue} name="nickname" id="nickName" />
       </div>
       <div className="form-control">
           <label htmlFor="password">密碼:</label>
           <input type="password" onChange={signUpValue} name="password" id="password" />
       </div>
       <div className="form-control">
           <label htmlFor="passwordConfirm">再次輸入密碼:</label>
           <input type="password" onBlur={checkPasword} name="passwordConfirm" id="passwordConfirm" />
       </div>
       <div className="form-control">
           <input type="button" value="註冊" onClick={onSignUp} />
       </div>
      </main>
    );
  }
  
  export default SignUp;