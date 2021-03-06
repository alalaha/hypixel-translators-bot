const { clean, isZalgo } = require("unzalgo")

module.exports = {
    execute(client, manual) {
        let d = new Date()
        let h = d.getUTCHours()
        let m = d.getUTCMinutes()
        if ((h == "4" && m == "00") || manual) {
            check(client)
        }
    }
}

async function check(client) {
    await client.guilds.cache.get("549503328472530974").members.fetch()
        .then(members => {
            members.forEach(member => {
                if (isZalgo(member.displayName, 0.3)) {
                    const newNick = clean(member.displayName)
                    if (isZalgo(newNick, 0.3)) {
                        member.send(`Your nickname on the Hypixel Translators Community Discord was automatically set to \`Unknown\` because it had Zalgo in it, which we could not remove (here's what it looked like before: \`${member.displayName}\`). If you believe this is an error, feel free to respond to this message saying so. Keep in mind anything sent in these DMs will be sent to staff and that this message was automated, so mistakes might occur.`)
                        member.setNickname("Unknown", "More than 30% of user's name was zalgo and could not be changed")
                            .then(() => {
                                console.log("Changed the nick of " + member.user.tag + " to Unknown because it had Zalgo in it")
                            })
                            .catch(() => {
                                console.log("Changed the nick of " + member.user.tag + " to Unknown because it had Zalgo in it, but couldn't DM them with the alert")
                            })
                    } else {
                        member.send(`Your nickname on the Hypixel Translators Community Discord was automatically set to \`${newNick}\` because it originally had Zalgo in it (here's what it looked like before: \`${member.displayName}\`). If you believe this is an error, feel free to respond to this message saying so. Keep in mind anything sent in these DMs will be sent to staff and that this message was automated, so mistakes might occur.`)
                        member.setNickname(newNick, "More than 30% of user's name was zalgo and could be changed")
                            .then(() => {
                                console.log("Changed the nick of " + member.user.tag + " to " + newNick + " because it had Zalgo in it")
                            })
                            .catch(() => {
                                console.log("Changed the nick of " + member.user.tag + " to " + newNick + " because it had Zalgo in it, but couldn't DM them with the alert")
                            })
                    }
                }
            })
        })
}
