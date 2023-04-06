import githubLogo from "../../assets/images/github-mark.png"
import linkedInLogo from "../../assets/images/linkedinlogo.png"
import userIcon from "../../assets/images/user-icon.png"
import aaron from "../../assets/images/aaron.jpeg"
import david from "../../assets/images/david.jpeg"
import kristin from "../../assets/images/kristin.jpeg"


function AboutUsPage() {

    return (
        <>
        {/* <h1>Meet the team</h1> */}
        <div className="about-us-section">
            <div className="profile-section">
                <div className="profile-container">
                    <img className="about-us-pic" src={aaron}/>
                    <h1 className="about-us-name">Aaron Jung</h1>
                    <div className="about-us-icons">
                        <a href="https://www.linkedin.com/in/aaron-jung-ba0182129/" target="_blank">
                            <img className="about-us-icon"  src={linkedInLogo}/>
                        </a>

                        <a href="https://github.com/aaronj3" target="_blank">
                            <img className="about-us-icon" src={githubLogo}/>
                        </a>

                        <a>
                            <img className="about-us-icon" src={userIcon}/>
                        </a>
                    </div>
                </div>


            </div>
            <div className="profile-section">
                <div className="profile-container">
                    <img className="about-us-pic" src={david}/>
                    <h1 className="about-us-name">David Cabuay</h1>
                    <div className="about-us-icons">
                        <a href="https://www.linkedin.com/in/david-cabuay-48a83172/" target="_blank">
                            <img className="about-us-icon" src={linkedInLogo}/>
                        </a>

                        <a href="https://github.com/davidcabuay" target="_blank">
                            <img className="about-us-icon" src={githubLogo}/>
                        </a>

                        <a>
                            <img className="about-us-icon" src={userIcon}/>
                        </a>
                    </div>
                </div>
            </div>
            <div className="profile-section">
                <div className="profile-container">
                    <img className="about-us-pic" src={kristin}/>
                    <h1 className="about-us-name">Kristin Lee</h1>
                    <div className="about-us-icons">
                        <a href="https://www.linkedin.com/in/kristin-lee-9a8666265/" target="_blank">
                            <img className="about-us-icon" src={linkedInLogo}/>
                        </a>

                        <a href="https://github.com/totorasora" target="_blank">
                            <img className="about-us-icon" src={githubLogo}/>
                        </a>

                        <a>
                            <img className="about-us-icon" src={userIcon}/>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}


export default AboutUsPage
