import { Injectable, Inject } from '@nestjs/common';
import { Firestore, FieldValue } from '@google-cloud/firestore';
import { ReferencedUser } from './entities/referenced_user_fire-store.entity';
import { Product } from './entities/referenced_product_fire-store.entity';
import { ReferencedProductsService } from './products.service';
import {
  referencedProductsMock,
  referencedUsersMock,
} from 'src/mock_data/MOCK_DATA_REFERENCED';

@Injectable()
export class ReferencedUserFireStoreService {
  private readonly usersCollection =
    this.firestore.collection('referenced_users');
  private readonly productsCollection = this.firestore.collection('products');

  constructor(
    @Inject('FIRESTORE') private readonly firestore: Firestore,
    private readonly productsService: ReferencedProductsService,
  ) {}

  async create(
    userData: Omit<ReferencedUser, 'id' | 'products'>,
  ): Promise<ReferencedUser> {
    const docRef = await this.usersCollection.add({
      ...userData,
      products: [],
    });
    return { id: docRef.id, ...userData, products: [] };
  }

  async findAll(): Promise<ReferencedUser[]> {
    const snapshot = await this.usersCollection.get();
    return Promise.all(
      snapshot.docs.map(async (doc) => {
        const user = { id: doc.id, ...doc.data() } as ReferencedUser;
        return this.populateProducts(user);
      }),
    );
  }

  async findOne(id: string): Promise<ReferencedUser> {
    const doc = await this.usersCollection.doc(id).get();
    if (!doc.exists) throw new Error('User not found');
    const user = { id: doc.id, ...doc.data() } as ReferencedUser;
    return this.populateProducts(user);
  }

  private async populateProducts(user: ReferencedUser): Promise<any> {
    const products = await Promise.all(
      user.products.map((ref) =>
        ref.get().then(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            }) as Product,
        ),
      ),
    );
    return { ...user, products };
  }

  async removeProductByName(
    userId: string,
    productName: string,
  ): Promise<ReferencedUser> {
    const product = await this.productsService.findByName(productName);
    const productRef = this.productsCollection.doc(product.id);

    await this.usersCollection.doc(userId).update({
      products: FieldValue.arrayRemove(productRef),
    });

    return this.findOne(userId);
  }

  async seed() {
    console.log('data');
    const dataUsers = referencedUsersMock;
    const dataProducts = referencedProductsMock;
    for (const datax of dataProducts) {
      await this.firestore
        .collection('products') // Replace with desired collection name
        .add(datax);
    }

    const products = (
      await this.firestore.collection('products').get()
    ).docs.map((d) => this.firestore.collection('products').doc(d.id));
    for (const datax of dataUsers) {
      this.usersCollection // Replace with desired collection name
        .add({ ...datax, products: products })
        .catch((err) => {
          console.error('Error uploading recipe:', err);
        });
    }
  }
}
