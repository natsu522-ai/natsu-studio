import { supabase } from './supabase.js';

const $ = id => document.getElementById(id);

async function loadSettings() {
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) {
    location.href = 'auth.html';
    return;
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single();

  if ($('username')) {
    $('username').value =
      profile?.username ||
      session.user.user_metadata?.username ||
      '';
  }

  if ($('email')) {
    $('email').value = session.user.email || '';
  }
}

$('saveUsername')?.addEventListener('click', async () => {
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) {
    location.href = 'auth.html';
    return;
  }

  const username = $('username')?.value.trim();

  if (!username) {
    if ($('settingsMsg')) {
      $('settingsMsg').textContent =
        '❌ Entre un nom d’utilisateur.';
    }
    return;
  }

  const { error } = await supabase
    .from('profiles')
    .upsert({
      id: session.user.id,
      username
    });

  if ($('settingsMsg')) {
    $('settingsMsg').textContent = error
      ? `❌ ${error.message}`
      : '✅ Nom d’utilisateur enregistré !';
  }
});

$('changePassword')?.addEventListener('click', async () => {
  const newPassword = $('newPassword')?.value;

  if (!newPassword || newPassword.length < 6) {
    if ($('settingsMsg')) {
      $('settingsMsg').textContent =
        '❌ Le nouveau mot de passe doit contenir au moins 6 caractères.';
    }
    return;
  }

  const { error } = await supabase.auth.updateUser({
    password: newPassword
  });

  if ($('settingsMsg')) {
    $('settingsMsg').textContent = error
      ? `❌ ${error.message}`
      : '✅ Mot de passe modifié !';
  }
});

loadSettings();
