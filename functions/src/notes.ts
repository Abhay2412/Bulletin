import { Note } from "../../types";
import corsHandler from "./cors";
import { functions } from "./firebase";
import {
  createDoc,
  deleteDoc,
  updateDoc,
  readDoc,
  readCol,
} from "./util/firestore/interactors";
import { getNoteColPath, getNoteDocPath } from "./util/firestore/paths";
import { checkHTTPMethod, parseBodyAsType, parseParam } from "./util/request";
import { sendJSON } from "./util/response";

/**
 * Take the Note object send in the request body and insert it into Firestore
 * under the path /notes/writeResult.id
 */
export const createNote = functions.https.onRequest(
  async (request, response) => {
    // you need corsHandler to allow requests from localhost and the deployed website,
    // so you don't get a CORS error.
    corsHandler(request, response, async () => {
      // Check HTTP method
      checkHTTPMethod(request, "POST", response);

      const boardID = parseParam(request, "boardID", response);

      // TODO: Check auth

      // Read the body from the request.
      const body = parseBodyAsType(request, "Note", response) as Note;
      if (!body) return;

      // get collection path to add to.
      const noteColPath = getNoteColPath(boardID);

      // add body to path
      const newNoteDocRef = await createDoc(noteColPath, body, response);

      // send the response, that we have added the doc
      const responseData = await readDoc(newNoteDocRef.path, response);

      sendJSON(response, responseData);
    });
  }
);

export const readNote = functions.https.onRequest(async (request, response) => {
  // you need corsHandler to allow requests from localhost and the deployed website,
  // so you don't get a CORS error.
  corsHandler(request, response, async () => {
    // check HTTP method
    checkHTTPMethod(request, "GET", response);

    // TODO: Check auth

    // get query params
    const boardID = parseParam(request, "boardID", response);
    const noteID = parseParam(request, "noteID", response);

    // get firestore path
    const noteDocPath = getNoteDocPath(boardID, noteID);

    // get the document
    const responseData = await readDoc(noteDocPath, response);

    // Send back a message that we've successfully written the message
    sendJSON(response, responseData);
  });
});

/**
 * Gets all notes from firestore that matches the userID in the query,
 * and returns it as a json object in the response's body
 */
export const readNotes = functions.https.onRequest(
  async (request, response) => {
    // you need corsHandler to allow requests from localhost and the deployed website,
    // so you don't get a CORS error.
    corsHandler(request, response, async () => {
      // check HTTP method
      checkHTTPMethod(request, "GET", response);

      // TODO: Check auth

      // get query params
      const boardID = parseParam(request, "boardID", response);

      // get firestore path
      const noteColPath = getNoteColPath(boardID);

      // get the document
      const responseData = await readCol(noteColPath, response);

      // Send back a message that we've successfully written the message
      sendJSON(response, responseData);
    });
  }
);

export const updateNote = functions.https.onRequest(
  async (request, response) => {
    // you need corsHandler to allow requests from localhost and the deployed website,
    // so you don't get a CORS error.
    corsHandler(request, response, async () => {
      // check HTTP method
      checkHTTPMethod(request, "PUT", response);

      // get query params
      const boardID = parseParam(request, "boardID", response);
      const noteID = parseParam(request, "noteID", response);

      // get body
      const body = parseBodyAsType(request, "Note", response) as Note;
      if (!body) return;

      // get path
      const notePath = getNoteDocPath(boardID, noteID);

      //edit the note (if found) and send a response message
      await updateDoc(notePath, body, response);

      sendJSON(response, null);
    });
  }
);

export const deleteNote = functions.https.onRequest(
  async (request, response) => {
    // you need corsHandler to allow requests from localhost and the deployed website,
    // so you don't get a CORS error.
    corsHandler(request, response, async () => {
      // check HTTP method
      checkHTTPMethod(request, "DELETE", response);

      // get query params
      const boardID = parseParam(request, "boardID", response);
      const noteID = parseParam(request, "noteID", response);

      // TODO: Check auth

      // get path
      const notePath = getNoteDocPath(boardID, noteID);

      //edit the note (if found) and send a response message
      await deleteDoc(notePath, response);

      // send success message
      sendJSON(response, null);
    });
  }
);
