const APP_ID = "094f89e4e4fd4405a450acd2f9864215"
const TOKEN = "007eJxTYNiz4eAyrXP/21WinQ9227rxpDaWr9getuRNRNcR869mJQYKDAaWJmkWlqkmqSZpKSYmBqaJJqYGickpRmmWFmYmRoamG3TEUxsCGRkC/LczMzJAIIjPwpCbmJnHwAAAZ7ce6Q=="
const CHANNEL = "main"

const client = AgoraRTC.createClient({mode: 'rtc', codec: 'vp8'})

let localTracks = []
let remoteUsers = {}

let joinAndDisplayLocalStream = async () => {

    let UID = await client.join(APP_ID, CHANNEL, TOKEN, null)

    localTracks = await AgoraRTC.createMicrophoneAndCameraTracks()

    let player = `<div class="video-container id="user-container-${UID}">
                        <div class="video-player" id="user-${UID}"></div>
                </div>`

    document.getElementById("video-streams").insertAdjacentHTML("beforeend", player)

    localTracks[1].play(`user-${UID}`)

    await client.publish([localTracks[0], localTracks[1]])
}

let joinStream = async () => {
    await joinAndDisplayLocalStream()
    document.getElementById('join-btn').style.display = "none"
    document.getElementById('stream-controls').style.display = "flex"
}

document.getElementById('join-btn').addEventListener('click', joinStream)