import * as functions from 'firebase-functions'

// See basic example: https://github.com/firebase/functions-samples/tree/master/typescript-getting-started
export const helloWorld = functions.https.onRequest((request, response) => {
    response.send('Hello from Firebase!\n\n');
});