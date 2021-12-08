import { React, useState } from 'react';
import axios from 'axios'
require("dotenv").config();

const ImageUpload = () => {
    const baseUrl = `${process.env.REACT_APP_PROXY}/api/recipes/image`

    const [currentFile, setCurrentFile] = useState(undefined)
    const [previewImage, setPreviewImage] = useState(undefined)
    const [progress, setProgress] = useState(0)
    const [message, setMessage] = useState("")
    const [imageInfos, setImageInfos] = useState([])

    const selectFile = (event) => {
        setCurrentFile(event.target.files[0])
        setPreviewImage(URL.createObjectURL(event.target.files[0]))
        setProgress(0)
        setMessage("")

        console.log("FILE SELECTED")
        console.log(event.target.files[0])
    }

    const upload = () => {
        setProgress(0)
        // use formData format
        let formData = new FormData()
        formData.append("file", currentFile)

        const config = {
            onUploadProgress: (event) => {
                setProgress(Math.round((100 * event.loaded) / event.total))
            },
            headers: { "Content-Type": "multipart/form-data" }
        }

        axios.post(baseUrl, formData, config)
            .then((response) => {
                setMessage(response.data.picture)

                return axios.get(baseUrl)
            }).then((response) => {
                setImageInfos(response.data)

            }).catch((err) => {
                setProgress(0)
                setMessage("Could not upload the image")
                setCurrentFile(undefined)
            })
    }

    return (
        <div>
            <input type="file" accept="image/*" onChange={selectFile} />

            <button
                disabled={!currentFile}
                onClick={upload}
            >
                Upload
            </button>

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