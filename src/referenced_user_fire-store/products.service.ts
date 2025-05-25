import { Injectable, Inject } from '@nestjs/common';
import { Firestore } from '@google-cloud/firestore';
import { Product } from './entities/referenced_product_fire-store.entity'

@Injectable()
export class ReferencedProductsService {
  private readonly collection = this.firestore.collection('products');

  constructor(@Inject('FIRESTORE') private readonly firestore: Firestore) {}

  async create(productData: Omit<Product, 'id'>): Promise<Product> {
    const docRef = await this.collection.add(productData);
    return { id: docRef.id, ...productData };
  }

  async findOne(id: string): Promise<Product> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) throw new Error('Product not found');
    return { id: doc.id, ...doc.data() } as Product;
  }

  async findByName(name: string): Promise<Product> {
    const snapshot = await this.collection.where('name', '==', name).get();
    if (snapshot.empty) throw new Error('Product not found');
    return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as Product;
  }
}