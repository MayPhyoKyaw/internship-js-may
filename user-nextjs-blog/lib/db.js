import firebase from 'firebase/app'
import 'firebase/firestore'

export const AREA_COLLECTION = "area";
export const CITY_COLLECTION = "city";
export const EMPLOYER_COLLECTION = "employer";
export const JOB_COLLECTION = "job";

export const getCollectionRecords = async (collectionName) => {
  const querySnapshot = await firebase
    .firestore()
    .collection(collectionName)
    .get();
  const records = querySnapshot.docs.map((doc) => ({
    data: doc.data(),
    id: doc.id,
  }));
  return records;
};

export const getRecordsByCondition = async (
  collectionName,
  condition, // { fieldName, operator, value },
  sort // {fieldName, 'asc' | 'desc' }
) => {
  const querySnapshot = await firebase
    .firestore()
    .collection(collectionName)
    .where(condition.fieldName, condition.operator, condition.value)
    .orderBy(sort.fieldName, sort.direction)
    .get();
  const records = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return records;
};

export const getRecord = async (collectionName, id) => {
  const documentSnapshot = await firebase
    .firestore()
    .collection(collectionName)
    .doc(id)
    .get();
  return documentSnapshot.data();
};

export function loadFirebase() {
  try {
    // initialize database
    const config = {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.FIREBASE_DATABASE_URL,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APPID,
      measurementId: process.env.FIREBASE_MEASUREMENT_ID,
    };
    firebase.initializeApp(config);
    firebase.firestore().settings({ timestampsInSnapshots: true });
  } catch (error) {
    if (!/already exist/.test(error.message)) {
      console.log(`Firebase didn't initialize correctly: ${error.message}`);
    }
  }
  return firebase;
}
