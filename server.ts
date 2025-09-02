import express, { Request, Response } from 'express'
import cors from 'cors'
import axios, { all } from 'axios'
import { Line } from './Line.ts'
import { prisma } from './AppdataSource.ts'
import dayjs from 'dayjs'
import 'dayjs/locale/th'
import jwt from 'jsonwebtoken'
import nodeCron from 'node-cron'
import { PlayDisNotify } from 'playdis-notify'

dayjs.locale('th')

const app = express()

app.use(express.json())
app.use(cors())

// Token Line OA
const token = 'n/sohO2j3uHN4fj6gmjLqpeWhUuISQha8HIThGrWybeeX6l5ifupxbFXf5YNLthcr/d4jC0wYlUxnVmjwNnQCFvlh+zdtziC5CEnXu5P9erMQTmFeNg/fZfG432QF2bdDxJJaeEUnAWBU1ZYPsUcaQdB04t89/1O/w1cDnyilFU='

const line = new Line(token)
const discord = new PlayDisNotify("https://discord.com/api/webhooks/1412463491012493512/NixhB9LjG0Z_P9CNlmtwe0jlbxcokaynHdVXQ6tK9GhBq3-v1MfaxmctdowrSojMCIF2")

// const SendMessage = () => {
//     return new Promise(async (resolve) => {

//         let users = await prisma.notify.findMany()

//         if (users && users.length > 0) {

//             users.map((item: { id: number, uid: string }, index: number) => {
//                 line.push(`วันนี้อย่าลืมทานธาตุเหล็ก💊 และตามด้วยอาหารดีๆ เพื่อบำรุงแม่และลูกน้อยค่ะ🍽️🫄`, item.uid)
//                 // console.log("PUSH MESSAGE!")
//                 if (index + 1 == users.length) {
//                     resolve("ok")
//                 }
//             })

//             console.log("Broadcast message successfully!")

//         } else {
//             console.log("No one users")
//         }
//     })
// }

// const Task = () => {

//     let now = dayjs()

//     let NextNineAM = now.hour(9).minute(0).second(0).millisecond(0)

//     if (now.isAfter(NextNineAM)) {
//         NextNineAM = NextNineAM.add(1, 'day')
//     }

//     console.log('Next 9AM:', NextNineAM.format())

//     let diff = NextNineAM.diff(now)

//     const totalSeconds = Math.floor(diff / 1000);
//     const hours = Math.floor(totalSeconds / 3600);
//     const minutes = Math.floor((totalSeconds % 3600) / 60);
//     const seconds = totalSeconds % 60;

//     console.log(hours, minutes, seconds)

//     // console.log(diff)

//     setTimeout(async () => {
//         await SendMessage()
//         Task()
//     }, diff)

// }

// Task()

app.post("/webhook", async (req: Request, res: Response) => {
    const events = req.body.events

    console.log(events)

    res.status(200).send({ message: "OK" })
})

app.post("/personal_info", async (req: Request, res: Response) => {

    let { name, age, job, graduation, income, genre, marry, pregage, preghis, abort, line_userId, qtychild, lastchildyear, lastchildmonth, aborttimes, lastabortyear, lastabortmonth } = req.body

    console.log(name, age)

    let findsame = await prisma.users.findFirst({
        where: {
            line_userId: line_userId
        }
    })

    if (!findsame) {
        let inserted = await prisma.users.create({
            data: {
                name: name,
                age: Number(age),
                job: job,
                graduation: graduation,
                income: income,
                genre: genre,
                marry: marry,
                pregage: pregage,
                preghis: preghis,
                abort: abort,
                line_userId: line_userId,
                qtychild: Number(qtychild),
                lastchildyear: lastchildyear,
                lastchildmonth: lastchildmonth,
                aborttimes: Number(aborttimes),
                lastabortyear: lastabortyear,
                lastabortmonth: lastabortmonth,
                done_day: 0
            }
        })

        let token = jwt.sign({ id: inserted.id, name: inserted.name, line_userId: line_userId }, 'cat')

        res.status(200).send({ status: res.statusCode, token: token })
    } else {
        res.status(200).send({ status: res.statusCode, message: "มี User นี้อยู่แล้ว" })
    }


})

// app.post("/personal_info", async (req: Request, res: Response) => {

// })

app.get("/personal_detail/:id", async (req: Request, res: Response) => {

    const { id } = req.params

    let user = await prisma.users.findFirst({
        where: {
            line_userId: id
        }
    })

    if (!user) {
        return null
    }

    let token = jwt.sign({ id: user.id, name: user.name, line_userId: id }, 'cat')

    res.status(200).send({ status: res.statusCode, token })
})

app.get("/behave_detail/:id", async (req: Request, res: Response) => {

    const { id } = req.params
    let date = dayjs().format("DD-MM-YYYY HH:mm:ss")

    let user = await prisma.behaves.findMany({
        where: {
            userId: Number(id)
        }
    })

    let filterData = user.filter((item) => {
        console.log(item.date?.split(" ")[0], "=", date.split(" ")[0])
        return item.date?.split(" ")[0] == date.split(" ")[0]
    })



    console.log(filterData)

    res.status(200).send({ status: res.statusCode, user: filterData })
})

