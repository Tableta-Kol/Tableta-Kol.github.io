
const STORAGE_KEY = "lkStickwerkV2Orders";

function loadOrders(){
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
  catch { return []; }
}
function saveOrders(orders){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}
function makeId(){
  const y = new Date().getFullYear();
  const n = Math.floor(1000 + Math.random()*9000);
  return `LK-${y}-${n}`;
}
function nowIso(){ return new Date().toISOString(); }

window.LK = {
  loadOrders, saveOrders, makeId, nowIso, STORAGE_KEY
};
