const Banners = require('../models/bannerModel')



const bannerCtrl = {
    getBanners: async(req, res) =>{
        try {

            const banners = await Banners.find()
            res.json(banners)

            res.json({
                status: 'success',
                result: banners.length,
                banners: banners
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createBanner: async(req, res) =>{
        try {
            const {images,banner_id} = req.body;
            if(!images) return res.status(400).json({msg: "No image upload"})

            const banner = await Banners.findOne({banner_id})
            if(banner)
                return res.status(400).json({msg: "This banner already exists."})

            const newBanner = new Banners({
                banner_id,  images,
            })

            await newBanner.save()
            res.json({msg: "Created a banner"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteBanner: async(req, res) =>{
        try {
            await Banners.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted a banner"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateBanner: async(req, res) =>{
        try {
            const { images,} = req.body;
            if(!images) return res.status(400).json({msg: "No image upload"})

            await Banners.findOneAndUpdate({_id: req.params.id}, {
                images,
            })

            res.json({msg: "Updated a banner"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = bannerCtrl