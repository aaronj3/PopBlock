import {useState} from "react";
import jwtFetch from "../../store/jwt";

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
        <form onSubmit={handleFormSubmit} encType="multipart/form-data">
            <div>
                <input type={"file"} name="image" onChange={handleFileChange}/>
                <br/><br/>
                <input type="text" id="content" value={content} onChange={handleContentChange}/>
                <br/><br/>
                {!loadingFlag && (
                <button type="submit">upload</button>
                )}
                {loadingFlag && (
                    <img src="http://webcreatorbox.com/sample/images/loading.gif"/>
                )}
            </div>
        </form>
    );
}

export default FileUpload;
