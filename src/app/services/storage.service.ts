import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storeDataSubjects: Map<string, BehaviorSubject<any>> = new Map();

  init(): void {
    const keys = Object.keys(localStorage);

    keys.forEach((key) => {
      const val = JSON.parse(localStorage[key]);
      if (val) {
        this.storeDataSubjects.set(key, new BehaviorSubject<any>(val));
      }
    });
  }

  watch(key: string): Observable<any> | null {
    if (!this.storeDataSubjects.has(key)) {
      this.storeDataSubjects.set(key, new BehaviorSubject<any>(null));
    }
    let item: any = localStorage.getItem(key);
    const storeDataKey = this.storeDataSubjects.get(key);
    if (item == 'undefined') {
      item = undefined;
    } else {
      item = JSON.parse(item);
    }

    if (storeDataKey) {
      storeDataKey.next(item);
    }
    return storeDataKey ? storeDataKey.asObservable() : null;
  }

  set(key: string, value: any): void {
    const val = JSON.stringify(value);
    localStorage.setItem(key, val);
    const storeDataKey = this.storeDataSubjects.get(key);
    if (!this.storeDataSubjects.has(key) || !storeDataKey) {
      this.storeDataSubjects.set(key, new BehaviorSubject<any>(val));
    } else {
      storeDataKey.next(value);
    }
  }

  get(key: string): any {
    const valKey: any = localStorage.getItem(key);
    return JSON.parse(valKey);
  }

  remove(key: string): void {
    localStorage.removeItem(key);
    const storeDataKey = this.storeDataSubjects.get(key);
    if (!this.storeDataSubjects.has(key) || !storeDataKey) {
      this.storeDataSubjects.set(key, new BehaviorSubject<any>(null));
    } else {
      storeDataKey.next(null);
    }
  }

  getAllKeys(): string[] {
    return Array.from(this.storeDataSubjects.keys());
  }

  getKeyList(search: string): string[] {
    const arr = Array.from(this.storeDataSubjects.keys());
    return arr.filter((x) => x.includes(search));
  }
}
