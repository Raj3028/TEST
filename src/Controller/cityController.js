const cityModel = require('../Model/cityModel')


const cityCreation = async (req, res) => {

    try {

        let cityName = req.body.cityName

        if (!(/^[A-Z]+$/i).test(cityName)) return res.status(400).send({ status: false, message: 'Invalid Input! You can input only in uppercase' })

        cityName = cityName.toUpperCase()

        const getCity = await cityModel.findOne({ cityName: cityName })
        if (getCity) return res.status(400).send({ status: false, message: `This ${cityName} city is already exist!` })

        const createCity = await cityModel.create({ cityName: cityName })

        return res.status(200).send({ status: true, message: 'city name inserted', data: createCity })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}



const getAllCity = async (req, res) => {
    try {

        const fetchCityData = await cityModel.find()

        if (fetchCityData.length == 0) return res.status(404).send({ status: false, message: 'No City available!' })

        return res.status(200).send({ status: true, data: fetchCityData })


    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })

    }
}


module.exports = { cityCreation, getAllCity }