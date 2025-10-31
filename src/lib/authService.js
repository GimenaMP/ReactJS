import supabase from './supabaseClient.js';

export async function signUpAndCreateProfile({ email, password, full_name, phone }) {
    if (!email || !password || !full_name || !phone) throw new Error('Todos los campos son obligatorios.');
    if (!/^[0-9]{8}$/.test(phone)) throw new Error('El teléfono debe tener 8 dígitos.');

    const redirectTo = `${window.location.origin}/auth/callback`;


    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: redirectTo,
            data: { full_name, phone }
        }
    });
    if (error) throw error;


    localStorage.setItem('pending_profile', JSON.stringify({ email, full_name, phone }));

    return data;
}


export async function signInAndFetchProfile({ email, password }) {
    if (!email || !password) throw new Error('Email y contraseña son requeridos.');

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;

    const userId = data.user?.id;
    if (!userId) throw new Error('No se obtuvo user id tras login.');

    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();
    if (profileError) throw profileError;


    if (!profile) {
        const pending = localStorage.getItem('pending_profile');
        if (pending) {
            const { email: pEmail, full_name, phone } = JSON.parse(pending);
            const { error: upsertError } = await supabase
                .from('profiles')
                .upsert(
                    { user_id: userId, email: pEmail, full_name, phone, created_at: new Date().toISOString() },
                    { returning: 'minimal' }
                );
            if (!upsertError) {
                localStorage.removeItem('pending_profile');
                return { auth: data, profile: { user_id: userId, email: pEmail, full_name, phone } };
            }
        }

        await supabase.auth.signOut();
        throw new Error('Perfil no encontrado. Completa el registro o contacta soporte.');
    }

    return { auth: data, profile };
}

export async function requestPasswordReset(email) {
    if (!email) throw new Error('Email requerido.');
    const redirectTo = `${window.location.origin}/reset-password`;
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
    if (error) throw error;
    return data;
}

export async function updatePassword(newPassword) {
    if (!newPassword) throw new Error('Nueva contraseña requerida.');
    const { data, error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw error;
    return data;
}

export async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
}


// import supabase from './supabaseClient.js';
//
// export async function signUpAndCreateProfile({ email, password, full_name, phone }) {
//     if (!email || !password || !full_name || !phone) throw new Error('Todos los campos son obligatorios.');
//     if (!/^[0-9]{8}$/.test(phone)) throw new Error('El teléfono debe tener 8 dígitos.');
//
//     const redirectTo = `${window.location.origin}/auth/callback`;
//
//     // IMPORTANTE: enviamos metadata (full_name, phone) y la ruta de retorno
//     const { data, error } = await supabase.auth.signUp({
//         email,
//         password,
//         options: {
//             emailRedirectTo: redirectTo,
//             data: { full_name, phone }
//         }
//     });
//     if (error) throw error;
//
//     // respaldo por si el usuario confirma en otro momento/dispositivo
//     localStorage.setItem('pending_profile', JSON.stringify({ email, full_name, phone }));
//
//     return data;
// }
//
//
// export async function signInAndFetchProfile({ email, password }) {
//     if (!email || !password) throw new Error('Email y contraseña son requeridos.');
//
//     const { data, error } = await supabase.auth.signInWithPassword({ email, password });
//     if (error) throw error;
//
//     const userId = data.user?.id;
//     if (!userId) throw new Error('No se obtuvo user id tras login.');
//
//     const { data: profile, error: profileError } = await supabase
//         .from('profiles')
//         .select('*')
//         .eq('user_id', userId)
//         .maybeSingle();
//     if (profileError) throw profileError;
//
//     // si nunca se pudo crear el perfil (confirmación tardía), lo completamos ahora con lo que guardamos
//     if (!profile) {
//         const pending = localStorage.getItem('pending_profile');
//         if (pending) {
//             const { email: pEmail, full_name, phone } = JSON.parse(pending);
//             const { error: upsertError } = await supabase
//                 .from('profiles')
//                 .upsert(
//                     { user_id: userId, email: pEmail, full_name, phone, created_at: new Date().toISOString() },
//                     { returning: 'minimal' }
//                 );
//             if (!upsertError) {
//                 localStorage.removeItem('pending_profile');
//                 return { auth: data, profile: { user_id: userId, email: pEmail, full_name, phone } };
//             }
//         }
//         // si no hay pending_profile, forzamos mensaje claro
//         await supabase.auth.signOut();
//         throw new Error('Perfil no encontrado. Completa el registro o contacta soporte.');
//     }
//
//     return { auth: data, profile };
// }
//
// export async function requestPasswordReset(email) {
//     if (!email) throw new Error('Email requerido.');
//     const redirectTo = `${window.location.origin}/reset-password`;
//     const { data, error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
//     if (error) throw error;
//     return data;
// }
//
// export async function updatePassword(newPassword) {
//     if (!newPassword) throw new Error('Nueva contraseña requerida.');
//     const { data, error } = await supabase.auth.updateUser({ password: newPassword });
//     if (error) throw error;
//     return data;
// }
//
// export async function signOut() {
//     const { error } = await supabase.auth.signOut();
//     if (error) throw error;
// }
//
