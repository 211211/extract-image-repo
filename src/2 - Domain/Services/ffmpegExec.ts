import { exec } from 'child_process'
import fs from 'fs'
import path from 'path'

// const ffmpegPath = path.join(process.cwd(), 'logs')
export function ffmpegExec(timestamp: Number = 0, url: string = '') {
    if (!timestamp || !url) {
        throw new Error('timestamp or url must be existed!')
    }
    const extractImageByGivenSecondCommand = `./ffmpeg/ffmpeg -ss 1 -i ${url} -vframes ${timestamp} -vcodec png -an -y %d.png`
    console.log({extractImageByGivenSecondCommand})
    exec(
        extractImageByGivenSecondCommand,
        (error: any, stdout: any, stderr: any) => {
            if (error) {
                console.log(`error: ${error.message}`)
                return
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`)
                return
            }
            console.log(`stdout: ${stdout}`)

            // convert binary data to base64 encoded string
            console.log(base64Encode(stdout))
            return base64Encode(stdout)
        }
    )
}

// function to encode file data to base64 encoded string
function base64Encode(stdout: any) {
    return new Buffer(stdout).toString('base64')
}
