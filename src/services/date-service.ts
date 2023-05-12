class DateService {
  dif = (start: Date, end: Date) => {
    return new Date(end.getTime() - start.getTime())
  }
}

export default new DateService()
