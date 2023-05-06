import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

function Header() {
    const { guserID, setguserID } = useContext(AuthContext);
    const { guserRole, setguserRole } = useContext(AuthContext);
    const { guserEmail, setguserEmail } = useContext(AuthContext);
    const { guserName, setguserName } = useContext(AuthContext);
    const logout = () => {
        setguserID('');
        setguserRole('');
        setguserEmail('');
        setguserName('');
    }
    return (
        <nav className="navbar navbar-expand-lg bg-dark bg-body-tertiary" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Golds Gym </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse " id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {guserID == '' ? <React.Fragment>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">Register</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                        </React.Fragment>
                            :
                            (guserRole == 'admin' ? <React.Fragment>
                                <li className="nav-item">
                                    <Link className="nav-link" >Enroll users</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" >Check in</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" >Free trials</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" >Dashboard</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" onClick={logout}>Logout</Link>
                                </li>
                            </React.Fragment> : <React.Fragment>
                                <li className="nav-item">
                                    <Link className="nav-link" >My classes</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" >View activites</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" >Book class</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" >Log hours</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" onClick={logout}>Logout</Link>
                                </li>
                            </React.Fragment>
                            )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}
export default Header;