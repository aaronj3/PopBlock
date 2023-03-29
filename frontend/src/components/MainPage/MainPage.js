import Map from "../Map/Map";
import jwtFetch from "../../store/jwt";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, maxLikePostGroupByRegion } from "../../store/posts";
import "./MainPage.css"

function MainPage() {
    const dispatch = useDispatch();
    const posts = useSelector(getPosts);

    const areas = ['App Academy', 'Western Addition', 'West of Twin Peaks', 'Visitacion Valley', 'Twin Peaks', 'South of Market', 'Presidio Heights', 'Presidio', 'Portero Hill', 'Portola', 'Pacific Heights',
                    'Outer Richmond', 'Outer Mission', 'Sunset/Parkside', 'Oceanview/Merced/Ingleside', 'North Beach', 'Noe Valley', 'Lone Mountain/USF', 'Lincoln Park', 'Seacliff', 'Nob Hill',
                    'Mission Bay', 'Mission', 'Russian Hill', 'Marina', 'Lakeshore', 'Tenderloin', 'McLaren Park', 'Japantown', 'Inner Sunset', 'Hayes Valley', 'Haight Ashbury', 'Golden Gate Park',
                    'Inner Richmond', 'Glen Park', 'Financial District/South Beach', 'Excelsior', 'Chinatown', 'Castro/Upper Market', 'Bernal Heights', 'Bayview Hunters Point']
    
    useEffect(()=>{
        dispatch(maxLikePostGroupByRegion())
    }, [dispatch]);





return (
    <div className ='main-page-content-container'>
        <div className="mp-container">
            <div className="rightdiv">
                See what's poppin on your block!
            </div>
            <div>
                <Map />
                <div className="botdiv">
                    Discover the pulse of San Francisco with our interactive map, showcasing the most popular post in each block. 
                    <br/> <br/> Be a part of the action by sharing your own content and see if you can become the featured post in your own neighborhood. 
                    <br/> <br/>Join our community and explore the city like never before!
                </div>
            </div>
            <div className="leftdiv">
                Explore the city like never before!
            </div>
        </div>
        <footer className="footer">
            <div>
                Copyright &copy; 2023 PopBlock
            </div>
            <div>
            <a className="about-links"href="https://github.com/aaronj3/PopBlock" target="_blank">Github</a>
            </div>
            <div>
            <a className="about-links"href="https://github.com/aaronj3/PopBlock" target="_blank">About Us</a>
            </div>

        </footer>
    </div>
)};

export default MainPage;
