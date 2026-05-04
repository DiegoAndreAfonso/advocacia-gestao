<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Publication;

class PublicationController extends Controller
{
    // LISTAR PUBLICAÇÕES PÚBLICAS
    public function index()
    {
        return Publication::where('published', true)
            ->latest()
            ->get();
    }

    // VER UMA PUBLICAÇÃO PELO SLUG
    public function show($slug)
    {
        return Publication::where('slug', $slug)
            ->where('published', true)
            ->firstOrFail();
    }

    // CRIAR (admin)
    public function store(Request $request)
    {
        return Publication::create($request->all());
    }

    // ATUALIZAR (admin)
    public function update(Request $request, $id)
    {
        $pub = Publication::findOrFail($id);
        $pub->update($request->all());

        return $pub;
    }
    // DESTRUIR (admin)
    public function destroy($id)
{
    $pub = Publication::findOrFail($id);
    $pub->delete();

    return response()->json(['message' => 'Deletado com sucesso']);
}
}
