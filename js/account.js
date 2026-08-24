import {supabase} from './supabase.js';
const $=id=>document.getElementById(id);
const {data:{session}}=await supabase.auth.getSession();
if(!session) location.href='auth.html';
else{
 const {data:p}=await supabase.from('profiles').select('*').eq('id',session.user.id).single();
 $('welcome').textContent=`Bienvenue, ${p?.username||session.user.user_metadata?.username||'client'} !`;
 $('profile').innerHTML=`<div>👤 Nom d'utilisateur : <b>${p?.username||'—'}</b></div><div>📧 E-mail : <b>${session.user.email}</b></div><div>📅 Compte créé : <b>${new Date(session.user.created_at).toLocaleDateString('fr-FR')}</b></div>`;
}
$('logout').onclick=async()=>{await supabase.auth.signOut();location.href='index.html'};
