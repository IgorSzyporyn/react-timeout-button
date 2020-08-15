import { timeConversion } from './time-conversion'

const removeRxp = /\${(.*?)}/g

export function getButtonText(source: string, timeRemaining: number, digits: 0 | 1 | 2 | 3 = 0) {
  let parsed = source
  let countdown: number

  if (digits === 0) {
    countdown = Math.ceil(timeRemaining / 1000)
  } else {
    countdown = timeRemaining / 1000
  }

  const removeMatch = removeRxp.exec(source)
  // Will return null every second time if this is not done
  // https://stackoverflow.com/a/21123303/427311
  removeRxp.lastIndex = 0

  if (removeMatch && removeMatch.length > 0) {
    if (timeRemaining <= 0) {
      parsed = source.replace(removeMatch[0], '')
    } else {
      let timeText = `${digits !== 0 ? countdown.toFixed(digits) : countdown}`

      if (countdown * 1000 > 60000) {
        timeText = timeConversion(countdown * 1000)
      }

      const insertText = removeMatch[1].replace('$countdown', timeText)
      parsed = source.replace(removeMatch[0], insertText)
    }
  } else {
    let timeText = `${digits !== 0 ? countdown.toFixed(digits) : countdown}`

    if (countdown * 1000 > 60000) {
      timeText = timeConversion(countdown * 1000)
    }
    parsed = source.replace('$countdown', timeText || '0')
  }

  return parsed
}
