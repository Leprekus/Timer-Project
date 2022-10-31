export default function formatTime (time) {
    const dateOffset = new Date().getTimezoneOffset()
    const currentTime = time = time - dateOffset
    const ms = Math.round(currentTime / 100) % 10
    const secs = Math.floor(currentTime / 1000) % 60
    const mins = Math.floor(currentTime / 1000 / 60) % 60
    const hrs = Math.floor(currentTime / 1000 / 1000 / 60) % 60
    return `${hrs}:${mins}:${secs}.${ms}`

  
}