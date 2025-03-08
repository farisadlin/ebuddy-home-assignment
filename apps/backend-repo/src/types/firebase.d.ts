// Type definitions for Firebase Admin SDK
declare module 'firebase-admin' {
  export interface ServiceAccount {
    projectId?: string;
    clientEmail?: string;
    privateKey?: string;
  }

  export interface AppOptions {
    credential?: any;
    databaseURL?: string;
    databaseAuthVariableOverride?: object;
    serviceAccountId?: string;
    projectId?: string;
    storageBucket?: string;
  }

  export interface FirebaseError {
    code: string;
    message: string;
    stack?: string;
  }

  export class App {
    name: string;
    options: AppOptions;
  }

  export function initializeApp(options?: AppOptions, name?: string): App;
  export function app(name?: string): App;
  export const apps: App[];
  export function auth(app?: App): admin.auth.Auth;
  export function firestore(app?: App): admin.firestore.Firestore;
  export function storage(app?: App): admin.storage.Storage;

  export namespace auth {
    interface Auth {
      createCustomToken(uid: string, developerClaims?: object): Promise<string>;
      verifyIdToken(idToken: string, checkRevoked?: boolean): Promise<DecodedIdToken>;
      getUser(uid: string): Promise<UserRecord>;
      getUserByEmail(email: string): Promise<UserRecord>;
      getUserByPhoneNumber(phoneNumber: string): Promise<UserRecord>;
      listUsers(maxResults?: number, pageToken?: string): Promise<ListUsersResult>;
    }

    interface DecodedIdToken {
      uid: string;
      email?: string;
      email_verified?: boolean;
      phone_number?: string;
      name?: string;
      picture?: string;
      role?: string;
      iat: number;
      exp: number;
      auth_time: number;
      [key: string]: any;
    }

    interface UserRecord {
      uid: string;
      email?: string;
      emailVerified: boolean;
      phoneNumber?: string;
      displayName?: string;
      photoURL?: string;
      disabled: boolean;
      metadata: {
        creationTime: string;
        lastSignInTime: string;
      };
      providerData: {
        uid: string;
        displayName?: string;
        email?: string;
        photoURL?: string;
        providerId: string;
        phoneNumber?: string;
      }[];
      toJSON(): object;
    }

    interface ListUsersResult {
      users: UserRecord[];
      pageToken?: string;
    }
  }

  export namespace firestore {
    interface Firestore {
      collection(collectionPath: string): CollectionReference;
      doc(documentPath: string): DocumentReference;
      batch(): WriteBatch;
    }

    interface CollectionReference {
      id: string;
      doc(documentPath?: string): DocumentReference;
      add(data: DocumentData): Promise<DocumentReference>;
      get(): Promise<QuerySnapshot>;
    }

    interface DocumentReference {
      id: string;
      get(): Promise<DocumentSnapshot>;
      set(data: DocumentData, options?: { merge?: boolean }): Promise<WriteResult>;
      update(data: UpdateData): Promise<WriteResult>;
      delete(): Promise<WriteResult>;
    }

    interface DocumentSnapshot {
      id: string;
      exists: boolean;
      data(): DocumentData | undefined;
    }

    interface QuerySnapshot {
      docs: DocumentSnapshot[];
      empty: boolean;
      size: number;
    }

    interface WriteBatch {
      set(documentRef: DocumentReference, data: DocumentData): WriteBatch;
      update(documentRef: DocumentReference, data: UpdateData): WriteBatch;
      delete(documentRef: DocumentReference): WriteBatch;
      commit(): Promise<WriteResult[]>;
    }

    interface WriteResult {
      writeTime: Timestamp;
    }

    interface Timestamp {
      seconds: number;
      nanoseconds: number;
      toDate(): Date;
      toMillis(): number;
    }

    type DocumentData = { [field: string]: any };
    type UpdateData = { [fieldPath: string]: any };
  }

  export namespace storage {
    interface Storage {
      bucket(name?: string): Bucket;
    }

    interface Bucket {
      name: string;
      file(path: string): File;
      upload(localFilePath: string, options?: UploadOptions): Promise<UploadResponse>;
    }

    interface File {
      name: string;
      bucket: Bucket;
      download(options?: DownloadOptions): Promise<DownloadResponse>;
      getSignedUrl(config: SignedUrlConfig): Promise<GetSignedUrlResponse>;
      delete(): Promise<DeleteResponse>;
    }

    interface UploadOptions {
      destination?: string;
      metadata?: { [key: string]: any };
    }

    interface UploadResponse {
      [key: string]: any;
    }

    interface DownloadOptions {
      destination?: string;
    }

    interface DownloadResponse {
      [key: string]: any;
    }

    interface SignedUrlConfig {
      action: 'read' | 'write' | 'delete' | 'resumable';
      expires: string | number | Date;
    }

    type GetSignedUrlResponse = [string, { [key: string]: any }];
    type DeleteResponse = [any];
  }
}
