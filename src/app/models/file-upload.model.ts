export class FileUpload {
  key!: string;
  name!: string;
  url!: string;
  file: File;
  title!: string;
  description!: string;
  userID!:string;

  constructor(file: File,title:string,desc:string,userID:string) {
    this.file = file;
    this.title = title;
    this.description = desc;
    this.userID = userID;
  }
}
