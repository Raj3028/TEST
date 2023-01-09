const axios = require('axios')


const callAPI = async (req, res) => {

    try {

        let getData = await axios.get('https://api.binance.com/api/v1/time')

            .then((res) => console.log(res.data))
            .catch((err) => console.log(err))

            return res.status(200).send({ message: 'Date Received' })

    } catch (error) {
        return res.status(500).send({ status: false, Message: error.Message })
    }
}

module.exports = callAPI