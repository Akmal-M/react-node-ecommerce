const mongoose = require('mongoose')


const bannerSchema = new mongoose.Schema({
    images:{
        type: Object,
        required: true
    },
    banner_id:{
        type: String,
        unique: true,
        trim: true,
        required: true
    },
}, {
    timestamps: true
})

module.exports = mongoose.model("Banner", bannerSchema)