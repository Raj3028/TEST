const userModel = require('../Model/userModel')
const cityModel = require('../Model/cityModel')
const axios = require('axios')


const creatUser = async (req, res) => {

    try {

        const bodyData = req.body

        const { name, city, mobile, mediaurl } = bodyData

        if (Object.keys(bodyData).length == 0) {
            return res.status(400).send({ status: false, message: "You have to put your details for create your ID." })
        }

        if (!(/^[a-zA-Z ]+$/).test(name)) return res.status(400).send({ status: false, message: `Invalid Name: "${name}" Input!` })
        bodyData.name = name.toUpperCase()


        if (!(/^[A-Z]+$/i).test(city)) return res.status(400).send({ status: false, message: 'Invalid Input! You can input only in uppercase' })
        bodyData.city = city.toUpperCase()


        const checkCity = await cityModel.findOne({ cityName: city })
        if (!checkCity) return res.status(400).send({ status: false, message: `This City: "${city}" is not available.` })


        if (!(/^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/).test(mobile)) {
            return res.status(400).send({ status: false, message: `This ${mobile} number is wrong!` })
        }

        if (!(/^(https)/).test(mediaurl)) {
            return res.status(400).send({ status: false, message: `You have to put only "https" before your mediaURL!` })
        }

        await axios.get('https://api.binance.com/api/v1/time')

            .then((res) => bodyData.ID = res.data.serverTime)
            .catch((err) => console.log(err))

        const userCreation = await userModel.create(bodyData)

        return res.status(200).send({ status: true, message: `${name}: your data Created Sucessfully `, data: userCreation })


    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


const fetchUserData = async (req, res) => {

    try {

        const ID = req.body.ID

        if (Object.keys(req.body).length == 0) {
            return res.status(400).send({ status: false, message: "You have to put your ID." })
        }

        const fetchData = await userModel.findOne({ ID: ID })
        if (!fetchData) return res.status(404).send({ status: false, message: `Data is not exist!` })

        return res.status(200).send({ staus: true, data: fetchData })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })

    }
}



const updateUser = async (req, res) => {
    try {

        let data = req.body

        let { name, city, mobile, mediaurl, ID } = data

        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, message: "You have to put your details." })
        }

        if (!ID) return res.status(400).send({ status: false, message: `It is mandatory to give you ID` })

        if (name) {
            if (!(/^[a-zA-Z ]+$/).test(name)) return res.status(400).send({ status: false, message: `Invalid Name: "${name}" Input!` })
            data.name = name.toUpperCase()
        }

        if (city) {
            if (!(/^[A-Z]+$/i).test(city)) return res.status(400).send({ status: false, message: 'Invalid Input! You can input only in uppercase' })
            data.city = city.toUpperCase()
            const checkCity = await cityModel.findOne({ cityName: data.city })
            if (!checkCity) return res.status(400).send({ status: false, message: `This City: "${city}" is not available.` })
        }

        if (mobile) {
            if (!(/^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/).test(mobile)) {
                return res.status(400).send({ status: false, message: `This ${mobile} number is wrong!` })
            }
        }

        if (mediaurl) {
            if (!(/^(https)/).test(mediaurl)) {
                return res.status(400).send({ status: false, message: `You have to put only "https" before your mediaURL!` })
            }

        }

        const updateData = await userModel.findOneAndUpdate({ ID: ID },
            { name: data.name, city: data.city, mobile: mobile, mediaurl: mediaurl }, { new: true })

        if (!updateData) return res.status(404).send({ status: false, message: "You have to create your ID first" })

        return res.status(200).send({ status: true, message: 'Update Sucessfully', data: updateData })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })

    }
}



module.exports = { creatUser, fetchUserData, updateUser }