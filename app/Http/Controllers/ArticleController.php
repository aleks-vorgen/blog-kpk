<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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
        $validator = Validator::make($request->all(), [
            'title' => 'required|min:10|max:255',
            'description' => 'required|min:10|max:255',
            'image' => 'required|image|mimes:jpg,png,jpeg|max:2048',
            'tag' => 'required|min:3|max:10',
            'topic_id' => 'required',
            'user_id' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => $validator->errors()]);
        }

        $image = ImageController::upload($request->get('image'));

        $article = Article::create([
            'title' => $request->get('title'),
            'description' => $request->get('description'),
            'image' => $image,
            'tag' => $request->get('tag'),
            'topic_id' => $request->get('topic_id'),
            'user_id' => $request->get('user_id')
        ]);

        return response()->json(['success' => true], 201);
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
    public function update(Request $request, $id) {
        $validator = Validator::make($request->all(), [
            'title' => 'required|min:10|max:255',
            'description' => 'required|min:10|max:255',
            'tag' => 'required|min:3|max:10',
            'topic_id' => 'required',
            'user_id' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => $validator->errors()]);
        }

        $article = Article::where('id', $id)->first();
        $article->title = $request->get('title');
        $article->description = $request->get('description');
        $article->tag = $request->get('tag');
        $article->topic_id = $request->get('topic_id');
        $article->user_id = $request->get('user_id');
        $article->save();

        return response()->json([
            'success' => true,
            'message' => 'Topic has been updated'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function delete($id) {
        $article = Article::where('id', $id)->first();
        Article::destroy($id);

        return response()->json([
            'message' => 'Article \'' . $article->title . '\' has been deleted'
        ]);
    }
}
