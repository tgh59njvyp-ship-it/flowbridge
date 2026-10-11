import type {BlockSpec,BlockKind} from '../types/workflow';
export const BLOCKS:BlockSpec[]=[
{kind:'textInput',label:'テキスト入力',description:'テキストデータを起点にする',input:'any',output:'text',category:'input',defaults:{value:'FLOWBRIDGEへようこそ。\nつなぐだけで処理できます。'}},
{kind:'jsonInput',label:'JSON入力',description:'JSONを入力・検証する',input:'any',output:'json',category:'input',defaults:{value:'{"project":"FLOWBRIDGE","status":"ready"}'}},
{kind:'csvInput',label:'CSVファイル入力',description:'CSV文字列を読み込む',input:'any',output:'csv',category:'input',defaults:{value:'name,role\nAda,Engineer\nGrace,Researcher'}},
{kind:'imageInput',label:'画像ファイル入力',description:'画像ファイルを読み込む',input:'any',output:'image',category:'input'},
{kind:'formatText',label:'テキスト整形',description:'空白・改行・大文字を整える',input:'text',output:'text',category:'transform',defaults:{mode:'trim'}},
{kind:'replaceText',label:'検索と置換',description:'テキスト内の語句を置き換える',input:'text',output:'text',category:'transform',defaults:{search:'FLOWBRIDGE',replace:'Flow Bridge'}},
{kind:'formatJson',label:'JSON検証・整形',description:'JSONを検証して整形する',input:'json',output:'json',category:'transform',defaults:{indent:2}},
{kind:'csvToJson',label:'CSV → JSON',description:'ヘッダー付きCSVをJSON配列に変換',input:'csv',output:'json',category:'transform'},
{kind:'jsonToCsv',label:'JSON → CSV',description:'JSON配列をCSVに変換',input:'json',output:'csv',category:'transform'},
{kind:'resizeImage',label:'画像リサイズ',description:'ブラウザー内で画像を縮小する',input:'image',output:'image',category:'transform',defaults:{width:800,height:600}},
{kind:'renameFile',label:'ファイル名変更',description:'ファイル名を安全に変更する',input:'file',output:'file',category:'transform',defaults:{name:'flowbridge-result'}},
{kind:'download',label:'結果をダウンロード',description:'処理結果をファイルとして保存',input:'any',output:'file',category:'output'}];
export const getSpec=(kind:BlockKind)=>BLOCKS.find(b=>b.kind===kind)!;
