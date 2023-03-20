import {useState} from "react";
import jwtFetch from "../../store/jwt";
import logo from '../../assets/images/logo.png'
import './FileUpload.css'

function FileUpload({area, onCancel}) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [content, setContent] = useState('');
    const [loadingFlag, setLoadingFlag] = useState(false)

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleContentChange = (event) => {
        setContent(event.target.value)
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (loadingFlag) return;

        if (!selectedFile) {
            alert("select file")
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('content', content);
        formData.append('area', area);

        setLoadingFlag(true);
        await jwtFetch('/api/posts', {
            method: 'POST',
            body: formData,
            fileUpload: true,
        });

        alert("posted")
        event.target.reset();
        setSelectedFile(null);
        setContent(null);
        onCancel();
        setLoadingFlag(true);
    };

    return (
        <form onSubmit={handleFormSubmit} encType="multipart/form-data" id="uploadForm">
            <div>
                <h1>Upload your file here</h1>
                <br/><br/>

                <input id="upFile" type={"file"} name="image" onChange={handleFileChange}/>
                <br/><br/>
                <h2>Add a description:</h2>
                <br></br>   
                <input type="text" id="content" value={content} onChange={handleContentChange}/>
                <br/><br/>
                {!loadingFlag && (
                <button type="submit">Upload</button>
                )}
                {loadingFlag && (
                    <img src="http://webcreatorbox.com/sample/images/loading.gif"/>
                )}
            </div>
            <div>
            <img className="logo" src={logo}/>
            </div>
        </form>
    );
}

export default FileUpload;
