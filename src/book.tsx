export class Book {
  name: string = "Default";
  author: string = "Default";
  publishDate: string = new Date().getDate.toString();
  isGiven: boolean = false;

  constructor(name: string, author: string, publishDate: string) {
    this.name = name;
    this.author = author;
    this.publishDate = publishDate;
    this.isGiven = false;
  }
}
