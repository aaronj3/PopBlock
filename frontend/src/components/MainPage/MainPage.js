// import Map from "../Map/Map";
// import jwtFetch from "../../store/jwt";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getPosts, maxLikePostGroupByRegion } from "../../store/posts";
import "./MainPage.css"
import sessionImg from '../../assets/images/popblockmap.png'
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Modal } from "../../context/Modal";
import AboutUsPage from "./AboutUs";

function MainPage() {
    const history = useHistory();
    const [showAboutUs, setShowAboutUs] = useState(false);

    const toMap = () => {
        let path = "/map";
        history.push(path);
    }





return (
    <div>
        <div className="mp-container">
            <div className="leftdiv">
                See what's poppin on your block!
                <br/>
                <div className="botdiv">
                    Discover the pulse of San Francisco with our interactive map, showcasing the most popular post in each block.
                    <br/> <br/> Be a part of the action by sharing your own content and see if you can become the featured post in your own neighborhood.
                    <br/> <br/>Join our community and explore the city like never before!
                </div>
                <button className="mapbutton" onClick={toMap}>Checkout the map here</button>
            </div>
            <div className="rightdiv">
                {/* <br/> */}
                <img src={sessionImg} className="splashImg" alt="img"/>
            </div>
        </div>
    </div>
)};

export default MainPage;
