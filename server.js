const { client } = require("discord.js");
const express = require("express");

const server = express();

server.all("/", (req, res) => {
    res.send("Bot is running!");
});

function keepOnline() {
    server.listen(3000, () => {
        console.log("server is ready.")
    })
};

module.exports = keepOnline;