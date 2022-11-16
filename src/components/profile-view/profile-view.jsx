import React, { useState } from "react";
import './profile-view.scss';
import axios from "axios";


export function ProfileView({ movies, onUpdateUSerInfo }) {
    const [user, setUser] = useState({
    })

    const favoriteMoviesList = movies.filter((movies) => {
    });
}

