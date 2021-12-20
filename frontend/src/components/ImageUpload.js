import { React, useState } from 'react';

const ImageUpload = ({callback}) => {
    const [previewImage, setPreviewImage] = useState(undefined)
    const [progress, setProgress] = useState(0)
    const [message, setMessage] = useState("")

    const selectFile = (event) => {
        setPreviewImage(URL.createObjectURL(event.target.files[0]))
        setProgress(0)
        setMessage("")
        callback(event.target.files[0])
    }
    return (
        <div>
            <input type="file" accept="image/*" onChange={selectFile} />

            <div>
                {previewImage && (
                    <div>
                        <img className="max-h-96" src={previewImage} alt="preview" />
                    </div>
                )}

                {message && (
                    <div>
                        {message}
                    </div>
                )}

                {progress && (
                    <div>
                        {progress}
                    </div>
                )}
            </div>
        </div>
    );
};


export default ImageUpload;