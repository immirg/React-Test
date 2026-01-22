import './App.css'
import {Outlet} from "react-router";
import { Link, useNavigate } from "react-router-dom";
import {type FormEvent, useState } from "react";
import avatar from './img/person_avatar.png'


export function App() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;
        navigate(`/?search=${query}`);
        setQuery("");
    };
  return (
    <div>
        <header>
            <div>
                <Link to="/">
                <h1>Pinball</h1>
                <p>The grid theme</p>
                </Link>
            </div>

            <form onSubmit={submitHandler}>
                <input
                    type="text"
                    placeholder="Search movie..."
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
            <div className="welcome-user">
                <img src={avatar} alt="avatar" height='35px'/>
                <p>Welcome John</p>
            </div>
        </header>
        <Outlet />
    </div>
  )
}

