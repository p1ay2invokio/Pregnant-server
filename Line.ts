import axios from "axios"

export class Line {

    private token: string

    constructor(token: string) {
        this.token = token
    }

    public push = async (message: string, to_uid: string) => {
        return new Promise(async (resolve) => {
            try {
                let resPush = await axios.post("https://api.line.me/v2/bot/message/push", {
                    to: to_uid,
                    messages: [
                        {
                            "type": 'text',
                            "text": message
                        }
                    ]
                }, {
                    headers: {
                        "Authorization": `Bearer ${this.token}`,
                        "Content-Type": "application/json",
                    }
                }).catch((err) => {
                    console.log(err)
                })

                resolve(resPush)
            }catch{
                resolve("Out of Qouta or Errors")
            }
        })
    }
}