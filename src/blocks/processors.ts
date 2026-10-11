import type {BlockKind,WorkflowNodeData} from '../types/workflow';
export type ProcessValue={type:string;value:any;name?:string;mime?:string};
const csvRows=(s:string)=>{const lines=s.trim().split(/\r?\n/).filter(Boolean);if(!lines.length)return[];const headers=lines[0].split(',').map(x=>x.trim());return lines.slice(1).map(line=>{const cells=line.split(',');return Object.fromEntries(headers.map((h,i)=>[h,(cells[i]??'').trim()]));});};
const escapeCsv=(v:any)=>`"${String(v??'').replaceAll('"','""')}"`;
export async function processBlock(kind:BlockKind,input:ProcessValue|undefined,data:WorkflowNodeData,signal?:AbortSignal):Promise<ProcessValue>{
 if(signal?.aborted) throw new Error('実行がキャンセルされました');
 const cfg=data.config||{}; const val=input?.value;
 switch(kind){
  case'textInput':return{type:'text',value:String(cfg.value??'')};
  case'jsonInput':{try{return{type:'json',value:JSON.parse(String(cfg.value??''))};}catch{throw new Error('JSONの構文が正しくありません');}}
  case'csvInput':{const file=cfg.file as File|undefined; return{type:'csv',value:file?await file.text():String(cfg.value??'')};}
  case'imageInput':{const file=cfg.file as File|undefined;if(!file||!file.type.startsWith('image/'))throw new Error('画像ファイルを選択してください');return{type:'image',value:file,name:file.name,mime:file.type};}
  case'formatText':{const t=String(val??''); const mode=String(cfg.mode||'trim'); return{type:'text',value:mode==='upper'?t.toUpperCase():mode==='lower'?t.toLowerCase():t.replace(/\s+/g,' ').trim()};}
  case'replaceText':return{type:'text',value:String(val??'').split(String(cfg.search??'')).join(String(cfg.replace??''))};
  case'formatJson':{const obj=typeof val==='string'?JSON.parse(val):val; return{type:'json',value:obj};}
  case'csvToJson':return{type:'json',value:csvRows(String(val??''))};
  case'jsonToCsv':{const arr=Array.isArray(val)?val:[val]; if(!arr.length)return{type:'csv',value:''}; const keys=Array.from(new Set(arr.flatMap(o=>Object.keys(o||{})))); return{type:'csv',value:[keys.join(','),...arr.map(o=>keys.map(k=>escapeCsv(o?.[k])).join(','))].join('\n')}}
  case'resizeImage':{const file=val as File;if(!(file instanceof File))throw new Error('画像ファイルが必要です'); const bitmap=await createImageBitmap(file); const maxW=Number(cfg.width)||800,maxH=Number(cfg.height)||600; const scale=Math.min(1,maxW/bitmap.width,maxH/bitmap.height); const canvas=new OffscreenCanvas(Math.max(1,Math.round(bitmap.width*scale)),Math.max(1,Math.round(bitmap.height*scale))); canvas.getContext('2d')!.drawImage(bitmap,0,0,canvas.width,canvas.height); const blob=await canvas.convertToBlob({type:file.type||'image/png',quality:.9}); return{type:'image',value:new File([blob],file.name,{type:blob.type}),name:file.name,mime:blob.type};}
  case'renameFile':{if(!(val instanceof File))throw new Error('ファイルが必要です'); const base=String(cfg.name||'flowbridge-result').replace(/[^a-zA-Z0-9._-]/g,'-'); const ext=val.name.includes('.')?'.'+val.name.split('.').pop():''; return{type:'file',value:new File([val],base+ext,{type:val.type}),name:base+ext,mime:val.type};}
  case'download':return{type:'file',value:val,name:input?.name||'flowbridge-result',mime:input?.mime};
  default:throw new Error('未対応のブロックです');
 }
}
