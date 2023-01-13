export class Utils {
  public uuidv4Generator() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const numberRandom = (Math.random() * 16) | 0;
      const value = c == 'x' ? numberRandom : (numberRandom & 0x3) | 0x8;
      return value.toString(16);
    });
  }

  public excludeValues(data: Array<any>, excludevalues: string[] = ['created_at,update_at']) {
    return data.filter((item) => !excludevalues.includes(item));
  }
}
