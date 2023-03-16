import {useState} from "react";
import jwtFetch from "../../store/jwt";

function FileUpload({area}) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [content, setContent] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleContentChange = (event) => {
        setContent(event.target.value)
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (!selectedFile) {
            alert("select file")
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('content', content);
        formData.append('area', area);

        const response = await jwtFetch('/api/posts', {
            method: 'POST',
            body: formData,
            fileUpload: true,
        });

        alert("posted")
        event.target.reset();
        setSelectedFile(null);
        setContent(null);
    };
  
    return (
        <form onSubmit={handleFormSubmit} encType="multipart/form-data">
            <div>
                <input type={"file"} name="image" onChange={handleFileChange}/>
                <br/>
                <input type="text" id="content" value={content} onChange={handleContentChange}/>
                <br/>
                <button type="submit">upload</button>
            </div>
        </form>
    );
}

export default FileUpload;
