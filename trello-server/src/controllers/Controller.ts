import FirestoreRepository from "@/repositories/FirestoreRepository";
import IController from "./IController";
import { firestore } from "@/configs/firebaseAdmin";
import { NextFunction, Request, Response } from "express";
import { DocumentData } from "@google-cloud/firestore";
import { BadRequestError, InternalError, NotFoundError } from "@/core/ApiError";


export default class Controller<
  T extends { 
    id?: string 
  }
> implements IController<
  T 
> {
    
  // Firebase repository used by CRUD methods.
  private repository: FirestoreRepository;

  constructor(collectionName: string) {
    this.repository = new FirestoreRepository(firestore, collectionName);
  }

  
  public async create(
    req: Request, 
    res: Response, 
    next: NextFunction
  ): Promise<DocumentData | undefined> {
    if (!req.body || Object.keys(req.body).length === 0) {
      throw new BadRequestError(
        "The body was empty or undefined"
      );
    }

    // Add timestamps
    const dataWithTimestamps = {
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    
    const docRef = await this.repository.create(dataWithTimestamps);
    const docSnapshot = await docRef.get();

    if (!docSnapshot.exists) {
      throw new InternalError(
        "Failed To Create Document"
      );
    }

    return {
      id: docSnapshot.id,
      ...(docSnapshot.data() as Omit<T, "id">)
    };
  }

  public async readOne(
    req: Request, 
    res: Response, 
    next: NextFunction
  ): Promise<T | undefined> {
    if (!req.params.id) {
      throw new BadRequestError("The 'id' parameter is required.");
    }

    const docRef = await this.repository.readOne(req.params.id);
    const docSnapshot = await docRef.get();

    if (!docSnapshot.exists) {
      throw new NotFoundError(`No document found with id: ${req.params.id}.`);
    }

    return {
      id: docSnapshot.id,
      ...(docSnapshot.data() as Omit<T, "id">),
    } as T;
  }

  public async readAll(
    req: Request, 
    res: Response, 
    next: NextFunction
  ): Promise<T[]> {
    const docRefs = await this.repository.readAll();
    if (docRefs.length === 0) {
      return [];
    }

    const snapshots = await Promise.all(docRefs.map(docRef => docRef.get()));

    return snapshots
      .filter(snapshot => snapshot.exists)
      .map(snapshot => ({
        id: snapshot.id,
        ...(snapshot.data() as Omit<T, "id">),
      })) as T[];
  }

  public async update(
    req: Request, 
    res: Response, 
    next: NextFunction
  ): Promise<T | undefined> {
    if (!req.body || Object.keys(req.body).length === 0) {
      throw new BadRequestError("Request body cannot be empty.");
    }

    if (!req.params.id) {
      throw new BadRequestError("The 'id' parameter is required.");
    }

    const dataWithTimestamp = {
      ...req.body,
      updatedAt: new Date(),
    };

    const docRef = await this.repository.update(req.params.id, dataWithTimestamp);
    const docSnapshot = await docRef.get();

    if (!docSnapshot.exists) {
      throw new NotFoundError(`Update failed. No document found with id: ${req.params.id}.`);
    }

    return {
      id: docSnapshot.id,
      ...(docSnapshot.data() as Omit<T, "id">),
    } as T;
  }

  public async delete(
    req: Request, 
    res: Response, 
    next: NextFunction
  ): Promise<boolean> {
    if (!req.params.id) {
      throw new BadRequestError("The 'id' parameter is required.");
    }

    const docRef = await this.repository.readOne(req.params.id);
    const docSnapshot = await docRef.get();

    if (!docSnapshot.exists) {
      throw new NotFoundError(`Delete failed. No document found with id: ${req.params.id}.`);
    }

    await this.repository.delete(req.params.id);
    return true;
  }
}