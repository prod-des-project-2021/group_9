import {React, useState} from 'react';
import axios from 'axios'

const ImageUpload = ({ text, clickHandler, style }) => {

    const [currentFile, setCurrentFile] = useState (undefined)
    const [previewImage, setPreviewImage] = useState (undefined)
    const [progress, setProgress] = useState (0)
    const [message, setMessage]= useState ("" )
    const [imageInfos, setImageInfos] = useState([])
    
    const selectFile = (event) => {
        setCurrentFile(event.target.files[0])
        setPreviewImage(URL.createObjectURL(event.target.files[0]))
        setProgress(0)
        setMessage("")

    }

    const upload = () => {
        setProgress(0)
        axios.post("https://www.ipt.oamk.fi/linux193/api/recipes/image", currentFile, {headers: {}}, (event) => {
            setProgress(Math.round((100 * event.loaded) / event.total))
        }).then((response) => {
            setMessage(response.data.message)

            return axios.get("https://www.ipt.oamk.fi/linux193/api/recipes/image")
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
            <input type="file" accept="image/*" onChange = {selectFile}/>

            <button 
                disabled={!currentFile}
                onClick={upload}
                >
            Upload       
            </button>

            <p>
                {previewImage && (
                
                <div>
                   <img className = "max-h-96" src={previewImage} />
                </div>
                
                )}
            </p>

        </div>
    );
};


export default ImageUpload;