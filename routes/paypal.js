/*
Author: chankruze (chankruze@geekofia.in)
Created: Mon Feb 07 2022 00:02:55 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

const router = require('express').Router();
const cache = require('memory-cache');
const { getBearerToken, getBalance } = require('../utils/paypal');

router.get('/balance', async (req, res) => {
    // get cached token
    let cachedToken = cache.get('token');

    // if token is not cached
    if (!cachedToken) {
        // get a fresh token
        const token = await getBearerToken();

        if (token) {
            cachedToken = token;
            // cache token for 8 hours
            cache.put('token', token, 8 * 60 * 60 * 1000);
        }
    }

    try {
        // get the balance
        const data = await getBalance(cachedToken);
        // if balance is not null
        if (data) {
            res.status(200).json({
                data
            });
        } else {
            res.status(500).json({
                error: 'Something went wrong'
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
})

module.exports = router;