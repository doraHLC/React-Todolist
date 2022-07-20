import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Context";
import { useForm } from 'react-hook-form';

function SignUp() {
    const { token, setToken } = useAuth();
    const navigate = useNavigate();
    const [data, setData] = useState(
        {
            valid: false,
            passwordConfirm: '',
            form: {
                email: '',
                nickname: '',
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
    const signUpValue = (e) => {
        const { value, name } = e.target
        let thisData = Object.assign({}, data);
        thisData.form[name] = value;
        setData(thisData);
        console.log(thisData);
    }
    const checkPasword = (e) => {
        const { value } = e.target
        let thisData = Object.assign({}, data);
        thisData.passwordConfirm = value;
        setData(thisData);
    }
    // const onSignUp = (e) => {
    //     if (data.form.password === data.passwordConfirm) {
    //         console.log("密碼一致");
    //         let thisData = Object.assign({}, data);
    //         thisData.valid = true;
    //         setData(thisData);
    //         // 使用瀏覽器 API 更新文件標題
    //         const _url = "https://todoo.5xcamp.us/users";
    //         console.log({
    //             user: data.form
    //         });
    //         let myHeaders = new Headers();
    //         myHeaders.append("Content-Type", "application/json");
    //         fetch(_url, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 user: data.form
    //             })
    //         })
    //             .then(res => {
    //                 console.log(res.headers.get("authorization"));
    //                 // localStorage.setItem("token",res.headers.get("authorization"));
    //                 setToken(res.headers.get("authorization"));
    //                 return res.json()
    //             })
    //             .then(res => {
    //                 navigate('/todo')
    //             })
    //     } else {
    //         console.log("密碼不一致");
    //         setToken(null);
    //     }




    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data);
        if (data.password === data.passwordConfirm) {
            console.log("密碼一致");

            // 使用瀏覽器 API 更新文件標題
            const _url = "https://todoo.5xcamp.us/users";
            console.log({
                user: data
            });
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
                    // localStorage.setItem("token",res.headers.get("authorization"));
                    setToken(res.headers.get("authorization"));
                    return res.json()
                })
                .then(res => {
                    navigate('/todo')
                })
        } else {
            console.log("密碼不一致");
            setToken(null);
        }
    }

    return (

        <main>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2>註冊帳號</h2>
                <label htmlFor="email">Email</label>
                <input type="text" placeholder="請輸入 email"
                    {...register("email",
                        {
                            required: {
                                value: true,
                                message: '請輸入資料內容!'
                            },
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: "格式有誤!"
                            }
                        }
                    )} />
                <p>{errors.email?.message}</p>
                <label htmlFor="name">您的暱稱</label>
                <input type="text" placeholder="Nnickname"
                    {...register("nickname", {})} />
                <p>{errors.Nickname?.message}</p>
                <label htmlFor="pwd">密碼</label>
                <input type="password" placeholder="password"
                    {...register("password",
                        {
                            required: {
                                value: true,
                                message: '請輸入資料內容!'
                            },
                            minLength: {
                                value: 6,
                                message: "密碼長度至少6位字元"
                            }
                        }
                    )} />
                <p>{errors.password?.message}</p>
                <label htmlFor="pwd">再次輸入密碼</label>
                <input type="password" placeholder="password"
                    {...register("passwordConfirm",
                        {
                            required: {
                                value: true,
                                message: '請輸入資料內容!'
                            },
                            minLength: {
                                value: 6,
                                message: "密碼長度至少6位字元"
                            }
                        }
                    )} />
                <p>{errors.passwordConfirm?.message}</p>
                <input type="submit" value="註冊帳號" />
                {/* <Link to="/">登入</Link> */}
            </form>
        </main>

        //   <main>
        //    <div className="form-control">
        //        <label htmlFor="email">Email:</label>
        //        <input type="text" onChange={signUpValue} name="email" id="email" />
        //    </div>
        //    <div className="form-control">
        //        <label htmlFor="nickName">暱稱:</label>
        //        <input type="text" onChange={signUpValue} name="nickname" id="nickName" />
        //    </div>
        //    <div className="form-control">
        //        <label htmlFor="password">密碼:</label>
        //        <input type="password" onChange={signUpValue} name="password" id="password" />
        //    </div>
        //    <div className="form-control">
        //        <label htmlFor="passwordConfirm">再次輸入密碼:</label>
        //        <input type="password" onBlur={checkPasword} name="passwordConfirm" id="passwordConfirm" />
        //    </div>
        //    <div className="form-control">
        //        <input type="button" value="註冊" onClick={onSignUp} />
        //    </div>
        //   </main>
    );
}

export default SignUp;