const router = require('express').Router()
const bannerCtrl = require('../controllers/bannerCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


router.route('/banners')
    .get(bannerCtrl.getBanners)
    .post(auth, authAdmin, bannerCtrl.createBanner)


router.route('/banners/:id')
    .delete(auth, authAdmin, bannerCtrl.deleteBanner)
    .put(auth, authAdmin, bannerCtrl.updateBanner)



module.exports = router