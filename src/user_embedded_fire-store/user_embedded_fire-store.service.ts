import { Injectable, Inject } from '@nestjs/common';
import { Firestore } from '@google-cloud/firestore';
import { EmbeddedUser } from './entities/user_embedded_fire-store.entity';
import { embbededUsersSeed } from 'src/mock_data/MOCK_DATA_EMBBEDED_USERS'

@Injectable()
export class UserEmbeddedFireStoreService {
  private readonly collection = this.firestore.collection('embedded_users');

  constructor(@Inject('FIRESTORE') private readonly firestore: Firestore) {}

  async create(userData: Omit<EmbeddedUser, 'id'>): Promise<EmbeddedUser> {
    const docRef = await this.collection.add(userData);
    return { id: docRef.id, ...userData };
  }

  async findAll(): Promise<EmbeddedUser[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as EmbeddedUser,
    );
  }

  async findOne(id: string): Promise<EmbeddedUser> {
    const doc = await this.collection.doc(id).get();
    return { id: doc.id, ...doc.data() } as EmbeddedUser;
  }

  async update(
    id: string,
    updateData: Partial<EmbeddedUser>,
  ): Promise<EmbeddedUser> {
    const update = await this.collection.doc(id).update(updateData);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const remove = await this.collection.doc(id).delete();
  }

  async removeProductByName(
    userId: string,
    productName: string,
  ): Promise<EmbeddedUser> {
    const userRef = this.collection.doc(userId);
    const user = await this.findOne(userId);

    const updatedProducts = user.products.filter((p) => p.name !== productName);

    const update = await userRef.update({ products: updatedProducts });

    return { ...user, products: updatedProducts };
  }

  async seed() {
    console.log("data")
    const data = embbededUsersSeed;
    for (const datax of data) {
      this.collection // Replace with desired collection name
        .add(datax)
        .then((ref) => {
          console.log('Recipe uploaded successfully:', ref.id);
        })
        .catch((err) => {
          console.error('Error uploading recipe:', err);
        });
    }
  }
}
