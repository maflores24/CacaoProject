import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController,AlertController } from 'ionic-angular';

import { Item } from '../../models/item';
import { Items } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  allItems: Item[];
  searchedItems: Item[];
  currentItems: Item[];

  constructor(public navCtrl: NavController, public items: Items, public modalCtrl: ModalController,public alrtCtrl: AlertController) {
    this.allItems = this.items.query();
    this.currentItems = this.allItems;
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    let addModal = this.modalCtrl.create('ItemCreatePage');
    addModal.onDidDismiss(item => {
      if (item) {
        this.items.add(item);
      }
    })
    addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    // this.items.delete(item);
    let confirm = this.alrtCtrl.create({
      title: 'Delete',
      message: 'This action cannot be reverted.',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {

          }
        },
        {
          text: 'Confirm',
          handler: () => {
            this.items.delete(item);
          }
        }
      ]
    });
    confirm.present();
  }

  /**
   * Perform a service for the proper items.
   */
  getItems(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.currentItems = this.allItems;
      return;
    }
    this.currentItems = this.items.query({
      node: val
    });
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }
}
