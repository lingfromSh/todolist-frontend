import React from 'react';
import '../../css/app.css';


export default class LoginBox extends React.Component {
    constructor() {
        super()
        this.state = { username: '', password: '' }
    }
    changeUsername = e => {
        this.setState({
            username: e.target.value
        })
    }

    changePassword = e => {
        this.setState({
            password: e.target.value
        })
    }
    render() {
        const { onLogin } = this.props;
        return (
            <div className="login-box">
                <div className="limiter">
                    <div className="container-login100">
                        <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
                            <form className="login100-form validate-form">
                                <span className="login100-form-title p-b-49">登录</span>
                                <div className="wrap-input100 validate-input m-b-23">
                                    <span className="label-input100">用户名</span>
                                    <input id="username" className="input100" type="text" name="username" value={this.state.username} onChange={this.changeUsername} />
                                    <span className="focus-input100" data-symbol="&#xf206;"></span>
                                </div>
                                <div className="wrap-input100 validate-input">
                                    <span className="label-input100">密码</span>
                                    <input id="password" className="input100" type="password" name="password" value={this.state.password} onChange={this.changePassword} />
                                    <span className="focus-input100" data-symbol="&#xf190;"></span>
                                </div>
                                <div className="text-right p-t-8 p-b-31">
                                    <a href="#">忘记密码? 直接问我!!!</a>
                                </div>
                                <div className="container-login100-form-btn">
                                    <div className="wrap-login100-form-btn">
                                        <div className="login100-form-bgbtn"></div>
                                        <button className="login100-form-btn" onClick={() => onLogin(this.state)} type="button">击 碎 我</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}