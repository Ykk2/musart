export const normalize = (array) => {
    const noramlizedObject = {}
    array.forEach(item => noramlizedObject[item.id] = item)
    return noramlizedObject
  }


export const dateConverter = (date) => {
  const currentDate = new Date()
  const createdDate = new Date(date)

  const difference = currentDate.getTime() - createdDate.getTime()
  const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365))
  const months = Math.floor(difference / (1000 * 60 * 60 * 24 * 30.5));
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(difference / (1000 * 60 * 60));
  const minutes = Math.floor(difference / (1000 * 60))
  const seconds = Math.floor(difference / (1000))


  if (years > 0 && years < 2) return `${years} year ago`
  if (years > 0) return `${years} years ago`

  if (months > 0 && months < 2) return `${months} month ago`
  if (months > 0) return `${months} months ago`

  if (days > 0 && days < 2) return `${days} day ago`
  if (days > 0) return `${days} days ago`

  if (hours > 0 && hours < 2) return `${hours} hour ago`
  if (hours > 0) return `${hours} hours ago`

  if (minutes > 0 && minutes < 2) return `${minutes} minute ago`
  if (minutes > 0) return `${minutes} minutes ago`

  if (seconds > 0 && seconds < 2) return `${seconds} second ago`
  if (seconds > 0) return `${seconds} seconds ago`

}


export const viewsConverter = (views) => {

  const thousand = Number.parseFloat(views/1000).toFixed(1)
  const millions = Number.parseFloat(views/1000000).toFixed(1)
  const tensThousands = Number.parseFloat(views/10000).toFixed(0)



  if (views === 0) return `${views} views`
  if (views === 1) return `${views} view`
  if (views < 1000) return `${views} views`
  if (+millions >= 1 && +tensThousands >= 100) return `${+millions}M views`
  if (+tensThousands >= 1 && +millions < 1) return `${+tensThousands*10}k views`
  if (+thousand >= 1) return `${+thousand}k views`

}
