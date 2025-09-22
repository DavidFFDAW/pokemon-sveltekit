import { redirect } from '@sveltejs/kit';
import { HttpService } from '$lib/services/http.service';
import { type ApiMoveResponse } from '$lib/types/api-types';

const getMoveData = async (slug: string) => {
    const response = await HttpService.get<ApiMoveResponse>(`https://pokeapi.co/api/v2/move/${slug}`);
    return response.data;
}

export function load({ params }) {
    const { slug } = params;
    if (!slug) throw redirect(302, '/pokemon/list');

    return {
        moveData: getMoveData(slug)
    };
};