<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() {
        $articles = Article::all();

        return response()->json(['data' => $articles]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($id) {
        $article = Article::where('id', $id)->first();

        if(!$article) {
            return response()->json([
                'message' => 'Not found'
            ], 404);
        }

        return response()->json(['data' => $article]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Article $article) {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id) {
        $article = Article::where('id', $id)->first();
        Article::destroy($id);

        return response()->json([
            'message' => 'Article \'' . $article->title . '\' has been deleted'
        ]);
    }
}
