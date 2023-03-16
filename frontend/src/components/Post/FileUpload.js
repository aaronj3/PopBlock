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

        const { url } = await fetch('http://127.0.0.1:5500/s3Url')
        .then(res => res.json());

        await fetch(url, {
            method: 'put',
            headers: {
                "Content-Type": "*"
            },
            body: formData
        })

        const imageUrl = url.split('?')[0];
        console.log('image url', imageUrl)

        // await jwtFetch('/api/posts', {
        //     method: 'POST',
        //     body: formData,
        //     headers: {
        //         "Content-Type": "image/*"
        //     },
        //     fileUpload: true,
        // });

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
