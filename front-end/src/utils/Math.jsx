const formatTime = (totalSeconds) => {
    const totalMinutes = Math.floor(totalSeconds / 60)

    const seconds = totalSeconds % 60
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60

    return { hours: hours, minutes: minutes, seconds: seconds + 1 }
}

export { formatTime }
