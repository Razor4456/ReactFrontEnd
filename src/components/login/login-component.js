import { useState } from "react";
import { useLoginMutation } from "../../service/loginservice/loginApi";
import { Input,Button,Modal,Result } from "antd";
import LoginStyle from "./login.module.scss";
import { useNavigate } from "react-router-dom";
import LoginBanner from '../../branch_snow_winter_1163785_1920x1080.jpg'


function LoginPage({setAuth}) {
    const [username, setUsername] = useState('')
    const [password,setPassword] = useState('');
    const [Login,{isLoading}] = useLoginMutation('');
    const [LoginFailed,setLoginfailed] = useState(false);

    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await Login({
                username,
                password
            }).unwrap();
            setAuth(true)
            localStorage.setItem('auth','true')
            navigate('/')
        } catch {
            console.log("Gagal")
            setLoginfailed(true)
            setPassword('')
        }
    }

    const closeloginerror = () => {
        setLoginfailed(false)
        window.location.href = '/login'
    }

    return(
        <>
        <header className={LoginStyle.headercustome}>Halaman Login</header>
        
        <img src={LoginBanner} alt="Login Banner" className={LoginStyle.LoginImage} />

        <div className={LoginStyle.LoginWrapper}>
        <div className={LoginStyle.LoginDiv}>
        <Input 
            className={LoginStyle.LoginInput}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
        />
        <Input.Password 
            className={LoginStyle.LoginInput}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        <Button 
            onClick={handleLogin}
            className={LoginStyle.LoginButton} 
            variant="solid"
        >
            Login
        </Button>
        </div>
        </div>
        
        <Modal
            className={LoginStyle.TitleModal}
            title = "Success"
            open = {LoginFailed}
            onCancel = {closeloginerror}
            footer = {[
                <Button 
                className={LoginStyle.CloseButtonSuccess} 
                key ="close" 
                onClick={closeloginerror}>
                    Tutup
                </Button>
            ]}
            width={600}
            maskClosable = {false}
            keyboard = {false}
        >
        <Result 
            status= "warning"
            title = "Username Or Password Wrong"
        />
        </Modal>
        </>
    )

}

export default LoginPage;







