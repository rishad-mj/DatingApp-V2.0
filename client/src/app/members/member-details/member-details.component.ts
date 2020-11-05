import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { member } from 'src/app/Models/Member';
import { MembersService } from 'src/app/_Services/members.service';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {
  member:member
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  constructor(private memberService:MembersService,private route:ActivatedRoute) 
  {

  }

  ngOnInit(): void {



    console.log(this.route.snapshot.paramMap.get('name'));
    this.loadMember();

    this.galleryOptions = [
      {
        width: '500px',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview:false
      },
    ]

 

  }
getImages():NgxGalleryImage[]{
  const imageUrls = [];
  for(const photo of this.member.photos) {
    imageUrls.push({
      small:photo?.url,
      medium:photo?.url,
      big:photo?.url
    })
  }

  return imageUrls;
}
  loadMember(){
    this.memberService.getMember(this.route.snapshot.paramMap.get('name'))
    .subscribe(member=>{this.member=member;
      this.galleryImages =this.getImages();
     });
  }
}
