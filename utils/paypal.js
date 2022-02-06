/*
Author: chankruze (chankruze@geekofia.in)
Created: Mon Feb 07 2022 00:05:04 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

const axios = require("axios");
const qs = require("qs");

const getBearerToken = async () => {
    // data
    const query = qs.stringify({
        grant_type: "client_credentials",
    });
    // config
    const config = {
        headers: {
            Authorization: `Basic ${process.env.PAYPAL_BASIC_AUTH}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
    };
    // get token in response
    const { data: { access_token } } = await axios
        .post(process.env.PAYPAL_OAUTH_URL, query, config)
        .catch((error) => console.log(error));

    if (access_token) return access_token;
    return null;
};

const getBalance = async (token) => {
    // config
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    // get all the balances in response
    const { data: { balances } } = await axios
        .get(process.env.PAYPAL_BALANCE_URL, config)
        .catch((error) => console.log(error));

    // get the primary currency & it's balance
    const balance = {
        currency: "",
        balance: 0,
    }

    // construct an array of balances
    const data = Array.from(balances);

    if (data.length > 0) {
        data.forEach((item) => {
            // get the primary currency (EUR)
            // or your own logic
            if ("primary" in item) {
                balance.currency = item.total_balance.currency_code;
                balance.balance = item.total_balance.value;
            }
        });
    }

    if (balance) return balance;
    return null;
}

module.exports = { getBearerToken, getBalance };