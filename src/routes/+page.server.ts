import { SECRET_SERVICE_ROLE_KEY } from '$env/static/private';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createClient } from '@supabase/supabase-js';

export const load = async () => {
	const supabaseClient = createClient(PUBLIC_SUPABASE_URL, SECRET_SERVICE_ROLE_KEY);
	const { data: badges, error } = await supabaseClient.from('badges').select('*');

	if (error) throw error;

	return { props: { badges } };
};