app.get("/takemed_detail/:id", async (req: Request, res: Response) => {

    const { id } = req.params
    let date = dayjs().format("DD-MM-YYYY HH:mm:ss")

    let user = await prisma.takemeds.findMany({
        where: {
            userId: Number(id)
        }
    })

    let filterData = user.filter((item) => {
        // console.log(item.date?.split(" ")[0], "=", date.split(" ")[0])
        return item.date?.split(" ")[0] == date.split(" ")[0]
    })



    console.log(filterData)

    res.status(200).send({ status: res.statusCode, user: filterData })
})


app.post("/behaveinfo", async (req: Request, res: Response) => {
    let timestamp = new Date().getTime()
    let { userId, answers, score } = req.body
    let date = dayjs().format("DD-MM-YYYY")

    await prisma.behaves.create({
        data: {
            answers: answers,
            userId: userId,
            score: score,
            date: date,
            timestamp: String(timestamp)
        }
    })

    await prisma.users.update({
        where: {
            id: userId
        },
        data: {
            done_day: 1
        }
    })

    res.status(200).send({ status: res.statusCode, message: "BehaveInfo Ok" })


})

app.post("/takemedinfo", async (req: Request, res: Response) => {
    let timestamp = dayjs().unix()
    let date = dayjs().format("DD-MM-YYYY")
    let { userId, takemed, addition } = req.body

    await prisma.takemeds.create({
        data: {
            takemed: takemed,
            addition: addition,
            userId: userId,
            timestamp: String(timestamp),
            date: date
        }
    })

    res.status(200).send({ status: res.statusCode, message: "BehaveInfo Ok" })


})

const resetDoneTask = async () => {
    await prisma.users.updateMany({
        data: { done_day: 0 }
    });
    console.log("✅ Reset done_day at", new Date().toLocaleString());
};

// Reset Done Task 00:00
nodeCron.schedule('0 0 * * *', async () => {
    resetDoneTask()
}, {
    timezone: 'Asia/Bangkok'
})


const notifyTask = async () => {
    let users: any = await prisma.users.findMany()

    users.map((item: any) => {
        if (item.done_day >= 0) {
            // console.log("อย่าลืมทำแบบฟอร์ม")
            line.push("อย่าลืมทำแบบฟอร์มบันทึกพฤติกรรมด้วยนะคะ", item.line_userId)
        }
    })
}

nodeCron.schedule('0 8 * * *', async () => {
    notifyTask()
}, {
    timezone: 'Asia/Bangkok'
})


const CheckSevenDays = async () => {
    let allUsers = await prisma.users.findMany()

    console.log(allUsers)

    allUsers.map(async (item) => {
        let behave_user_count = await prisma.behaves.count({
            where: {
                userId: item.id
            }
        })

        if (behave_user_count >= 7) {
            let allBehaves = await prisma.behaves.findMany({
                select: {
                    id: true,
                    date: true,
                    score: true,
                    user: {
                        select: {
                            line_userId: true
                        }
                    }
                }
            })

            console.log(allBehaves)

            let total_score = allBehaves.reduce((total, item) => {
                return total = total + item.score
            }, 0)

            let level = total_score / 7
            // console.log(level)
            try {
                line.push(`ระดับคะแนนความประพฤติของคุณใน 7 วันที่บันทึก : ${level.toFixed(0)}/80 คะแนน\n${Number(level.toFixed(0)) >= 67 ? 'สีเขียว มีพฤติกรรมการดูแลตนเองในระดับดี' : Number(level.toFixed(0)) >= 53 ? "สีเหลือง มีพฤติกรรมการดูแลตนเองในระดับปานกลาง" : "สีแดง มีพฤติกรรมการดูแลตนเองในระดับเสี่ยง/ต้องปรับปรุง"} : `, allBehaves[0].user.line_userId)
            } catch (err) {
                console.log("Out of qouta LINE !!")
                discord.push(`ระดับคะแนนความประพฤติของคุณใน 7 วันที่บันทึก : ${level.toFixed(0)}/80 คะแนน\n${Number(level.toFixed(0)) >= 67 ? 'สีเขียว มีพฤติกรรมการดูแลตนเองในระดับดี' : Number(level.toFixed(0)) >= 53 ? "สีเหลือง มีพฤติกรรมการดูแลตนเองในระดับปานกลาง" : "สีแดง มีพฤติกรรมการดูแลตนเองในระดับเสี่ยง/ต้องปรับปรุง"} : `)
            }

            // Delete
            allBehaves.map(async (item) => {
                await prisma.behaves.delete({
                    where: {
                        id: item.id
                    }
                })
            })
        }

        console.log(behave_user_count)
    })
}


nodeCron.schedule('0 11 * * *', async () => {
    CheckSevenDays()
}, {
    timezone: 'Asia/Bangkok'
})


app.get("/line", async (req: Request, res: Response) => {
    line.push("testJA", "U14bd3b94fe086b4dbc62f26f339f5a8e")

    res.status(200).send("Push")
})

app.get("/all_information_details", async (req: Request, res: Response) => {
    let users = await prisma.users.findMany({
        include: {
            takemeds: true,
            behaves: true
        },
        orderBy: {
            id: "desc"
        }
    })


    res.status(200).send(users)
})


app.listen(3001, () => {
    console.log(`Server is running on port 3001`)
})
