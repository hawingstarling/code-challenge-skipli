import { CollectionReference, DocumentData, DocumentReference, Firestore } from "@google-cloud/firestore";
import IFirestoreRepository from "./IFirestore";
import logger from "@/core/Logger";


export default class FirestoreRepository implements IFirestoreRepository {
  public readonly collection: CollectionReference;

  constructor(db: Firestore, collectionName: string) {
    this.collection = db.collection(collectionName);
  }

  public async create(
    object: DocumentData
  ): Promise<DocumentReference> {
    try {
      return await this.collection.add(object);
    } catch (error) {
      logger.error("[FirestoreRepository.create] Error Creating Document: ", error);
      throw new Error(`
        Could Not Create Object: ${(error as Error).message}  
      `);
    }
  }

  public async readOne(
    id: string
  ): Promise<DocumentReference> {
    try {
      // eslint-disable-next-line @typescript-eslint/await-thenable
      return await this.collection.doc(id);
    } catch (error) {
      console.error(
        `[FirestoreRepository.readOne] Error Reading Document ${id}: `, error
      );
      throw new Error(`
        Could Not Read Object With Id=${id}: ${(error as Error).message}
      `);
    }
  }

  public async readAll(): Promise<DocumentReference[]> {
    try {
      return await this.collection.listDocuments();
    } catch (error) {
      console.error("[FirestoreRepository.readAll] Error Reading All Documents", error);
      throw new Error(`Could Not Read All Objects: ${(error as Error).message}`);
    }
  }

  public async update(id: string, object: DocumentData): Promise<DocumentReference> {
    try {
      const ref = this.collection.doc(id);
      const snap = await ref.get();
      if (!snap.exists) {
        console.warn(`[FirestoreRepository.update] Document With Id=${id} Does Not Exits`);
        return ref;
      }
      await ref.update(object);
      return ref;
    } catch (error) {
      console.error(`[FirestoreRepository.update] Error Updating Document ${id}:`, error);
      throw new Error(`Could Not Update Object With Id=${id}: ${(error as Error).message}`);
    }
  }

  public async delete(id: string): Promise<DocumentReference> {
    try {
      const ref: DocumentReference = this.collection.doc(id);
      await ref.delete();
      return ref;
    } catch (error) {
      console.error(`[FirestoreRepository.delete] Error Deleting Document ${id}:`, error);
      throw new Error(`Could Not Remove Object With Id=${id}: ${(error as Error).message}`);
    }
  }
}