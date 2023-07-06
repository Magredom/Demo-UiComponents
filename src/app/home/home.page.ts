import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AnimationController, IonicModule } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class HomePage  implements OnInit {

  @ViewChild('popover') popover: any;
  collapsedBreadcrumbs: HTMLIonBreadcrumbElement[] = [];
  isOpen = false;
  maxBreadcrumbs: any = 2;
  handlerMessage = '';
  roleMessage = '';
  isActionSheetOpen: boolean = false;

  public actionSheetButtons = [
    {
      text: 'Delete',
      role: 'destructive',
      data: {
        action: 'delete',
      },
    },
    {
      text: 'Share',
      data: {
        action: 'share',
      },
    },
    {
      text: 'Cancel',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ];
  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        this.handlerMessage = 'Alert canceled';
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        this.handlerMessage = 'Alert confirmed';
      },
    },
  ];
  public alertInputs = [
    {
      placeholder: 'Name',
    },
    {
      placeholder: 'Nickname (max 8 characters)',
      attributes: {
        maxlength: 8,
      },
    },
    {
      type: 'number',
      placeholder: 'Age',
      min: 1,
      max: 100,
    },
    {
      type: 'textarea',
      placeholder: 'A little about yourself',
    },
  ];
  
  breadcrumValue = '';
  
  public toastButtons = [
    {
      text: 'Dismiss',
      role: 'cancel',
    },
  ];
  constructor(private animationCtrl: AnimationController) {}

  enterAnimation = (baseEl: HTMLElement) => {
    const root: any = baseEl.shadowRoot;

    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' },
      ]);

    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl).direction('reverse');
  };


  ngOnInit(): void {
    
  }
  openActionsheet(){
    this.isActionSheetOpen = true;
  }                 

  accordionChange(event: any){
    console.log(event.detail.value);
    this.breadcrumValue = event.detail.value;
  }

  expandBreadcrumbs(event: Event) {
    this.collapsedBreadcrumbs = (event as CustomEvent).detail.collapsedBreadcrumbs;
    this.popover.event = event;
    this.isOpen = true;
  }

  setResult(event: any){
    console.log(event.detail);
    this.roleMessage = `Dismissed with role: ${event.detail.role}`;
  }

  loadingDismiss(event: Event) {
    console.log(event);
  }
}
