import firebaseInfo from "./firebaseConfig.js"
import {getDatabase, ref, set} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

const database = getDatabase(firebaseInfo);
const dbRef = ref(database);

