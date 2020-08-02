import firebase from 'firebase/app'
import 'firebase/firestore'

export function loadFirebase (){
    try{
        // initialize database
        const config = {
            apiKey: process.env.FIREBASE_API_KEY,
            authDomain: process.env.FIREBASE_AUTH_DOMAIN,
            databaseURL: process.env.FIREBASE_DATABASE_URL,
            projectId: process.env.FIREBASE_PROJECT_ID,
            storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
            appId: process.env.FIREBASE_APPID,
            measurementId: process.env.FIREBASE_MEASUREMENT_ID
        };
        firebase.initializeApp(config);
        firebase.firestore().settings({timestampsInSnapshots: true});
    }catch(error){
        if(!/already exist/.test(error.message)){
            console.log(`Firebase didn't initialize correctly: ${error.message}`)
        }
    }
    return firebase;
}

export const JOB_COLLECTION = loadFirebase().firestore().collection('job')
export const AREA_COLLECTION = loadFirebase().firestore().collection('area')
export const CITY_COLLECTION = loadFirebase().firestore().collection('city')
export const EMPLOYER_COLLECTION = loadFirebase().firestore().collection('employer') 

export const getCollectionRecords = async (collection) => {
  const querySnapshot = await collection.get()
  let data = []
  querySnapshot.forEach(doc => {
      data.push(Object.assign({
        data : doc.data(),
        id: doc.id,
      }))
    })
  return data 
}
