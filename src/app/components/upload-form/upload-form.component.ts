import { Component, Input, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { FileUpload } from 'src/app/models/file-upload.model';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent implements OnInit {
  @Input() userId: string = localStorage.getItem('userId') || '';
  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  title: string = "";
  desc: string = "";
  percentage = 0;

  constructor(private uploadService: FileUploadService) {
    this.userId = ''
  }
  ngOnInit(): void {
  }

  selectFile(event: any,title:any,desc:any,userId:string): void {
    this.selectedFiles = event.target.files;
    this.title = title;
    this.desc = desc;
    this.userId = userId;
  }

  upload(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;
      if (file) {
        this.currentFileUpload = new FileUpload(file,this.title,this.desc,this.userId);
        this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
          percentage => {
            this.percentage = Math.round(percentage ? percentage : 0);
          },
          error => {
            console.log(error);
          }
        );
      }
    }
  }
}
