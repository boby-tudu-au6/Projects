import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class SideNav extends Component {
    render() {
        return (
            <ul className="nav flex-column text-center">
                <li className="link-item p-0 pt-4">
                    <Link to='/' className="nav-link text-danger p-0">
                        <i className="fa fa-home"></i>
                        <p className=""><small>Home</small></p>
                    </Link>
                </li>
                <li className="link-item p-0 pt-3">
                    <Link to='/trending' className="nav-link text-secondary p-0">
                        <i className="fa fa-fire"></i>
                        <p className=""><small>Trending</small></p>
                    </Link>
                </li>
                <li className="link-item p-0 pt-3">
                    <Link to='/player' className="nav-link text-secondary p-0">
                        <i className="fa fa-film"></i>
                        <p className=""><small>Playlist</small></p>
                    </Link>
                </li>
            </ul>
        )
    }
}
