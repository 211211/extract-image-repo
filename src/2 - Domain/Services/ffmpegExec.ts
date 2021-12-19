import { exec } from 'child_process'
import path from 'path'
import fs from 'fs'

const tempFolder = path.join(process.cwd(), 'temp')

export async function ffmpegExec(timestamp: Number = 0, url: string = '') {
    try {
        if (!timestamp || !url) {
            throw new Error('timestamp or url must be existed!')
        }

        if (!fs.existsSync(tempFolder)) {
            fs.mkdirSync(tempFolder)
        }

        const extractImageByGivenSecondCommand = `./ffmpeg/ffmpeg -ss ${timestamp} -i ${url} -vframes 1 -vcodec png -an -y ${tempFolder}/%d.png`
        console.log({ extractImageByGivenSecondCommand })

        await execp(extractImageByGivenSecondCommand, {
            stdout: process.stdout,
            stderr: process.stderr
        })

        console.log('done!')
        const pngFilePath = path.join(process.cwd(), `temp/1.png`)
        const result = fs.readFileSync(pngFilePath, 'base64')

        fs.rmdirSync(tempFolder, { recursive: true })

        return result
    } catch (error) {
        console.error(error)
    }
}

/**
 * Promisified child_process.exec
 *
 * @param cmd
 * @param opts See child_process.exec node docs
 * @param {stream.Writable} opts.stdout If defined, child process stdout will be piped to it.
 * @param {stream.Writable} opts.stderr If defined, child process stderr will be piped to it.
 *
 * @returns {Promise<{ stdout: string, stderr: stderr }>}
 */
function execp(cmd: string, opts: any) {
    opts || (opts = {})
    return new Promise((resolve, reject) => {
        const child = exec(cmd, opts, (err, stdout, stderr) =>
            err
                ? reject(err)
                : resolve({
                      stdout: stdout,
                      stderr: stderr
                  })
        )

        if (opts.stdout) {
            child.stdout.pipe(opts.stdout)
        }
        if (opts.stderr) {
            child.stderr.pipe(opts.stderr)
        }
    })
}
