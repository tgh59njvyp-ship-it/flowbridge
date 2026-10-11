export type DataType='text'|'json'|'csv'|'image'|'file'|'any';
export type BlockKind='textInput'|'jsonInput'|'csvInput'|'imageInput'|'formatText'|'replaceText'|'formatJson'|'csvToJson'|'jsonToCsv'|'resizeImage'|'renameFile'|'download';
export type BlockStatus='idle'|'running'|'success'|'error';
export interface WorkflowNodeData extends Record<string, unknown> { label:string; kind:BlockKind; config:Record<string,any>; status:BlockStatus; result?:unknown; error?:string; }
export interface WorkflowNode { id:string; type:'workflow'; position:{x:number;y:number}; data:WorkflowNodeData; }
export interface WorkflowEdge { id:string; source:string; target:string; sourceHandle?:string; targetHandle?:string; }
export interface WorkflowDefinition { id:string; name:string; updatedAt:string; nodes:WorkflowNode[]; edges:WorkflowEdge[]; }
export interface BlockSpec { kind:BlockKind; label:string; description:string; input:DataType; output:DataType; category:'input'|'transform'|'output'; defaults?:Record<string,string|number|boolean>; }
