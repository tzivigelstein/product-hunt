export default function formatDate(date) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }

  const dateFormatter = new Intl.DateTimeFormat("en-US", options)
  const formattedDate = dateFormatter.format(date)

  return formattedDate.replace(/\d+/, day => {
    if (day >= 11 && day <= 13) {
      return day + "th"
    } else {
      switch (day % 10) {
        case 1:
          return day + "st"
        case 2:
          return day + "nd"
        case 3:
          return day + "rd"
        default:
          return day + "th"
      }
    }
  });
}
