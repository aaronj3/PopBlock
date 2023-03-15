import NavBar from "../NavBar/NavBar";
import {useState} from "react";
import jwtFetch from "../../store/jwt";

function FileUpload() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (!selectedFile) {
            setMessage('Please select a file');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('content', 'content');
        formData.append('area', '3');

        const response = await jwtFetch('/api/posts', {
            method: 'POST',
            headers: {'content-type' : 'multipart/form-data' },
            body: formData,
        });
        // if (response.ok) {
        //     const data = await response.json();
        //     setMessage(`File uploaded successfully: ${data.url}`);
        // } else {
        //     setMessage('Failed to upload file');
        // }
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <div>
                <input type={"file"} onChange={handleFileChange}></input>
                <button type="submit">upload</button>
            </div>
        </form>
    );
}

export default FileUpload;
