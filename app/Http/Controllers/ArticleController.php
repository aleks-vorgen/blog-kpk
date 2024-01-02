<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Brick\Math\BigInteger;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\ImageController;
use Psy\Exception\TypeErrorException;

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
            'image' => 'image|mimes:jpg,png,jpeg|max:2048',
            'tag' => 'required|min:2|max:20',
            'topic_id' => 'required',
            'user_id' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => $validator->errors()]);
        }

        $image = ImageController::upload($request->file('image')); // Pass the file to the upload method

        $article = Article::create([
            'title' => $request->title,
            'description' => $request->description,
            'image' => $image,
            'tag' => $request->tag,
            'topic_id' => $request->topic_id,
            'user_id' => $request->user_id
        ]);

        return response()->json(['success' => true, 'data' => $article], 201);
    }


    /**
     * Display the specified resource.
     */
    public function show(Request $request) {
        $article = Article::where('id', $request->id)->first();

        if(!$article) {
            return response()->json([
                'message' => 'Not found'
            ], 404);
        }

        return response()->json(['data' => $article]);
    }

    /**
     * Display a listing of the resource related with user id.
     */
    public function showByUser($id) {
        $articles = Article::where('user_id', $id)->get();
        if(!$articles) {
            return response()->json([
                'message' => 'Not found'
            ], 404);
        }

        return response()->json(['data' => $articles]);
    }

    public function searchByTitleOrTag(Request $request) {
        $articles = Article::where('title', 'ilike', '%'.$request->query('title').'%')
            ->where('tag', 'ilike', '%'.$request->query('tag').'%')->get();

        if ($articles->count() == 0) {
            return response()->json(['data' => 'No results']);
        }

        return response()->json(['data' => $articles]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id) {
        $validator = Validator::make($request->all(), [
            'title' => 'required|min:10|max:255',
            'description' => 'required|min:10|max:255',
            'tag' => 'required|min:2|max:20',
            'topic_id' => 'required',
            'user_id' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => $validator->errors()]);
        }

        $article = Article::where('id', $id)->first();
        $article->title = $request->title;
        $article->description = $request->description;
        if ($article->image != null && is_file($article->image))
            $article->image = ImageController::upload($request->image);
        $article->tag = $request->tag;
        $article->topic_id = $request->topic_id;
        $article->user_id = $request->user_id;
        $article->save();

        return response()->json([
            'success' => true,
            'data' => $article
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
