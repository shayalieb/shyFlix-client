import React, { useState } from "react";
import PropType from 'prop-types';

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        cconsole.log(username, password, email, birthday);
        props.Registration(username);
    };

    return (
        <form>
            <h1>New User Registration</h1>
            <label>
                Username:
                <input type="text" value={this.state.username} onChange={e => setUsername(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={this.state.password} onChange={e => setPassword(e.target.value)} />
                <label>
                    Birthday:
                    <input type="email" value={birthday} onChange={e => setEmail(e.target.value)} />
                </label>
                <label>
                    <input type="birthday" value={birthday} onChange={e => setBirthday(e.target.value)} />
                </label>
                <button type="submit" onClick={handleSubmit}>Register</button>
                <button type="button" onClick={() => { props.onBackClick(null) }}>Return to login</button>
            </label>

        </form>
    )
}

    // RegistrationView.propTypes = {
    //     onRegistration: PropType.func.isRequired
    // }