import {supabase} from './supabase.js';
const $=id=>document.getElementById(id); let user;
async function load(){
 const {data:{session}}=await supabase.auth.getSession(); user=session?.user;
 if(!user){$('orderForm').innerHTML='<div class="card"><h1>🔐 Connexion nécessaire</h1><p>Tu dois avoir un compte connecté pour passer une commande.</p><a class="btn primary" href="auth.html">Se connecter / créer un compte</a></div>';return}
 const {data:orders}=await supabase.from('orders').select('*').order('created_at',{ascending:false});
 $('ordersList').innerHTML=orders?.length?orders.map(o=>`<div class="order-row"><b>#NS-${String(o.id).padStart(4,'0')}</b> — ${o.service}<br><span class="status ${o.status}">${o.status}</span> · ${o.price??'—'} €<br><small>${new Date(o.created_at).toLocaleString('fr-FR')}</small></div>`).join(''):'Aucune commande pour le moment.';
}
$('submitOrder').onclick=async()=>{
 const {data:{session}}=await supabase.auth.getSession();if(!session)return;
 const row={user_id:session.user.id,service:$('service').value,description:$('description').value,contact_method:$('contactMethod').value,contact_value:$('contactValue').value,price:Number($('price').value)||null};
 const {error}=await supabase.from('orders').insert(row);$('orderMsg').textContent=error?error.message:'✅ Commande envoyée !';if(!error)load();
};load();
