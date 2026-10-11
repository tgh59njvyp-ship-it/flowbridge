import type {WorkflowDefinition} from '../types/workflow';
const DB='flowbridge-db',STORE='workflows';
function open(){return new Promise<IDBDatabase>((resolve,reject)=>{const r=indexedDB.open(DB,1);r.onupgradeneeded=()=>r.result.createObjectStore(STORE,{keyPath:'id'});r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});}
export async function saveWorkflow(w:WorkflowDefinition){const db=await open();return new Promise<void>((res,rej)=>{const tx=db.transaction(STORE,'readwrite');tx.objectStore(STORE).put(w);tx.oncomplete=()=>res();tx.onerror=()=>rej(tx.error);});}
export async function listWorkflows(){const db=await open();return new Promise<WorkflowDefinition[]>((res,rej)=>{const r=db.transaction(STORE).objectStore(STORE).getAll();r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error);});}
export async function loadWorkflow(id:string){const db=await open();return new Promise<WorkflowDefinition|undefined>((res,rej)=>{const r=db.transaction(STORE).objectStore(STORE).get(id);r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error);});}
