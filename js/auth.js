import {supabase} from './supabase.js';
const $=id=>document.getElementById(id); let login=false;
function msg(t){$('authMsg').textContent=t}
function method(){return document.querySelector('input[name="method"]:checked')?.value||'password'}
$('switch').onclick=()=>{login=!login;$('authTitle').textContent=login?'Se connecter':'Créer un compte';$('signupFields').style.display=login?'none':'block';$('methodChoice').style.display=login?'none':'block';$('passwordFields').style.display='block';$('mainAuth').textContent=login?'Se connecter':'Créer mon compte';$('switchText').textContent=login?'Pas encore de compte ?':'Déjà un compte ?';$('switch').textContent=login?'Créer un compte':'Se connecter';msg('')};
$('google').onclick=async()=>{const {error}=await supabase.auth.signInWithOAuth({provider:'google',options:{redirectTo:location.origin+location.pathname.replace('auth.html','account.html')}});if(error)msg(error.message)};
$('mainAuth').onclick=async()=>{
 const email=$('email').value.trim(), password=$('password').value, stay=$('stay').checked;
 if(!email)return msg('Entre ton adresse e-mail.');
 if(login){
   if(method()==='otp' && false){}
   const {error}=await supabase.auth.signInWithPassword({email,password});
   if(error)return msg(error.message); location.href='account.html'; return;
 }
 const username=$('username').value.trim();
 if(!username)return msg('Choisis un nom d’utilisateur.');
 if(method()==='otp'){
   const {error}=await supabase.auth.signInWithOtp({email,options:{shouldCreateUser:true,data:{username}}});
   if(error)return msg(error.message);
   sessionStorage.setItem('pending_username',username);msg('Un code de vérification a été envoyé à ton e-mail.');return;
 }
 const {data,error}=await supabase.auth.signUp({email,password,options:{data:{username}}});
 if(error)return msg(error.message);
 if(data.user) msg('Compte créé. Vérifie ton e-mail si Supabase demande une confirmation.');
};
(async()=>{const {data:{session}}=await supabase.auth.getSession();if(session)location.href='account.html'})();
