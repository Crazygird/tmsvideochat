const APP_ID = "50f02150c5a546eb91fefc84e59c4d31"
const TOKEN = "007eJxTYNij7rF7w4TVPLvXC/pNjQ4QSW62mMu2SfLy54XV/1sC7zkrMJgapBkYGZoaJJsmmpqYpSZZGqalpiVbmKSaWiabpBgbqv6TSm0IZGQ4lm3LysgAgSA+C0NuYmYeAwMAHd0ewg=="
const CHANNEL = "main"

const client = AgoraRTC.createClient({mode: 'rtc', codec: 'vp8'})

let localTracks = []
let remoteUsers = {}

let joinAndDisplayLocalStream = async () => {

    let UID = await client.join(APP_ID, CHANNEL, TOKEN, null )

    localTracks = await AgoraRTC.createMicrophoneAndCameraTracks()

    let player = `<div class="video-container" id="user-container-${UID}">
                        <div class="video-player" id="user-${UID}"></div>
                  </div>`

    document.getElementById('video-streams').insertAdjacentHTML('beforeend', player)

    localTracks[1].play(`user-${UID}`)

    await client.publish([localTracks[0], localTracks[1]])
}

let joinStream = async () => {
    await joinAndDisplayLocalStream()
    document.getElementById('join-btn').style.display = 'none'
}