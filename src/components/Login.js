import { useState, Link } from 'react';
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { useAuth } from "./Context";

// {
//   "user": {
//     "email": "string",
//     "password": "string"
//   }
// }
const Login = () => {
    const { token, setToken } = useAuth()
    const navigate = useNavigate();

    const [data, setData] = useState(
        {
            // valid: false,
            form: {
                email: '',
                password: ''
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
    const loginValue = (e) => {
        const { value, name } = e.target
        let thisData = Object.assign({}, data);
        thisData.form[name] = value;
        setData(thisData);
        console.log(thisData);
    }

    // const onLogin = (e) => {
    //     let thisData = Object.assign({}, data);
    //     // thisData.valid = true;
    //     setData(thisData);
    //     // 使用瀏覽器 API 更新文件標題
    //     const _url = "https://todoo.5xcamp.us/users/sign_in";
    //     console.log({
    //         user: data.form
    //     });
    //     let myHeaders = new Headers();
    //     myHeaders.append("Content-Type", "application/json");
    //     fetch(_url, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             user: data.form
    //         })
    //     })
    //         .then(res => {
    //             console.log(res.headers.get("authorization"));
    //             localStorage.setItem("token", res.headers.get("authorization"));
    //             return res.json()
    //         })
    //         .then(res => {
    //             navigate('/todo')
    //         })
    // }



    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data);

        // 使用瀏覽器 API 更新文件標題
        const _url = "https://todoo.5xcamp.us/users/sign_in";

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        fetch(_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: data
            })
        })
            .then(res => {
                console.log(res.headers.get("authorization"));
                // localStorage.setItem("token", res.headers.get("authorization"));
                setToken(res.headers.get("authorization"));
                return res.json()
            })
            .then(res => {
                navigate('/todo')
            })
    }


    return (
        <main>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2 >最實用的線上代辦事項服務</h2>
                <label>Email</label>
                <input
                    type="text"
                    placeholder="email"
                    {...register("email", {
                        required: {
                            value: true,
                            message: '請輸入資料內容!'
                        },
                        pattern: {
                            value: /^\S+@\S+$/i,
                            message: "格式有誤!"
                        }
                    })} />
                <p>{errors.email?.message}</p>
                <label>密碼</label>
                <input
                    type="Password"
                    placeholder="Password"
                    {...register("password", {
                        required: {
                            value: true,
                            message: '請輸入資料內容!'
                        },
                        minLength: {
                            value: 6,
                            message: "密碼長度至少6位字元"
                        }
                    })} />
                <p>{errors.password?.message}</p>

                <input
                    type="submit"
                    value="登入"
                />
                {/* <Link to="/">註冊帳號</Link> */}
            </form>
        </main>

        // <main>
        //  <div className="form-control">
        //      <label htmlFor="email">Email:</label>
        //      <input type="text" onChange={loginValue} name="email" id="email" />
        //  </div>

        //  <div className="form-control">
        //      <label htmlFor="password">密碼:</label>
        //      <input type="password" onChange={loginValue} name="password" id="password" />
        //  </div>
        //  {/* <div className="form-control">
        //      <label htmlFor="passwordConfirm">再次輸入密碼:</label>
        //      <input type="password" onBlur={checkPasword} name="passwordConfirm" id="passwordConfirm" />
        //  </div> */}

        //  <div className="form-control">
        //      <input type="button" value="登入" onClick={onLogin} />
        //  </div>
        // </main>
    );
}

export default Login;

