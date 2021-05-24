import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import {GlobalState} from '../../../GlobalState'
import Loading from '../utils/loading/Loading'
import {useHistory, useParams} from 'react-router-dom'
import './CreateBanner.css'
const initialState = {
    banner_id: '',
    _id: ''
}

function CreateBanner() {
    const state = useContext(GlobalState)
    const [banner, setBanner] = useState(initialState)
    const [banners] = state.bannersAPI.banners
    const [images, setImages] = useState(false)
    const [loading, setLoading] = useState(false)


    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token

    const history = useHistory()
    const param = useParams()

    const [onEdit, setOnEdit] = useState(false)
    const [callback, setCallback] = state.bannersAPI.callback

    useEffect(() => {
        if(param.id){
            setOnEdit(true)
            banners.forEach(banner => {
                if(banner._id === param.id) {
                    setBanner(banner)
                    setImages(banner.images)
                }
            })
        }else{
            setOnEdit(false)
            setBanner(initialState)
            setImages(false)
        }
    }, [param.id, banners])

    const handleUpload = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin) return alert("You're not an admin")
            const file = e.target.files[0]

            if(!file) return alert("File not exist.")

            if(file.size > 2048 * 512) // 1mb
                return alert("Size too large!")

            if(file.type !== 'image/jpeg' && file.type !== 'image/png') // 1mb
                return alert("File format is incorrect.")

            let formData = new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await axios.post('/api/upload', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })
            setLoading(false)
            setImages(res.data)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleDestroy = async () => {
        try {
            if(!isAdmin) return alert("You're not an admin")
            setLoading(true)
            await axios.post('/api/destroy', {public_id: images.public_id}, {
                headers: {Authorization: token}
            })
            setLoading(false)
            setImages(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleChangeInput = e =>{
        const {name, value} = e.target
        setBanner({...banner, [name]:value})
    }

    const handleSubmit = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin) return alert("You're not an admin")
            if(!images) return alert("No Image Upload")

            if(onEdit){
                await axios.put(`/api/banners/${banner._id}`, {...banner, images}, {
                    headers: {Authorization: token}
                })
            }else{
                await axios.post('/api/banners', {...banner, images}, {
                    headers: {Authorization: token}
                })
            }
            setCallback(!callback)
            history.push("/")
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const styleUpload = {
        display: images ? "block" : "none"
    }
    return (
        <div className="create_product mt-20">
            <div className="upload">
                <input type="file" name="file" id="file_up" onChange={handleUpload}/>
                {
                    loading ? <div id="file_img"><Loading /></div>

                        :<div id="file_img" style={styleUpload}>
                            <img src={images ? images.url : ''} alt=""/>
                            <span onClick={handleDestroy}>X</span>
                        </div>
                }

            </div>

            <form onSubmit={handleSubmit}>
                <div className="row">
                    <label htmlFor="banner_id">Banner ID</label>
                    <input type="text" name="banner_id" id="banner_id" required
                           value={banner.banner_id} onChange={handleChangeInput} disabled={onEdit} />
                </div>


                <button type="submit">{onEdit? "Update" : "Create"}</button>
            </form>
        </div>
    )
}

export default CreateBanner