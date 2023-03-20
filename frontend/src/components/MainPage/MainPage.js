import Map from "../Map/Map";
import "./MainPage.css"

function MainPage() {
return (
    <div className ='main-page-content-container'>
        <h1> 🔥🔥See what's poppin on your block🔥🔥 </h1>
        <Map />
        <footer>
            Copyright &copy; 2023 PopBlock
        </footer>
    </div>
)};

export default MainPage;
