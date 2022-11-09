import React from "react";

export class LoginView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        };

        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    onUsernameChange(event) {
        this.setState({
            username: event.target.value
        });
    }
    onPasswordChange(event) {
        this.setState({
            password: event.target.value
        });
    }
    handleSubmit() {
        const {username, password} = this.state;
        console.log(username, password);
    }

    render() {
        return (
            <form>
                <label>
                Username:
                <input type="text" value={this.state.username} onChange={this.onUsernameChange}/>
                </label>
                <label>
                    Password:
                    <input type="password" value={this.state.password} onChange={this.onPasswordChange}/>
                </label>
                <label>
                    <botton type="button" onCklick={this.handleSubmit}>Submit</botton>
                </label>
            </form>
        )
    }
}