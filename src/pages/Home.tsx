import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
    return (
        <div className="home">
            <nav className="links">
                <Link className="links__link" to="/sign-up">
                    Sign Up
                </Link>
                <Link className="links__link" to="/list">
                    List
                </Link>
            </nav>
        </div>
    );
}
